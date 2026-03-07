"use client";

import dynamic from "next/dynamic";

const MapLeaflet = dynamic(() => import("./MapLeaflet"), {
  ssr: false,
  loading: () => <div className="w-full aspect-4/3 bg-slate-100 rounded-lg animate-pulse" />
});

export function MapWrapper({ location }: { location: string }) {
  return <MapLeaflet location={location} />;
}
