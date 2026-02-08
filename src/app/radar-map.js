import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Recenter from "./recenter";

export default function RadarMap({ coords, zoom }) {
    const lat = Number(coords.split(",")[0]);
    const lng = Number(coords.split(",")[1]);

    return (
        <MapContainer
            center={[lat, lng]}
            zoom={zoom}
            className="w-full h-[240px] rounded-lg shadow-lg"
            maxZoom={19}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="<a href='https://www.openstreetmap.org/copyright'>&copy; OpenStreetMap</a>"
            />
            <TileLayer 
                url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`}
                // opacity={0.999}
                attribution="<a href='https://openweathermap.org'>&copy; OpenWeatherMap</a>"
            />
            {/* <TileLayer
                url={`http://maps.openweathermap.org/maps/2.0/weather/PAC0/{z}/{x}/{y}?appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`}
                opacity={0.5}
            /> */}
            <Recenter coords={coords} />
        </MapContainer>
    );
}
