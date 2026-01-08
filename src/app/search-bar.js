"use client";
import AsyncSelect from 'react-select/async';
import axios from 'axios';
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";

export default function SearchBar({locs, locSetter, forecastFetcher}) {
    // define the hook for the suggested results of the search query:
    // here, status could be e.g. "OK" or "ZERO_RESULTS", while data is an array of suggestions returned by Google
    // and value is the contents of the text box
    const { ready, value, setValue, suggestions: { status, data } } = usePlacesAutocomplete({
        requestOptions: {
            types: ["(cities)"], // only auto-complete with cities
            componentRestrictions: { country: "us" } // only auto-complete with locs in USA
        }
    });

    // define the function wrapper that will perform the google autocomplete search:
    const loadOptions = (inputValue, callback) => {
        if (!ready || inputValue.length < 2) return callback([]);

        // fetch suggestions using hook defined above, which causes suggestions to be updated
        // suggestions contains status and data
        setValue(inputValue);

        if (status === "OK") {
            const options = data.map(place => {
                const [city, state] = place.description.split(", ");
                return {
                    label: place.description,
                    value: place.place_id,
                    city,
                    state,
                };
            });
            callback(options);
        } else {
            callback([]);
        }
    };

    const selectHandler = async (option) => {
        // "option" is the object that is returned by the Google Places API call
        if (!option) return;

        const newLocs = [...locs]; // spreading then re-assigning ensures a re-render when locSetter is called
        // let newLocs = locs;   <-- i.e. this doesn't cause a re-render when locSetter is called below

        // create the newLoc object:
        let newLoc = {
            city: option.city,
            state: option.state,
        };

        try {
            // the results of 'usePlacesAutocomplete' hook do not contain coords, so have to fetch them here
            // using the placeId, then set them on the newLoc object:
            const results = await getGeocode({ placeId: option.value });
            const { lat, lng } = await getLatLng(results[0]); // function to extract {lat, lng} from the complicated json object returned by getGeocode
            newLoc.coords = `${lat},${lng}`;

            // get the gridpoint info for the selected location's coordinates, and add to the newLoc object:
            const gridpointURL = buildGridpointURL(newLoc.coords);
            const response = await axios.get(gridpointURL);
            const data = response.data;
            newLoc.office = data.properties.gridId;
            newLoc.gridpoints = `${data.properties.gridX},${data.properties.gridY}`;

            // remove existing instance of the selected city from newLocs by finding the index of it, then 
            // splicing out the item if it was present
            const idx = newLocs.findIndex(
                (l) => l.city == newLoc.city && l.state == newLoc.state
            );
            if (idx !== -1) {
                newLocs.splice(idx, 1);
            }

            // add newLoc to the top of the list of newLocs, and assign to state:
            newLocs.unshift(newLoc);
            locSetter(newLocs.slice(0, process.env.NEXT_PUBLIC_LOC_CACHE_SIZE)); // passing a slice ensures that it is a new array reference, forcing a re-render
            
            // fetch forecast:
            forecastFetcher(newLoc.office, newLoc.gridpoints);
        } catch (error) {
            console.error(error);
        }
    };

    function buildGridpointURL(coords) {
        const [lat, lng] = coords.split(",");
        return `https://api.weather.gov/points/${lat}%2C${lng}`;
    }

    return (
        <>
            <AsyncSelect 
                defaultOptions
                cacheOptions
                placeholder="Search US cities..."
                // loadOptions is what happens on keystroke:
                loadOptions={loadOptions} 
                // onChange is what happens when an option from the dropdown is selected:
                onChange={(option) => selectHandler(option)} />
        </>
    );
}
