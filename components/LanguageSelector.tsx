"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "../hooks/useTranslation";
import { locales, languageNames, languageFlags, Locale } from "../lib/i18n/i18n-config";

export const LanguageSelector = () => {
  const { locale, setLocale, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (newLocale: Locale) => {
    setLocale(newLocale);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg border border-nordic-dark/10 hover:bg-gray-50 transition-all text-sm font-medium text-nordic-dark bg-white shadow-xs"
      >
        <span className="text-base leading-none">{languageFlags[locale]}</span>
        <span>{languageNames[locale]}</span>
        <span className={`material-icons text-sm transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
          expand_more
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-nordic-dark/5 overflow-hidden z-200 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="py-1.5 p-1">
            {locales.map((loc) => (
              <button
                key={loc}
                onClick={() => handleLanguageChange(loc)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-3 mb-0.5 last:mb-0 ${
                  locale === loc
                    ? "bg-mosque/10 text-mosque font-semibold"
                    : "text-nordic-dark hover:bg-gray-50"
                }`}
              >
                <span className="text-lg leading-none">{languageFlags[loc]}</span>
                <span className="flex-1">{languageNames[loc]}</span>
                {locale === loc && <span className="material-icons text-xs">check</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
