"use client";
import Async from 'react-select/async';
import axios from 'axios';

export default function MyAsync({locs, locSetter, forecastFetcher}) {

    const locOptions = [
        {
            value: 'philadelphia',
            label: 'Philadelphia, PA',
            city: 'Philadelphia',
            state: "PA",
            coords: "39.95,-75.17",
            office: "PHI",
            gridpoints: '50,76',
        },
        {
            value: 'chicago',
            label: 'Chicago, IL',
            city: 'Chicago',
            state: "IL",
            coords: "41.88,-87.62",
            office: "LOT",
            gridpoints: '76,73',
        },
        {
            value: 'seattle',
            label: 'Seattle, WA',
            city: 'Seattle',
            state: "WA",
            coords: "47.6,-122.3",
            office: "SEW",
            gridpoints: '126,68',
        }
    ];
    
    async function selectHandler(option) {
        // "option" is that object that is returned by the Google Places API call

        let newLocs = [...locs]; // spreading then re-assigning ensures a re-render when locSetter is called
        // let newLocs = locs;   <-- i.e. this doesn't cause a re-render when locSetter is called below

        let newLoc = {
            city: option.city,
            state: option.state,
            coords: option.coords,
        };

        let gridpointURL = buildGridpointURL(option.coords);
        await axios.get(gridpointURL)
            .then(({data}) => {
                newLoc.office = data.properties.gridId;
                newLoc.gridpoints = "" + data.properties.gridX + "," + data.properties.gridY;
                let index = -1;
                for (let i = 0; i < newLocs.length; i++) {
                    if (newLocs[i].city == newLoc.city &&
                        newLocs[i].state == newLoc.state) {
                            newLocs.splice(i, 1);
                            index = i;
                            break;
                    }
                }
                newLocs.unshift(newLoc);
                locSetter(newLocs);
                forecastFetcher(newLoc.office, newLoc.gridpoints);
            })
            .catch(error => {
                console.log(error);
            });
    }

    function buildGridpointURL(coords) {
        let c = coords.split(",");
        return "https://api.weather.gov/points/" + c[0] + "%2C" + c[1];
    }

    const filterLocs = (term) => {
        return locOptions.filter((i) => 
            i.label.toLowerCase().includes(term.toLowerCase())
        );
    };

    const loadOptions = /* async */ (inputValue, callback) => {
        // https://developers.google.com/maps/documentation/places/web-service/text-search?apix_params=%7B%22fields%22%3A%22places.displayName%2Cplaces.formattedAddress%2Cplaces.addressComponents.longText%2Cplaces.addressComponents.types%22%2C%22resource%22%3A%7B%22textQuery%22%3A%22Jenkintown%22%2C%22pageSize%22%3A10%2C%22includedType%22%3A%22cities%22%7D%7D
        // https://stackoverflow.com/questions/16132591/google-maps-places-api-to-only-return-cities
        // TODO

        setTimeout(() => {
            callback(filterLocs(inputValue));
        }, 500);

        /*
        axios.get(url)
            .then(({data}) => {
                // fitler/process results here to display only correct info
                return data.json();
                
            })
            .catch(error => {
                console.log(error);
                return [];
            });
        */
    };

    return (
        <Async defaultOptions cacheOptions loadOptions={loadOptions} onChange={(option) => selectHandler(option)} />
    );
}

