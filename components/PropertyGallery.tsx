"use client";

import Image from "next/image";
import { useState } from "react";

export function PropertyGallery({
  images,
  title,
  status,
}: {
  images: string[];
  title: string;
  status: string;
}) {
  const [activeImage, setActiveImage] = useState(0);
  // Track which thumbnails failed to load so we skip them
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  const validImages = images.filter((img) => img && img.trim() !== "");

  // Build the displayed list — replace failed ones with a null so we can skip them
  const displayImages = validImages.filter((_, idx) => !failedImages.has(idx));

  const safeSrc = validImages[activeImage] ?? validImages[0] ?? "";

  const handleThumbnailError = (originalIdx: number) => {
    setFailedImages((prev) => new Set(prev).add(originalIdx));
    // If the active image fails, fall back to the first one
    if (activeImage === originalIdx) setActiveImage(0);
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
        />
        <div className="absolute top-4 left-4 flex gap-2">
          {status !== "Standard" && (
            <span className="bg-mosque text-white text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
              {status}
            </span>
          )}
        </div>
        <button className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-nordic px-4 py-2 rounded-lg text-sm font-medium shadow-lg backdrop-blur transition-all flex items-center gap-2 cursor-pointer">
          <span className="material-icons text-sm">grid_view</span>
          View All Photos
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
            // Skip images that failed to load
            if (failedImages.has(idx)) return null;

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
                    onError={() => handleThumbnailError(idx)}
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
