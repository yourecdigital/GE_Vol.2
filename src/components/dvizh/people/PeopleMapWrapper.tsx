"use client";

import dynamic from "next/dynamic";

const PeopleMapDynamic = dynamic(() => import("./PeopleMap"), {
  ssr: false,
  loading: () => <div className="map-loading">загружаем карту…</div>,
});

export function PeopleMapWrapper() {
  return <PeopleMapDynamic />;
}
