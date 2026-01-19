import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

export default function RadarMap({coords, zoom, layer="precip"}) {
    const mapRef = useRef(false);
    const lat = Number(coords.split(",")[0]);
    const lng = Number(coords.split(",")[1]);

    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.setView([lat, lng], zoom);
            return;
        }

        import("leaflet").then(L => {
            const map = L.map("radar-map", { maxZoom: 9 }).setView([lat, lng], zoom);

            // map layer
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: "&copy; OpenStreet",
            }).addTo(map);

            if (layer == "precip") {
                // precip layer
                // TODO remove cloud layer if present  
                
                // using server api:
                // L.tileLayer("/api/tiles/map/precipitation_new/{z}/{x}/{y}.png", {
                //     attribution: "&copy; OpenWeather",
                //     opacity: 0.5
                // }).addTo(map);

                // using weather maps 1.0:
                L.tileLayer(`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`, {
                    attribution: "&copy; OpenWeather",
                    opacity: 0.5,
                }).addTo(map);

                // using weather maps 2.0:
                // L.tileLayer(`https://maps.openweathermap.org/maps/2.0/weather/1h/PAC0/{z}/{x}/{y}?appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`, {
                //     attribution: "&copy; OpenWeather",
                //     opacity: 0.5,
                // }).addTo(map);

            } else if (layer == "clouds") {
                // cloud layer
                // TODO remove precip layer if present
                L.tileLayer(`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`, {
                    attribution: "&copy; OpenWeather",
                    opacity: 0.5,
                }).addTo(map);
            }

            mapRef.current = map;
        });
    }, [lat, lng, zoom, layer]);

    return (
        <div id="radar-map" className="z-10 w-full h-[240px] rounded-lg shadow-lg" />
    );
}