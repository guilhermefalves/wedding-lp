import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, X, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function GalleryFull() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/gallery?all=true")
      .then((res) => res.json())
      .then((data) => setImages((data.files || []).map((f: { url: string }) => f.url)))
      .catch(() => setImages([]))
      .finally(() => setLoading(false));
  }, []);

  const openLightbox = (index: number) => setLightbox(index);
  const closeLightbox = () => setLightbox(null);

  const prevImage = () => {
    if (lightbox === null) return;
    setLightbox((lightbox - 1 + images.length) % images.length);
  };

  const nextImage = () => {
    if (lightbox === null) return;
    setLightbox((lightbox + 1) % images.length);
  };

  useEffect(() => {
    if (lightbox === null) return;
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [lightbox, images.length]);

  return (
    <div
      className="min-h-screen antialiased"
      style={{
        backgroundColor: "#131313",
        color: "#e5e2e1",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      <main className="pb-12 px-4 pt-8 max-w-[500px] mx-auto min-h-screen">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 pt-3">
          <Link
            to="/fotos"
            className="flex items-center justify-center rounded-full"
            style={{ backgroundColor: "#2a2a2a", padding: "8px" }}
          >
            <ArrowLeft className="w-5 h-5" style={{ color: "#AAD493" }} />
          </Link>
          <h1 className="font-display text-lg" style={{ color: "#e5e2e1" }}>
            Todas as fotos
          </h1>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center pt-12">
            <Loader2 className="w-6 h-6 animate-spin" style={{ color: "#AAD493" }} />
          </div>
        ) : images.length === 0 ? (
          <p className="text-center py-12" style={{ fontSize: "13px", color: "#8d9386" }}>
            Nenhuma foto enviada ainda.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {images.map((url, i) => (
              <motion.button
                key={url}
                className="aspect-square rounded-lg overflow-hidden"
                style={{ backgroundColor: "#1c1b1b" }}
                onClick={() => openLightbox(i)}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <img
                  src={url}
                  alt={`Foto ${i + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.button>
            ))}
          </div>
        )}

        <div style={{ height: "32px" }} />
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ backgroundColor: "rgba(0,0,0,0.95)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button
              className="absolute top-4 right-4 z-10 rounded-full"
              style={{ backgroundColor: "rgba(255,255,255,0.1)", padding: "8px" }}
              onClick={closeLightbox}
            >
              <X className="w-6 h-6" style={{ color: "#e5e2e1" }} />
            </button>

            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full"
              style={{ backgroundColor: "rgba(255,255,255,0.1)", padding: "8px" }}
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
            >
              <ChevronLeft className="w-6 h-6" style={{ color: "#e5e2e1" }} />
            </button>

            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 rounded-full"
              style={{ backgroundColor: "rgba(255,255,255,0.1)", padding: "8px" }}
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              <ChevronRight className="w-6 h-6" style={{ color: "#e5e2e1" }} />
            </button>

            <AnimatePresence mode="wait">
              <motion.img
                key={lightbox}
                src={images[lightbox]}
                alt={`Foto ${lightbox + 1}`}
                className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
              />
            </AnimatePresence>

            <div
              className="absolute bottom-4 left-1/2 -translate-x-1/2"
              style={{ fontSize: "13px", color: "#8d9386" }}
            >
              {lightbox + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
