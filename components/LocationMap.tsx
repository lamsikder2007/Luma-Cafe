"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export const FLAGSHIP_POSITION: [number, number] = [23.8069, 90.3684];

const markerIcon = L.divIcon({
  className: "luma-map-marker",
  html: `<div style="
    width: 40px; height: 40px; border-radius: 9999px;
    background: #2c1d11; color: #fcf9f4;
    display: flex; align-items: center; justify-content: center;
    font-family: Georgia, serif; font-weight: 700; font-size: 20px;
    border: 3px solid #fcf9f4;
    box-shadow: 0 8px 24px rgba(44,29,17,0.35);
  ">L</div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -20],
});

interface LocationMapProps {
  className?: string;
  zoom?: number;
}

export default function LocationMap({ className, zoom = 16 }: LocationMapProps) {
  return (
    <MapContainer
      center={FLAGSHIP_POSITION}
      zoom={zoom}
      scrollWheelZoom={false}
      className={className ?? "h-full w-full"}
      style={{ background: "#f0ede9" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      <Marker position={FLAGSHIP_POSITION} icon={markerIcon}>
        <Popup>
          <div style={{ fontFamily: "sans-serif" }}>
            <strong>Luma Café — Mirpur 10 Flagship</strong>
            <br />
            Plot 14, Avenue 5, Mirpur 10, Dhaka
            <br />
            Open daily · 7:30 AM – 10:30 PM
            <br />
            <a
              href="https://maps.google.com/?q=Mirpur+10+Dhaka"
              target="_blank"
              rel="noreferrer"
            >
              Get Directions
            </a>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
