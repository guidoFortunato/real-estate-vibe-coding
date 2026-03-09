"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface FiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FiltersModal = ({ isOpen, onClose }: FiltersModalProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [propertyType, setPropertyType] = useState(searchParams.get("propertyType") || "Any Type");
  const [beds, setBeds] = useState(parseInt(searchParams.get("beds") || "0", 10));
  const [baths, setBaths] = useState(parseInt(searchParams.get("baths") || "0", 10));
  const [amenities, setAmenities] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleApply = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (location) params.set("location", location); else params.delete("location");
    if (minPrice) params.set("minPrice", minPrice); else params.delete("minPrice");
    if (maxPrice) params.set("maxPrice", maxPrice); else params.delete("maxPrice");
    if (propertyType !== "Any Type") params.set("propertyType", propertyType); else params.delete("propertyType");
    if (beds > 0) params.set("beds", beds.toString()); else params.delete("beds");
    if (baths > 0) params.set("baths", baths.toString()); else params.delete("baths");
    
    params.set("page", "1");
    router.push(`/?${params.toString()}`);
    onClose();
  };

  const handleClear = () => {
    setLocation("");
    setMinPrice("");
    setMaxPrice("");
    setPropertyType("Any Type");
    setBeds(0);
    setBaths(0);
    setAmenities([]);
    router.push("/");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-nordic-dark/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <main className="relative z-50 w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <header className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-30">
          <h1 className="text-2xl font-semibold tracking-tight text-nordic-dark">Filters</h1>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors text-nordic-muted"
          >
            <span className="material-icons">close</span>
          </button>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto hide-scroll p-8 space-y-10">
          {/* Section 1: Location */}
          <section>
            <label className="block text-xs font-semibold text-nordic-muted uppercase tracking-wider mb-3">Location</label>
            <div className="relative group">
              <span className="material-icons absolute left-4 top-3.5 text-nordic-muted/50 group-focus-within:text-mosque transition-colors">location_on</span>
              <input 
                className="w-full pl-12 pr-4 py-3 bg-nordic-dark/5 border-0 rounded-xl text-nordic-dark placeholder-nordic-muted/40 focus:ring-2 focus:ring-mosque focus:bg-white transition-all shadow-sm" 
                placeholder="City, neighborhood, or address" 
                type="text" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </section>

          {/* Section 2: Price Range */}
          <section>
            <div className="flex justify-between items-end mb-4">
              <label className="block text-xs font-semibold text-nordic-muted uppercase tracking-wider">Price Range</label>
              <span className="text-sm font-medium text-mosque">
                {minPrice || "0"} – {maxPrice || "Any"}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-nordic-dark/5 p-3 rounded-xl border border-transparent focus-within:border-mosque/30 focus-within:bg-white transition-colors">
                <label className="block text-[10px] text-nordic-muted uppercase font-medium mb-1">Min Price</label>
                <div className="flex items-center">
                  <span className="text-nordic-muted/50 mr-1">$</span>
                  <input 
                    className="w-full bg-transparent border-0 p-0 text-nordic-dark font-medium focus:ring-0 text-sm" 
                    type="number" 
                    placeholder="0"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                </div>
              </div>
              <div className="bg-nordic-dark/5 p-3 rounded-xl border border-transparent focus-within:border-mosque/30 focus-within:bg-white transition-colors">
                <label className="block text-[10px] text-nordic-muted uppercase font-medium mb-1">Max Price</label>
                <div className="flex items-center">
                  <span className="text-nordic-muted/50 mr-1">$</span>
                  <input 
                    className="w-full bg-transparent border-0 p-0 text-nordic-dark font-medium focus:ring-0 text-sm" 
                    type="number" 
                    placeholder="Any"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Property Details */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Property Type */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-nordic-muted uppercase tracking-wider">Property Type</label>
              <div className="relative">
                <select 
                  className="w-full bg-nordic-dark/5 border-0 rounded-xl py-3 pl-4 pr-10 text-nordic-dark appearance-none focus:ring-2 focus:ring-mosque cursor-pointer"
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                >
                  <option>Any Type</option>
                  <option>House</option>
                  <option>Apartment</option>
                  <option>Condo</option>
                  <option>Townhouse</option>
                </select>
                <span className="material-icons absolute right-3 top-3 text-nordic-muted pointer-events-none">expand_more</span>
              </div>
            </div>

            {/* Rooms */}
            <div className="space-y-4">
              {/* Beds */}
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-nordic-dark">Bedrooms</span>
                <div className="flex items-center space-x-3 bg-nordic-dark/5 rounded-full p-1">
                  <button 
                    onClick={() => setBeds(Math.max(0, beds - 1))}
                    className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-nordic-muted hover:text-mosque disabled:opacity-50 transition-colors"
                  >
                    <span className="material-icons text-base">remove</span>
                  </button>
                  <span className="text-sm font-semibold w-6 text-center">{beds}{beds === 5 ? "+" : ""}</span>
                  <button 
                    onClick={() => setBeds(Math.min(5, beds + 1))}
                    className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-mosque hover:bg-mosque hover:text-white transition-colors"
                  >
                    <span className="material-icons text-base">add</span>
                  </button>
                </div>
              </div>
              {/* Baths */}
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-nordic-dark">Bathrooms</span>
                <div className="flex items-center space-x-3 bg-nordic-dark/5 rounded-full p-1">
                  <button 
                    onClick={() => setBaths(Math.max(0, baths - 1))}
                    className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-nordic-muted hover:text-mosque transition-colors"
                  >
                    <span className="material-icons text-base">remove</span>
                  </button>
                  <span className="text-sm font-semibold w-6 text-center">{baths}{baths === 5 ? "+" : ""}</span>
                  <button 
                    onClick={() => setBaths(Math.min(5, baths + 1))}
                    className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-mosque hover:bg-mosque hover:text-white transition-colors"
                  >
                    <span className="material-icons text-base">add</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Amenities */}
          <section>
            <label className="block text-xs font-semibold text-nordic-muted uppercase tracking-wider mb-4">Amenities & Features</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { id: "pool", label: "Swimming Pool", icon: "pool" },
                { id: "gym", label: "Gym", icon: "fitness_center" },
                { id: "parking", label: "Parking", icon: "local_parking" },
                { id: "ac", label: "Air Conditioning", icon: "ac_unit" },
                { id: "wifi", label: "Wifi", icon: "wifi" },
                { id: "patio", label: "Patio", icon: "deck" },
              ].map((item) => (
                <label key={item.id} className="cursor-pointer group relative">
                  <input 
                    type="checkbox" 
                    className="peer sr-only"
                    checked={amenities.includes(item.id)}
                    onChange={() => {
                      if (amenities.includes(item.id)) {
                        setAmenities(amenities.filter(a => a !== item.id));
                      } else {
                        setAmenities([...amenities, item.id]);
                      }
                    }}
                  />
                  <div className="h-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-nordic-muted text-sm flex items-center justify-center gap-2 transition-all hover:border-mosque/30 peer-checked:bg-mosque/5 peer-checked:border-mosque peer-checked:text-mosque peer-checked:font-medium">
                    <span className="material-icons text-lg group-hover:scale-110 transition-transform">{item.icon}</span>
                    {item.label}
                  </div>
                  <div className={`absolute top-2 right-2 w-2 h-2 bg-mosque rounded-full transition-opacity ${amenities.includes(item.id) ? "opacity-100" : "opacity-0"}`}></div>
                </label>
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-100 px-8 py-6 sticky bottom-0 z-30 flex items-center justify-between">
          <button 
            onClick={handleClear}
            className="text-sm font-medium text-nordic-muted hover:text-nordic-dark transition-colors underline decoration-nordic-muted/30 underline-offset-4"
          >
            Clear all filters
          </button>
          <button 
            onClick={handleApply}
            className="bg-mosque hover:bg-mosque/90 text-white px-8 py-3 rounded-xl font-medium shadow-lg shadow-mosque/20 transition-all transform active:scale-95 flex items-center gap-2"
          >
            Show Properties
            <span className="material-icons text-sm">arrow_forward</span>
          </button>
        </footer>
      </main>
    </div>
  );
};
