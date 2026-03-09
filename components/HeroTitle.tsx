"use client";

import React from "react";
import { useTranslation } from "../hooks/useTranslation";

export const HeroTitle = () => {
  const { t } = useTranslation();

  return (
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-nordic-dark leading-tight">
      {t("home.hero_title_1")}{" "}
      <span className="relative inline-block">
        <span className="relative z-10 font-medium">{t("home.hero_accent")}</span>
        <span className="absolute bottom-2 left-0 w-full h-3 bg-mosque/20 -rotate-1 z-0"></span>
      </span>
      {t("home.hero_title_2")}
    </h1>
  );
};
