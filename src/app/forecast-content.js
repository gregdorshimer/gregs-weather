import dynamic from "next/dynamic";

const RadarMap = dynamic(() => import("./radar-map"), {
    ssr: false,
});

export default function ForecastContet({currentLoc, forecast}) {
    if (currentLoc && forecast) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,500px)] gap-4 pb-4">
                <div className="flex flex-col justify-center w-full">
                    <p className="text-sm text-slate-500">
                        {new Date().toLocaleString("en-US", { 
                            timeZone: currentLoc.timeZone, 
                            year: "numeric", 
                            month: "short", 
                            day: "numeric", 
                            hour: "numeric", 
                            minute: "numeric",
                        })}
                    </p>

                    <p className="text-4xl font-bold text-slate-900 pb-2">
                        {currentLoc.city}, {currentLoc.state}
                    </p>

                    <p className="text-6xl text-slate-900 pb-1">
                        {forecast.properties.periods[0].temperature}°{forecast.properties.periods[0].temperatureUnit}
                    </p>

                    <p className="text-xl text-slate-900">
                        {forecast.properties.periods[0].shortForecast}
                    </p>

                    <p className="text-md text-slate-900">
                        Wind {forecast.properties.periods[0].windSpeed}
                    </p>
                </div>

                <div className="justify-self-end max-w-[500px] w-full z-10">
                    <RadarMap coords={currentLoc.coords} zoom={9} />
                </div>
            </div>
        );
    } else {
        return (<></>);
    }
}