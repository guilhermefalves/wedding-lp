import { useEffect, useRef, useState } from "react";
import { CloudUpload, X, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { coupleInfo, weddingInfo } from "../config/constants";
import { toast } from "sonner";
import { ToasterProvider } from "../components/ToasterProvider";
import { ImageGallery } from "../components/ImageGallery";

export default function Photos() {
  const formattedDate = weddingInfo.weddingDate.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [name, setName] = useState(() => localStorage.getItem("photos_name") || "");
  const [uploading, setUploading] = useState(false);
  const [gallery, setGallery] = useState<{ id: string; name: string; url: string }[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(true);

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
    const validFiles = files.filter((f) => f.size <= 100 * 1024 * 1024);
    setSelectedFiles((prev) => [...prev, ...validFiles]);

    validFiles.forEach((file) => {
      const url = URL.createObjectURL(file);
      setPreviews((prev) => [...prev, url]);
    });

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeFile = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (selectedFiles.length === 0 || !name.trim()) return;

    setUploading(true);
    let success = 0;
    let failed = 0;

    const results = await Promise.allSettled(
      selectedFiles.map(async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("name", name.trim());
        return fetch("/api/upload", { method: "POST", body: formData }).then(
          (res) => {
            if (!res.ok) throw new Error();
          },
        );
      }),
    );

    for (const r of results) {
      if (r.status === "fulfilled") success++;
      else failed++;
    }

    setUploading(false);

    if (success > 0) {
      toast.success(`${success} arquivo(s) enviado(s) com sucesso!`);
      previews.forEach((u: string) => URL.revokeObjectURL(u));
      setSelectedFiles([]);
      setPreviews([]);
      fetchGallery();
    }
    if (failed > 0) {
      toast.error(`${failed} arquivo(s) falharam no envio.`);
    }
  };

  const canSubmit = selectedFiles.length > 0 && name.trim().length > 0 && !uploading;

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

          {/* Upload Zone */}
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
              Fotos e Vídeos até 100MB
            </p>
          </div>

          {/* Selected files preview */}
          {previews.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mb-4">
              {previews.map((src, i) => (
                <div key={i} className="relative aspect-square rounded-lg overflow-hidden" style={{ backgroundColor: "#1c1b1b" }}>
                  {selectedFiles[i]?.type.startsWith("video/") ? (
                    <video src={src} className="w-full h-full object-cover" />
                  ) : (
                    <img src={src} alt={`Selecionado ${i + 1}`} className="w-full h-full object-cover" />
                  )}
                  <button
                    onClick={() => removeFile(i)}
                    className="absolute top-1 right-1 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "rgba(0,0,0,0.7)", padding: "2px" }}
                  >
                    <X className="w-3.5 h-3.5" style={{ color: "#e5e2e1" }} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Fields */}
          <div className="space-y-4">
            <div>
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
                type="text"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  localStorage.setItem("photos_name", e.target.value);
                }}
                className="w-full border-none rounded-lg focus:ring-1 transition-all"
                style={{
                  backgroundColor: "#0e0e0e",
                  color: "#e5e2e1",
                  padding: "10px 16px",
                  fontSize: "14px",
                }}
                placeholder="Como quer ser identificado?"
              />
            </div>
          </div>

          {/* Actions */}
          <div style={{ marginTop: "20px" }}>
            <button
              className="w-full rounded-lg shadow-lg uppercase flex items-center justify-center gap-2"
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
              {uploading ? "Enviando..." : "Enviar para o álbum"}
            </button>
          </div>
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
        </section>
      </main>
      <ToasterProvider />
    </div>
  );
}
