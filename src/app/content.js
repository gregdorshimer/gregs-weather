import { useEffect, useState } from "react";
import axios from "axios";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import SearchBar from "./search-bar.js";
import Loc from "./loc.js";
import ForecastContent from "./forecast-content.js";
import ForecastTile from "./forecast-tile";

export default function Content() {
    const [cachedLocs, setCachedLocs] = useState([]);
    const [currentLoc, setCurrentLoc] = useState(null);
    const [forecast, setForecast] = useState(null);

    // define a default loc whose forecast will be shown when page is first loaded:
    const defaultLoc = {
        // label: "Portland, ME, USA",
        city: "Portland",
        state: "ME",
        value: "ChIJLe6wqnKcskwRKfpyM7W2nX4"
    }

    // on first render, treat the default loc as though it was selected from the drop-down by calling selectNewLoc.
    // the function you pass to useEffect can't be async, so you have to put an anonymous async function inside it and
    // call that function immediately: 
    useEffect(() => {
        (async () => {
            await selectNewLoc(defaultLoc);
        })();
    }, []);

    // function for getting the office code and gridpoints from NWS for given coords:
    const getOfficeGridpoints = async (coords) => {
        const [lat, lng] = coords.split(",");
        try {
            const response = await axios.get(`https://api.weather.gov/points/${lat}%2C${lng}`);
            const office = response.data.properties.gridId;
            const gridpoints = `${response.data.properties.gridX},${response.data.properties.gridY}`;
            const timeZone = response.data.properties.timeZone;
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    // function for getting a forecast for the given coords from NWS:
    const getForecast = async (coords) => {
        const obj = await getOfficeGridpoints(coords);
        try {
            const response = await axios.get(`https://api.weather.gov/gridpoints/${obj.properties.gridId}/${obj.properties.gridX},${obj.properties.gridY}/forecast`);
            // TODO use above url appended with /hourly to get hourly forecast, then display temp/precip/humid/wind in a graph
            return {
                forecast: response.data,
                points: obj
            };
        } catch (error) {
            console.error(error);
            return error;
        }
    };

    // function to handle a location being clicked in the search bar dropdown
    const selectNewLoc = async (option) => {
        // "option" is the object that is returned by the Google Places API call
        if (!option) return;

        // create the newLoc object:
        const newLoc = {
            city: option.city,
            state: option.state,
        };

        try {
            // the results of 'usePlacesAutocomplete' hook do not contain coords, so have to fetch them here
            // using the placeId, then set them on the newLoc object:
            const results = await getGeocode({ placeId: option.value });
            const { lat, lng } = await getLatLng(results[0]); // function to extract {lat, lng} from the complicated json object returned by getGeocode
            newLoc.coords = `${lat},${lng}`;

            // set the newly geocoded loc to be the currentLoc, get its forecast, and set the forecast:
            setCurrentLoc(newLoc);
            const newForecast = await getForecast(newLoc.coords);
            setForecast(newForecast.forecast);

            // add timeZone to newLoc, and add newLoc to the cachedLocs:
            newLoc.timeZone = newForecast.points.properties.timeZone;
            const newCachedLocs = [...cachedLocs]; // spreading then re-assigning ensures a re-render when setCachedLocs is called
            // let newCachedLocs = cachedLocs;   <-- i.e. this doesn't cause a re-render when setCachedLocs is called below
            let present = false;
            for (const loc of newCachedLocs) {
                if (loc.city == newLoc.city && loc.state == newLoc.state) {
                    present = true;
                    break;
                }
            }
            if (!present) {
                newCachedLocs.unshift(newLoc);
            }
            setCachedLocs(newCachedLocs.slice(0, process.env.NEXT_PUBLIC_LOC_CACHE_SIZE));
        } catch (error) {
            console.error(error);
        }
    };

    // function to handle a cached location being selected
    const selectCachedLoc = async (loc) => {
        try {
            setCurrentLoc(loc);
            const newForecast = await getForecast(loc.coords);
            setForecast(newForecast.forecast);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="relative z-1 flex h-full flex-col items-center justify-center">
            <section className="w-full bg-slate-100">
                <div className="mx-auto max-w-4xl px-4">

                    <div className="relative z-30 flex justify-center py-4 pb-4">
                        <div className="max-w-md w-full">
                            <SearchBar selectNewLoc={selectNewLoc} />
                        </div>
                    </div>

                    <div className="overflow-x-auto pb-4">
                        <div className="flex gap-2 w-max mx-auto">
                            {cachedLocs.map((loc, index) => (
                                <Loc
                                    key={`${index}-${loc.coords}`}
                                    info={loc}
                                    selectCachedLoc={selectCachedLoc}
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            <section className="w-full py-4">
                <div className="mx-auto max-w-4xl px-4">

                    <ForecastContent currentLoc={currentLoc} forecast={forecast} />

                    <div className="flex gap-4 overflow-x-auto pb-4">
                        {forecast && forecast.properties.periods.map(item => (
                            <ForecastTile key={item.number} info={item} />
                        ))}
                    </div>

                </div>
            </section>
            
        </div>
    );
}
