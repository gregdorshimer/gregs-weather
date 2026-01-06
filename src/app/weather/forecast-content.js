import ForecastTile from "./forecast-tile";

export default function ForecastContent({content}) {
    let data = null;
    if (content) {
        data = content.properties.periods.slice(0,5);
    }

    return (
        <div className="container">
            <div className="row mt-3">
                    {data ? data.map(item => <ForecastTile key={item.number} info={item} />) : null}
            </div>
        </div>
    );
}