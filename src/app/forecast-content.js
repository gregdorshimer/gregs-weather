import RadarMap from "./radar-map";

export default function ForecastContet({currentLoc, forecast}) {
    if (currentLoc && forecast) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch pb-4">
                <div className="flex flex-col justify-between h-full w-full">
                    <p className="text-sm text-slate-500">
                        {currentLoc.timeZone}
                    </p>

                    <p className="text-3xl font-bold text-slate-900 pb-2">
                        {currentLoc.city}, {currentLoc.state}
                    </p>

                    <p className="text-5xl text-slate-900 pb-1">
                        {forecast.properties.periods[0].temperature}°{forecast.properties.periods[0].temperatureUnit}
                    </p>

                    <p className="text-lg text-slate-900">
                        {forecast.properties.periods[0].shortForecast} · Wind {forecast.properties.periods[0].windSpeed}
                    </p>
                </div>

                <div className="h-full w-full">
                    {/* <RadarMap coords={currentLoc.coords} zoom={10} /> */}
                </div>
            </div>
        );
    } else {
        return (<></>);
    }
}