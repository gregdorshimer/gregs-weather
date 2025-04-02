import ForecastTile from "./forecast-tile";

export default function ForecastContent({content}) {
    let data = null;
    if (content) {
        data = JSON.parse(content).properties.periods.slice(0,5);
        // console.log(data);
    }

    return (
        <>
            {data ? data.map(item => <ForecastTile key={item.number} info={JSON.stringify(item)} url={item.icon} />) : null}
        </>
        
    );
}