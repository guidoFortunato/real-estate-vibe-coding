"use client";

import Image from "next/image";
import { useState } from "react";

export function PropertyGallery({ images, title, status }: { images: string[], title: string, status: string }) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <>
      <div className="relative aspect-16/10 overflow-hidden rounded-xl shadow-sm group">
        <Image 
          src={images[activeImage] || images[0]} 
          alt={title}
          fill
          priority
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 66vw"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          {status !== 'Standard' && (
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

      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 snap-x">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(idx)}
              className={`flex-none w-48 aspect-4/3 rounded-lg overflow-hidden cursor-pointer snap-start relative transition-all ${
                activeImage === idx 
                  ? 'ring-2 ring-mosque ring-offset-2 ring-offset-clear-day opacity-100' 
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              <Image 
                src={img} 
                alt={`${title} - view ${idx + 1}`} 
                fill
                sizes="192px"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </>
  );
}
