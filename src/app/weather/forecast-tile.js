export default function ForecastTile({info}) {
    if (!info) {
        return (
            <></>
            // TODO forecast tile loading/pre-fetch palceholder
        );
    }

    else {
        let parsed = JSON.parse(info);
        
        return (
            // TODO consider using bootstrap cards and placeholders
            <>               
                {/* <div className="container text-center col-2 mx-1 rounded bg-gray-200 vstack gap-1 position-relative">
                    
                    <div className="my-2 rounded bg-gray-500 text-gray-100">
                        <div className="my-auto">
                            <h5>{parsed.name}</h5>
                        </div>
                    </div>
                    
                    <div>
                        <img className="d-block m-auto" src={url} alt="loading icon..." />
                    </div>
                    
                    <div>{parsed.shortForecast}</div>
                    
                    <div className="my-2 align-middle rounded bg-gray-500 text-gray-100">
                        <p>{parsed.temperature}&#176;{parsed.temperatureUnit}</p>
                    </div>

                </div> */}
                <div className="card mx-2 my-2" style={{width: "10rem"}}>
                    <img src={parsed.icon} className="card-img-top m-1" alt="loading..." />
                    <div className="card-body">
                        <h5 className="card-title">{parsed.name}</h5>
                        <p className="card-text">{parsed.shortForecast}</p>
                        <h6>{parsed.temperature}&#176;{parsed.temperatureUnit}</h6>
                    </div>
                </div>
            </>
        );
    }
}