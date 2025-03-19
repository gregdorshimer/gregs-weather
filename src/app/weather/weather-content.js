"use client";
import { useState, use } from "react";

function Forecast({data}) {
    return (
        <>
            <p>{data}</p>
        </>
    );
}

function ForecastButton({counter, onClick}) {
    
    function handleClick() {
        console.log("fetch forecast clicked");
        counter++;
        onClick(counter);
    }

    return (
        <button 
            type="button"
            className="btn btn-primary"
            onClick={handleClick}>
            Fetch Forecast
        </button>
    );

}

export default function WeatherContent({forecastPromise}) {
    const [testForecast, setTestForecast] = useState(0);

    // const forecast = use(forecastPromise);

    return (
        <div className="row">

            <div className="col-4">
                {/* TODO left column for location description, legend */}
                <p>Sample location description.</p>
            </div>

            <div className="col-4">
                {/* TODO forecast graph content */}
                
                <p>Sample forecast graph.</p>
                
                <ForecastButton counter={testForecast} onClick={setTestForecast}/>
                
                <Forecast data={testForecast} />

                {/* <p>{forecast}</p> */}

            </div>

            <div className="col-4">
                {/* TODO search bar and recent locations */}
                <p>Sample search bar and recently viewed.</p>
            </div>

        </div>
    );
}