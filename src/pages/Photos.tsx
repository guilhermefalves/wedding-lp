import { useEffect, useRef, useState } from "react";
import { CloudUpload, Trash2, Loader2, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { coupleInfo, weddingInfo } from "../config/constants";
import { toast } from "sonner";
import { ToasterProvider } from "../components/ToasterProvider";
import { ImageGallery } from "../components/ImageGallery";

const MAX_FILES = 5;

function compressImage(file: File): Promise<File> {
  return new Promise((resolve) => {
    if (!file.type.startsWith("image/")) {
      resolve(file);
      return;
    }

    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);

      const maxDim = 2048;
      let { width, height } = img;
      if (width > maxDim || height > maxDim) {
        const ratio = Math.min(maxDim / width, maxDim / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d")!.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob && blob.size < file.size) {
            resolve(new File([blob], file.name, { type: "image/jpeg" }));
          } else {
            resolve(file);
          }
        },
        "image/jpeg",
        0.9,
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(file);
    };
    img.src = url;
  });
}

function sanitizeName(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9_-]/g, "_")
    .replace(/_+/g, "_")
    .substring(0, 60);
}

export default function Photos() {
  const formattedDate = weddingInfo.weddingDate.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [name, setName] = useState(() => localStorage.getItem("photos_name") || "");
  const [uploading, setUploading] = useState(false);
  const [gallery, setGallery] = useState<{ url: string }[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(true);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [nameError, setNameError] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ done: 0, total: 0 });

  const fetchGallery = () => {
    setGalleryLoading(true);
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => setGallery(data.files || []))
      .catch(() => setGallery([]))
      .finally(() => setGalleryLoading(false));
  };

  useEffect(() => {
    fetchGallery();
    return () => {
      previews.forEach((u: string) => URL.revokeObjectURL(u));
    };
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    const remaining = MAX_FILES - selectedFiles.length;
    if (remaining <= 0) {
      toast.error(`Máximo de ${MAX_FILES} arquivos permitido.`);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    const toAdd = files.slice(0, remaining);
    if (toAdd.length < files.length) {
      toast.error(`Máximo de ${MAX_FILES} arquivos. ${files.length - toAdd.length} ignorado(s).`);
    }

    setSelectedFiles((prev) => [...prev, ...toAdd]);
    toAdd.forEach((file) => {
      const url = URL.createObjectURL(file);
      setPreviews((prev) => [...prev, url]);
    });

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeFile = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    setPreviewIndex((prev: number) => Math.min(prev, Math.max(0, previews.length - 2)));
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      setNameError(true);
      nameInputRef.current?.focus();
      toast.error("Preencha seu nome antes de enviar.");
      return;
    }
    if (selectedFiles.length === 0) return;

    setUploading(true);
    let success = 0;
    let failed = 0;

    const compressed = await Promise.all(selectedFiles.map(compressImage));
    setUploadProgress({ done: 0, total: compressed.length });

    const results = await Promise.allSettled(
      compressed.map(async (file: File) => {
        const invertedTs = (9999999999999 - Date.now()).toString().padStart(13, "0");
        const randomId = Math.random().toString(36).substring(2, 8);
        const safeName = sanitizeName(name.trim());
        const ext = file.name.split(".").pop() || "jpg";
        const filename = `${invertedTs}_${safeName}_${randomId}.${ext}`;

        const presignRes = await fetch("/api/presign", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filename, contentType: file.type }),
        });
        if (!presignRes.ok) throw new Error();
        const { url } = await presignRes.json();

        const uploadRes = await fetch(url, {
          method: "PUT",
          headers: { "Content-Type": file.type },
          body: file,
        });
        if (!uploadRes.ok) throw new Error();
        setUploadProgress((prev: { done: number; total: number }) => ({ ...prev, done: prev.done + 1 }));
      }),
    );

    for (const r of results) {
      if (r.status === "fulfilled") success++;
      else failed++;
    }

    setUploading(false);
    setUploadProgress({ done: 0, total: 0 });

    if (success > 0) {
      toast.success(`${success} arquivo(s) enviado(s) com sucesso!`);
      previews.forEach((u: string) => URL.revokeObjectURL(u));
      setSelectedFiles([]);
      setPreviews([]);
      setPreviewIndex(0);
      fetchGallery();
    }
    if (failed > 0) {
      toast.error(`${failed} arquivo(s) falharam no envio.`);
    }
  };

  const canSubmit = selectedFiles.length > 0 && !uploading;

  return (
    <div
      className="min-h-screen antialiased"
      style={{
        backgroundColor: "#131313",
        color: "#e5e2e1",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      <main className="pb-12 px-6 pt-12 max-w-[375px] mx-auto min-h-screen">
        {/* Hero Section - compact version of HeroSection */}
        <section className="text-center pt-4 mb-6">
          <motion.div
            className="mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-2xl sm:text-3xl text-white font-display" style={{ lineHeight: 0.9, marginBottom: 0 }}>
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {coupleInfo.bride}
              </motion.span>
              <motion.div
                className="flex items-center justify-center gap-2 my-0"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <motion.div
                  className="h-0.5 bg-accent-olive-light"
                  initial={{ width: 0 }}
                  animate={{ width: 40 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                />
                <span className="text-accent-olive-light text-base leading-none">&</span>
                <motion.div
                  className="h-0.5 bg-accent-olive-light"
                  initial={{ width: 0 }}
                  animate={{ width: 40 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                />
              </motion.div>
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {coupleInfo.groom}
              </motion.span>
            </h1>

            <motion.p
              className="text-sm text-accent-olive-light mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {formattedDate}
            </motion.p>
          </motion.div>

          <p className="font-light px-4" style={{ fontSize: "12px", color: "#c3c9bb" }}>
            Compartilhe seus registros deste dia especial 💛
          </p>
        </section>

        {/* Upload Card */}
        <div
          className="rounded-xl shadow-xl"
          style={{ backgroundColor: "#2a2a2a", padding: "20px", marginBottom: "32px" }}
        >
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            className="hidden"
            onChange={handleFileSelect}
          />

          {/* Name field (above upload) */}
          <div style={{ marginBottom: "16px" }}>
            <label
              className="block uppercase"
              style={{
                fontSize: "9px",
                letterSpacing: "0.1em",
                color: "#e1c299",
                marginBottom: "6px",
                marginLeft: "4px",
              }}
            >
              Seu Nome (Obrigatório)
            </label>
            <input
              ref={nameInputRef}
              type="text"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (e.target.value.trim()) setNameError(false);
                localStorage.setItem("photos_name", e.target.value);
              }}
              className="w-full rounded-lg focus:ring-1 transition-all outline-none"
              style={{
                backgroundColor: "#0e0e0e",
                color: "#e5e2e1",
                padding: "10px 16px",
                fontSize: "14px",
                border: "none",
                boxShadow: nameError ? "0 0 0 2.5px #e57373" : "none",
              }}
              placeholder="Digite seu nome"
            />
          </div>

          {/* Upload Zone */}
          {selectedFiles.length === 0 && (
            <div
              className="rounded-lg flex flex-col items-center justify-center text-center active:scale-[0.98] transition-all duration-300 cursor-pointer"
              style={{
                border: "1px dashed rgba(67,73,62,0.3)",
                backgroundColor: "#1c1b1b",
                padding: "16px",
                marginBottom: "16px",
              }}
              onClick={() => fileInputRef.current?.click()}
            >
              <CloudUpload className="w-8 h-8 mb-2" style={{ color: "#AAD493" }} />
              <p style={{ fontFamily: "'Noto Serif', serif", fontSize: "16px", color: "#e5e2e1", lineHeight: 1.4 }}>
                Toque para selecionar mídias
              </p>
              <p
                className="uppercase"
                style={{ fontSize: "8px", color: "#8d9386", letterSpacing: "0.05em", marginTop: "4px" }}
              >
                Fotos e Vídeos · Máx. 5 arquivos
              </p>
            </div>
          )}

          {/* Selected files preview - single image */}
          {previews.length === 1 && (
            <div className="mb-4">
              <div className="relative aspect-square rounded-lg overflow-hidden" style={{ backgroundColor: "#1c1b1b" }}>
                {selectedFiles[0]?.type.startsWith("video/") ? (
                  <video src={previews[0]} className="w-full h-full object-cover" />
                ) : (
                  <img src={previews[0]} alt="Selecionado 1" className="w-full h-full object-cover" />
                )}
                <button
                  onClick={() => removeFile(0)}
                  className="absolute top-1 right-1 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "rgba(0,0,0,0.7)", padding: "2px" }}
                >
                  <Trash2 className="w-3.5 h-3.5" style={{ color: "#e5e2e1" }} />
                </button>
              </div>
            </div>
          )}

          {/* Selected files preview - slider for 2+ */}
          {previews.length >= 2 && (
            <div className="mb-4">
              <div className="relative aspect-square rounded-lg overflow-hidden" style={{ backgroundColor: "#1c1b1b" }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={previewIndex}
                    className="absolute inset-0"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    {selectedFiles[previewIndex]?.type.startsWith("video/") ? (
                      <video src={previews[previewIndex]} className="w-full h-full object-cover" />
                    ) : (
                      <img src={previews[previewIndex]} alt={`Selecionado ${previewIndex + 1}`} className="w-full h-full object-cover" />
                    )}
                  </motion.div>
                </AnimatePresence>

                <button
                  onClick={() => removeFile(previewIndex)}
                  className="absolute top-1 right-1 rounded-full flex items-center justify-center z-10"
                  style={{ backgroundColor: "rgba(0,0,0,0.7)", padding: "2px" }}
                >
                  <Trash2 className="w-3.5 h-3.5" style={{ color: "#e5e2e1" }} />
                </button>

                <button
                  onClick={() => setPreviewIndex((prev: number) => (prev - 1 + previews.length) % previews.length)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full z-10"
                  style={{ backgroundColor: "rgba(0,0,0,0.6)", padding: "4px" }}
                >
                  <ChevronLeft className="w-4 h-4" style={{ color: "#e5e2e1" }} />
                </button>

                <button
                  onClick={() => setPreviewIndex((prev: number) => (prev + 1) % previews.length)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full z-10"
                  style={{ backgroundColor: "rgba(0,0,0,0.6)", padding: "4px" }}
                >
                  <ChevronRight className="w-4 h-4" style={{ color: "#e5e2e1" }} />
                </button>
              </div>

              {/* Thumbnail strip */}
              <div className="flex gap-2 mt-3 justify-center">
                {previews.map((src: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setPreviewIndex(i)}
                    className="rounded-md overflow-hidden transition-all"
                    style={{
                      width: "40px",
                      height: "40px",
                      flexShrink: 0,
                      border: i === previewIndex ? "2px solid #AAD493" : "2px solid transparent",
                      opacity: i === previewIndex ? 1 : 0.5,
                    }}
                  >
                    {selectedFiles[i]?.type.startsWith("video/") ? (
                      <video src={src} className="w-full h-full object-cover" />
                    ) : (
                      <img src={src} alt={`Thumb ${i + 1}`} className="w-full h-full object-cover" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          {selectedFiles.length > 0 && (
            <div style={{ marginTop: "20px", display: "flex", gap: "8px" }}>
              <button
                className="flex-1 rounded-lg shadow-lg uppercase flex items-center justify-center gap-2"
                style={{
                  padding: "14px",
                  backgroundColor: canSubmit ? "rgba(143,184,122,0.7)" : "rgba(143,184,122,0.5)",
                  color: "#e5e2e1",
                  fontSize: "10px",
                  letterSpacing: "0.15rem",
                  cursor: canSubmit ? "pointer" : "not-allowed",
                }}
                disabled={!canSubmit}
                onClick={handleSubmit}
              >
                {uploading && <Loader2 className="w-4 h-4 animate-spin" />}
                {uploading
                  ? `Enviando ${uploadProgress.done}/${uploadProgress.total}...`
                  : "Enviar para o álbum"}
              </button>
              {selectedFiles.length < MAX_FILES && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-lg flex items-center justify-center active:scale-[0.95] transition-all"
                  style={{
                    padding: "14px",
                    backgroundColor: "#1c1b1b",
                    border: "1px dashed rgba(67,73,62,0.3)",
                    color: "#AAD493",
                  }}
                >
                  <Plus className="w-5 h-5" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Gallery Section */}
        <section>
          <div className="flex items-center mb-8">
            <span className="font-display" style={{ fontSize: "16px", color: "#e5e2e1", lineHeight: 1.4 }}>
              Memórias recentes
            </span>
            <span className="flex-grow ml-4" style={{ height: "1px", backgroundColor: "rgba(67,73,62,0.2)" }} />
          </div>
          {galleryLoading ? (
            <div className="flex justify-center pt-6">
              <Loader2 className="w-6 h-6 animate-spin" style={{ color: "#AAD493" }} />
            </div>
          ) : gallery.length === 0 ? (
            <p className="text-center py-8" style={{ fontSize: "13px", color: "#8d9386" }}>
              Nenhuma foto enviada ainda. Seja o primeiro!
            </p>
          ) : (
            <ImageGallery images={gallery.map((item) => item.url)} />
          )}
          <div style={{ height: "32px" }} />
        </section>
      </main>
      <ToasterProvider />
    </div>
  );
}
