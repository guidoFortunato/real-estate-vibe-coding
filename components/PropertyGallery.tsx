"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslation } from "../hooks/useTranslation";

export function PropertyGallery({
  images,
  title,
  status,
}: {
  images: string[];
  title: string;
  status: string;
}) {
  const { t } = useTranslation();
  const [activeImage, setActiveImage] = useState(0);
  const fallbackImages = [
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=1000",
  ];

  // Map original images to their current state (either original or fallback)
  const [currentImages, setCurrentImages] = useState(images);

  const handleImageError = (index: number) => {
    const randomIndex = Math.floor(Math.random() * fallbackImages.length);
    const newImages = [...currentImages];
    newImages[index] = fallbackImages[randomIndex];
    setCurrentImages(newImages);
  };

  const validImages = currentImages.filter((img) => img && img.trim() !== "");
  const safeSrc = validImages[activeImage] ?? validImages[0] ?? "";

  const getStatusLabel = (s: string) => {
    switch (s) {
      case "Exclusive": return t('property_status.exclusive');
      case "New Arrival": return t('property_status.new_arrival');
      default: return s;
    }
  };

  return (
    <>
      {/* ─── Main image ─────────────────────────────────────── */}
      <div className="relative aspect-16/10 overflow-hidden rounded-xl shadow-sm group">
        <Image
          src={safeSrc}
          alt={title}
          fill
          priority
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 66vw"
          onError={() => handleImageError(activeImage)}
        />
        <div className="absolute top-4 left-4 flex gap-2">
          {status !== "Standard" && (
            <span className="bg-mosque text-white text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
              {getStatusLabel(status)}
            </span>
          )}
        </div>
        <button className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-nordic px-4 py-2 rounded-lg text-sm font-medium shadow-lg backdrop-blur transition-all flex items-center gap-2 cursor-pointer">
          <span className="material-icons text-sm">grid_view</span>
          {t('gallery.view_all')}
        </button>
      </div>

      {/* ─── Thumbnail strip ──────────────────────────────────── */}
      {validImages.length > 1 && (
        // px-0.5 + py-1 give breathing room so the ring is never clipped
        <div
          className="flex gap-3 pl-1.5 pr-0.5 py-1 snap-x snap-mandatory"
          style={{
            overflowX: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {validImages.map((img, idx) => {
            const isActive = activeImage === idx;

            return (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`flex-none snap-start cursor-pointer rounded-lg transition-all duration-200 ${
                  isActive
                    ? "ring-2 ring-mosque ring-offset-2 ring-offset-white"
                    : "opacity-60 hover:opacity-90"
                }`}
                style={{ width: 176, aspectRatio: "4 / 3", position: "relative" }}
              >
                {/* Inner div handles clipping — ring stays on the outer button */}
                <div className="absolute inset-0 rounded-lg overflow-hidden">
                  <Image
                    src={img}
                    alt={`${title} - view ${idx + 1}`}
                    fill
                    sizes="176px"
                    className="w-full h-full object-cover"
                    onError={() => handleImageError(idx)}
                  />
                </div>
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}
