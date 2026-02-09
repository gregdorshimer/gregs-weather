export default function LocBlurb({currentLoc, forecast}) {
    return (
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
    );
}