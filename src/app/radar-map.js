import { useEffect } from "react";
import "leaflet/dist/leaflet.css";

export default function RadarMap({coords, zoom=7}) {
    const lat = coords.split(",")[0];
    const lng = coords.split(",")[1];

    useEffect(() => {
        import("leaflet").then(L => {
            const map = L.map("radar-map").setView([lat, lng], zoom);

            // get the base map and add it as a layer
            const baseLayer = L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, {}).addTo(map);

            // add the precipitation layer to the map
            const radarLayer = L.tileLayer(
                "https://tiles.weather.gov/tiles/overlay/nexrad/1/{z}/{x}/{y}.png",
                {
                    attribution: "&copy; NWS",
                    opacity: 0.5,
                    maxZoom: 9,
                }
            ).addTo(map);

            return () => {
                map.remove();
            };
        });
    }, [lat, lng, zoom]);

    return (
        <div id="radar-map" className="w-full h-[400px] rounded-lg shadow-lg"></div>
    );
}