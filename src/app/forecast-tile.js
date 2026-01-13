export default function ForecastTile({info}) {
    if (!info) {
        return (
            <></>
        );
    }

    else {
        return (
            <div className="card mx-2 my-2" style={{width: "10rem"}}>
                <img src={info.icon} className="card-img-top my-2" alt="loading..." />
                <div className="card-body">
                    <h5 className="card-title">{info.name}</h5>
                    <p className="card-text">{info.shortForecast}</p>
                    <h6>{info.temperature}&#176;{info.temperatureUnit}</h6>
                </div>
            </div>
        );
    }
}