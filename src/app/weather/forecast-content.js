import ForecastTile from "./forecast-tile";

export default function ForecastContent({content}) {
    let data = null;
    if (content) {
        data = JSON.parse(content).properties.periods.slice(0,5);
    }

    return (
        <>
        <div className="container">
            {/* <div className="row equal-height-row">
                <div className="col-2">
                {data ? data.map(item => item.name) : null}
                </div>
            </div> */}
            <div className="row mt-3">
                    {data ? data.map(item => <ForecastTile key={item.number} info={JSON.stringify(item)} />) : null}
            </div>
        </div>
        </>
        
    );
}