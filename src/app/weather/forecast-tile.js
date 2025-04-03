export default function ForecastTile({info, url}) {
    let parsed = JSON.parse(info);
    console.log(parsed);

    if (!info) {
        return (
            <></>
            // TODO forecast tile loading/pre-fetch palceholder
        );
    }
    else {
        return (
            <>
            {/* use a table here? */}
                <div className="container text-center col-2 mx-1 rounded bg-gray-200 vstack gap-1 position-relative">
                    <div className="my-2 rounded bg-gray-500 text-gray-100"><h6>{parsed.name}</h6></div>
                    <div><img className="d-block m-auto" src={url} alt="loading icon..." /></div>
                    <div>{parsed.shortForecast}</div>
                    <div className="my-2 align-middle rounded bg-gray-500 text-gray-100"><p>{parsed.temperature}&#176;{parsed.temperatureUnit}</p></div>
                </div>
            </>
        );
    }
}