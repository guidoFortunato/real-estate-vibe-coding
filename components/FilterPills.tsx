"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiltersModal } from "./FiltersModal";

export const FilterPills = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentType = searchParams.get("propertyType") || "All";
  const filters = ["All", "House", "Apartment", "Villa", "Penthouse"];

  const handleFilterClick = (filter: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (filter === "All") {
      params.delete("propertyType");
    } else {
      params.set("propertyType", filter);
    }
    params.set("page", "1");
    router.push(`/?${params.toString()}`);
  };

  return (
    <>
      <div className="flex items-center justify-center gap-3 overflow-x-auto hide-scroll py-2 px-4 -mx-4">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => handleFilterClick(filter)}
            className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all ${
              filter === currentType
                ? "bg-nordic-dark text-white shadow-lg shadow-nordic-dark/10 hover:-translate-y-0.5"
                : "bg-white border border-nordic-dark/5 text-nordic-muted hover:text-nordic-dark hover:border-mosque/50 hover:bg-mosque/5"
            }`}
          >
            {filter}
          </button>
        ))}

        <div className="w-px h-6 bg-nordic-dark/10 mx-2"></div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="whitespace-nowrap flex items-center gap-1 px-4 py-2 rounded-full text-nordic-dark font-medium text-sm hover:bg-black/5 transition-colors"
        >
          <span className="material-icons text-base">tune</span> Filters
        </button>
      </div>

      <FiltersModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};
