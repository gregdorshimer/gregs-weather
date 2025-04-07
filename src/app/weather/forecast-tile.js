export default function ForecastTile({info, url}) {
    if (!info) {
        return (
            <></>
            // TODO forecast tile loading/pre-fetch palceholder
        );
    }

    else {
        let parsed = JSON.parse(info);
        // console.log(parsed);
        
        return (
            <>               
                <div className="container text-center col-2 mx-1 rounded bg-gray-200 vstack gap-1 position-relative">
                    
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

                </div>
                {/* <thead>
                    <tr>
                        <th scope="col">
                            {parsed.name}
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>
                            <img className="d-block m-auto" src={url} alt="loading icon..." />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {parsed.shortForecast}
                        </td>
                    </tr>
                    <tr>
                        <td>
                        {parsed.temperature}&#176;{parsed.temperatureUnit}
                        </td>
                    </tr>
                </tbody> */}
            </>
        );
    }
}