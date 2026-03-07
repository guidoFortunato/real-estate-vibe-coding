"use client";

import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useMemo } from 'react';

// fix generic leaflet icon issues
const icon = L.divIcon({
  className: 'custom-leaflet-icon',
  html: `<div class="w-8 h-8 bg-mosque rounded-full border-4 border-white shadow-lg flex items-center justify-center">
          <span class="material-icons text-white text-[18px]">home</span>
         </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32]
});

export default function MapLeaflet({ location }: { location: string }) {
  // A crude deterministic hash to generate coordinates based on location string 
  // since we don't have a geospatial DB or real lat/long data in this mock
  const coords = useMemo(() => {
    let hash = 0;
    for (let i = 0; i < location.length; i++) {
        hash = location.charCodeAt(i) + ((hash << 5) - hash);
    }
    const lat = 34.0522 + (hash % 100) / 1000;
    const lng = -118.2437 + ((hash >> 2) % 100) / 1000;
    return [lat, lng] as [number, number];
  }, [location]);

  return (
    <div className="relative w-full aspect-4/3 rounded-lg overflow-hidden bg-slate-100 z-0">
      <MapContainer 
        center={coords} 
        zoom={13} 
        scrollWheelZoom={false} 
        style={{ height: '100%', width: '100%', zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <Marker position={coords} icon={icon}></Marker>
      </MapContainer>
      <a className="absolute bottom-2 right-2 bg-white/90 text-xs font-medium px-2 py-1 rounded shadow-sm text-nordic hover:text-mosque z-1000" href="#">
        View on Map
      </a>
    </div>
  );
}
