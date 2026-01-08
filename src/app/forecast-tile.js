export default function ForecastTile({info}) {
    if (!info) {
        return (
            <></>
        );
    }

    else {
        let parsed = info;
        
        return (
            <div className="card mx-2 my-2" style={{width: "10rem"}}>
                <img src={parsed.icon} className="card-img-top my-2" alt="loading..." />
                <div className="card-body">
                    <h5 className="card-title">{parsed.name}</h5>
                    <p className="card-text">{parsed.shortForecast}</p>
                    <h6>{parsed.temperature}&#176;{parsed.temperatureUnit}</h6>
                </div>
            </div>
        );
    }
}