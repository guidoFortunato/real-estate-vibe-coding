"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Property } from "../lib/properties";
import { useTranslation } from "../hooks/useTranslation";

interface PropertyCardProps {
  property: Property;
  featuredDesign?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  featuredDesign = false,
}) => {
  const { t, locale } = useTranslation();
  const [mounted, setMounted] = React.useState(false);
  const [imgSrc, setImgSrc] = React.useState(property.images?.[0] || "");
  
  const fallbackImages = [
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=1000",
  ];

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(locale === 'en' ? 'en-US' : locale === 'es' ? 'es-ES' : 'fr-FR', {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatArea = (area: number) => {
    if (!mounted) return area.toString(); // Simple string for SSR
    return area.toLocaleString(locale === 'en' ? 'en-US' : locale === 'es' ? 'es-ES' : 'fr-FR'); // Formatted for Client
  };

  const handleImageError = () => {
    const randomIndex = Math.floor(Math.random() * fallbackImages.length);
    setImgSrc(fallbackImages[randomIndex]);
  };

  if (featuredDesign) {
    return (
      <Link
        href={`/property/${property.slug}`}
        className="group relative rounded-xl overflow-hidden shadow-soft bg-white cursor-pointer block"
      >
        <div className="aspect-4/3 w-full overflow-hidden relative">
          <Image
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            src={imgSrc}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={handleImageError}
          />
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-nordic-dark">
            {property.status}
          </div>
          <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-nordic-dark hover:bg-mosque hover:text-white transition-all shadow-sm">
            <span className="material-icons text-xl">favorite_border</span>
          </button>
          <div className="absolute bottom-0 inset-x-0 h-1/2 bg-linear-to-t from-black/60 to-transparent opacity-60"></div>
        </div>

        <div className="p-6 relative">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-xl font-medium text-nordic-dark group-hover:text-mosque transition-colors">
                {property.title}
              </h3>
              <p className="text-nordic-muted text-sm flex items-center gap-1 mt-1">
                <span className="material-icons text-sm">place</span>{" "}
                {property.location}
              </p>
            </div>
            <span className="text-xl font-semibold text-mosque">
              {formatPrice(property.price)}
            </span>
          </div>

          <div className="flex items-center gap-6 mt-6 pt-6 border-t border-nordic-dark/5">
            <div className="flex items-center gap-2 text-nordic-muted text-sm">
              <span className="material-icons text-lg">king_bed</span>{" "}
              {property.beds} {t('property.beds')}
            </div>
            <div className="flex items-center gap-2 text-nordic-muted text-sm">
              <span className="material-icons text-lg">bathtub</span>{" "}
              {property.baths} {t('property.baths')}
            </div>
            <div className="flex items-center gap-2 text-nordic-muted text-sm shadow-none">
              <span className="material-icons text-lg">square_foot</span>{" "}
              {formatArea(property.area)} {t('property.area')}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/property/${property.slug}`}
      className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-soft transition-all duration-300 group cursor-pointer h-full flex flex-col"
    >
      <div className="relative aspect-4/3 overflow-hidden">
        <Image
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          src={imgSrc}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={handleImageError}
        />
        <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-nordic-dark hover:bg-mosque hover:text-white transition-all shadow-sm">
          <span className="material-icons text-xl">favorite_border</span>
        </button>
        <div
          className={`absolute bottom-3 left-3 text-white text-xs font-bold px-2 py-1 rounded ${property.type === "rent" ? "bg-mosque/90" : "bg-nordic-dark/90"}`}
        >
          {property.type === 'rent' ? t('property.for_rent') : t('property.for_sale')}
        </div>
      </div>

      <div className="p-4 flex flex-col grow">
        <div className="flex justify-between items-baseline mb-2">
          <h3 className="font-bold text-lg text-nordic-dark">
            {formatPrice(property.price)}
            {property.price_per_month && (
              <span className="text-sm font-normal text-nordic-muted">{t('property.per_month')}</span>
            )}
          </h3>
        </div>
        <h4 className="text-nordic-dark font-medium truncate mb-1">
          {property.title}
        </h4>
        <p className="text-nordic-muted text-xs mb-4">{property.location}</p>

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1 text-nordic-muted text-xs">
            <span className="material-icons text-sm text-mosque/80">
              king_bed
            </span>{" "}
            {property.beds}
          </div>
          <div className="flex items-center gap-1 text-nordic-muted text-xs">
            <span className="material-icons text-sm text-mosque/80">
              bathtub
            </span>{" "}
            {property.baths}
          </div>
          <div className="flex items-center gap-1 text-nordic-muted text-xs">
            <span className="material-icons text-sm text-mosque/80">
              square_foot
            </span>{" "}
            {formatArea(property.area)}{t('property.area')}
          </div>
        </div>
      </div>
    </Link>
  );
};
