import dynamic from "next/dynamic";
import LocBlurb from "./loc-blurb.js";
import ForecastGraph from "./forecast-graph.js";

const RadarMap = dynamic(() => import("./radar-map.js"), {
    ssr: false,
});

export default function ForecastContet({currentLoc, forecast}) {
    if (currentLoc && forecast) {
        return (
            <>
                <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,500px)] gap-4 pb-4">
                    <LocBlurb currentLoc={currentLoc} forecast={forecast} />

                    <div className="justify-self-end max-w-[500px] w-full z-10">
                        <RadarMap coords={currentLoc.coords} zoom={9} />
                    </div>
                </div>
                <div className="py-4">
                    <ForecastGraph currentLoc={currentLoc} forecast={forecast} />
                </div>
            </>
        );
    } else {
        return (<></>);
    }
}