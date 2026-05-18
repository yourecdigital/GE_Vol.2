"use client";

import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface MapPoint {
  pos: [number, number];
  label: string;
  sub?: string;
  tier: 1 | 2 | 3;
}

const MAP_POINTS: MapPoint[] = [
  // Tier 1 — Страна
  { pos: [59.9343, 30.3351], label: "@XXIBRO", sub: "Санкт-Петербург", tier: 1 },
  // Tier 2 — Регионы
  { pos: [55.7558, 37.6176], label: "ЦФО", sub: "Москва", tier: 2 },
  { pos: [54.9885, 82.9207], label: "СФО", sub: "Новосибирск", tier: 2 },
  { pos: [56.8389, 60.6057], label: "УФО", sub: "Екатеринбург", tier: 2 },
  { pos: [45.0355, 38.9753], label: "ЮФО", sub: "Краснодар", tier: 2 },
  { pos: [54.7065, 20.5110], label: "СЗФО", sub: "Калининград", tier: 2 },
  { pos: [56.3269, 44.0059], label: "ПФО", sub: "Нижний Новгород", tier: 2 },
  // Euro ДВИЖ
  { pos: [52.5200, 13.4050], label: "Берлин", sub: "Euro ДВИЖ", tier: 3 },
  { pos: [50.0755, 14.4378], label: "Прага", sub: "Euro ДВИЖ", tier: 3 },
  { pos: [48.2082, 16.3738], label: "Вена", sub: "Euro ДВИЖ", tier: 3 },
  { pos: [47.4979, 19.0402], label: "Будапешт", sub: "Euro ДВИЖ", tier: 3 },
  { pos: [52.2297, 21.0122], label: "Варшава", sub: "Euro ДВИЖ", tier: 3 },
  { pos: [44.8048, 20.4781], label: "Белград", sub: "Euro ДВИЖ", tier: 3 },
];

const TIER_STYLE: Record<number, { color: string; radius: number }> = {
  1: { color: "#FF5200", radius: 10 },
  2: { color: "#cc4200", radius: 6 },
  3: { color: "#664400", radius: 5 },
};

export default function PeopleMap() {
  return (
    <MapContainer
      center={[54, 50]}
      zoom={3}
      style={{ height: "100%", width: "100%", background: "#070707" }}
      scrollWheelZoom={false}
      zoomControl={false}
      attributionControl={true}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions" target="_blank">CARTO</a>'
        subdomains="abcd"
        maxZoom={19}
      />

      {MAP_POINTS.map((point, i) => {
        const style = TIER_STYLE[point.tier];
        return (
          <CircleMarker
            key={i}
            center={point.pos}
            radius={style.radius}
            pathOptions={{
              color: style.color,
              fillColor: style.color,
              fillOpacity: point.tier === 1 ? 1 : 0.7,
              weight: 0,
            }}
          >
            <Tooltip
              direction="top"
              offset={[0, -style.radius - 4]}
              opacity={1}
            >
              <div style={{ fontFamily: "monospace", fontSize: "11px", lineHeight: 1.4 }}>
                <span style={{ color: "#FF5200", fontWeight: "bold" }}>{point.label}</span>
                {point.sub && (
                  <>
                    <br />
                    <span style={{ color: "#888", fontSize: "10px" }}>{point.sub}</span>
                  </>
                )}
              </div>
            </Tooltip>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
