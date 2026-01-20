import { useEffect } from "react";
import { useMap } from "react-leaflet";

export default function Recenter({ coords }) {
    const map = useMap();
    const lat = Number(coords.split(",")[0]);
    const lng = Number(coords.split(",")[1]);

    useEffect(() => {
        map.setView([lat, lng], map.getZoom());
    }, [lat, lng, map]);

    return null;
}