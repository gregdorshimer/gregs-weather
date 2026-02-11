import dynamic from "next/dynamic";
import LocBlurb from "./loc-blurb.js";
import ForecastGraph from "./forecast-graph.js";

const RadarMap = dynamic(() => import("./radar-map.js"), {
    ssr: false,
});

export default function ForecastContet({currentLoc, forecast, hourlyForecast}) {
    if (currentLoc && forecast && hourlyForecast) {
        return (
            <>
                <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,500px)] gap-4 pb-4">
                    <LocBlurb currentLoc={currentLoc} forecast={forecast} />

                    <div className="justify-self-end max-w-[500px] w-full z-10">
                        <RadarMap coords={currentLoc.coords} zoom={9} />
                    </div>
                </div>
                <div className="py-4">
                    <ForecastGraph hourlyForecast={hourlyForecast} />
                </div>

                <div className="mt-6 overflow-x-auto">
                    <div className="flex gap-4 pb-2 min-w-max">
                        {forecast.properties.periods.map((period) => {
                        const d = new Date(period.startTime);

                        return (
                            <div
                                key={d}
                                className="w-36 flex-shrink-0 bg-white border rounded-xl p-3 shadow-sm text-center"
                            >
                                <img
                                    src={period.icon}
                                    alt={period.shortForecast}
                                    className="mx-auto w-20 h-20 object-contain"
                                />

                                <div className="font-semibold mt-1">
                                    {d.toLocaleDateString("en-US", { weekday: "short" })}
                                </div>

                                <div className="text-xs text-gray-500">
                                    {d.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                </div>

                                <div className="text-xl font-bold mt-1">
                                    {period.temperature}°F
                                </div>

                                <div className="text-sm text-gray-700 leading-tight">
                                    {period.shortForecast}
                                </div>
                            </div>
                        );
                        })}
                    </div>
                </div>
            </>
        );
    } else {
        return (<></>);
    }
}