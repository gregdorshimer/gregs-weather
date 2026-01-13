"use client";
import Content from "./content.js";
import { LoadScript } from "@react-google-maps/api";

export default function Page() {
    return (
        <>
            <section
                className="relative w-full h-[40vh] bg-cover bg-center bg-[url('/bg.jpg')]"
            >
                <div className="absolute inset-0 bg-black/30"></div>

                <div className="relative z-10 flex h-full items-center justify-center">
                    <div className="w-full max-w-3xl px-6 ml-16 text-left text-white">
                        <p className="text-5xl font-bold mb-6">Greg's Weather</p>
                        <p className="text-2xl">
                            Forecasts from the National Weather Service, for U.S. cities
                            autocompleted and geocoded using the Google Places API.
                        </p>
                    </div>
                </div>
            </section>

            <div className="relative z-1 flex h-full items-center justify-center">
                <div className="w-full max-w-3xl px-6 ml-16">
                    {/* <div className="min-h-screen px-4 py-6"> */}
                    <div className="min-h-screen bg-slate-100 px-4 py-6">
                        <div className="mx-auto max-w-6xl space-y-0">
                            <LoadScript
                                googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                                libraries={["places"]}
                            >
                                <Content />
                            </LoadScript>

                        </div>

                        <footer className="mt-8 text-center text-sm text-slate-500">
                            Developed by Greg Dorshimer • January 2026
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
