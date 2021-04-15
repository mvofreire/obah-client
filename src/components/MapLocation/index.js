import React, { useMemo, useRef } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
const position = [51.505, -0.09];

const MapLocation = ({ onFoundLocation }) => {
  const markerRef = useRef(null);
  const events = useMemo(() => ({
    dragend() {
      onFoundLocation(markerRef.current.getLatLng())
    },
  }));
  return (
    <div style={{ height: 400 }}>
      <MapContainer
        style={{ height: "100%" }}
        center={position}
        zoom={13}

      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker
          ref={markerRef}
          position={position}
          draggable
          eventHandlers={events}
        />
      </MapContainer>
    </div>
  );
};

export { MapLocation };
