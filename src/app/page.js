"use client";
import Content from "./content.js";
import { LoadScript } from "@react-google-maps/api";

export default function Page() {
    return (
        <>
            <section className="relative w-full h-[38vh] bg-cover bg-center bg-[url('/bg.jpg')]">
                <div className="absolute inset-0 bg-black/30"></div>

                <div className="relative z-10 flex h-full items-center justify-center">
                    <div className="w-full max-w-4xl px-6 text-left text-white">
                        <p className="text-5xl font-bold mb-6">Greg's Weather</p>
                        <p className="text-2xl">
                            Forecasts for U.S. cities from the National Weather Service,
                            autocompleted and geocoded using the Google Places API, with
                            maps from OpenStreetMap and OpenWeatherMap.
                        </p>
                    </div>
                </div>
            </section>


            <LoadScript
                googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                libraries={["places"]}
            >
                <Content />
            </LoadScript>
        </>
    );
}
