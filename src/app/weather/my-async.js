"use client";
import Async from 'react-select/async';
import axios from 'axios';
// import { APILoader, PlacePicker } from '@googlemaps/extended-component-library/react';
// import ApiKey from './api-key.js';
import { useEffect } from 'react';

export default function MyAsync({locs, locSetter, forecastFetcher}) {
    // useEffect(() => {
    //     import("@googlemaps/extended-component-library/react");
    // })

    let locOptions = [
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
        // "option" is the object that is returned by the Google Places API call

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
                for (let i = 0; i < newLocs.length; i++) {
                    if (newLocs[i].city == newLoc.city &&
                        newLocs[i].state == newLoc.state) {
                            newLocs.splice(i, 1);
                            break;
                    }
                }
                newLocs.unshift(newLoc);
                locSetter(newLocs.slice(0,4));
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
        // TODO

        // desired behavior from google:
        // submit text city name -> return Array of { (lat,long), city, state }

        // params to include:
        // "textQuery": "search text"    (this is inputValue) 
        // "fields": "places[i].displayName,places[i].formattedAddress,places[i]."  <- the info to be include in the response
        // "type" or "types" or "includedTypes"  <- not sure which, this is a filter for which places are returned
        // ?types=(cities)   <--- to return only cities
    
        if (inputValue.length > 4) {
            // TODO make google api call below

            // TODO remove once google api is working
            setTimeout(() => {
                callback(filterLocs(inputValue));
            }, 300);
            ////
        }

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
        <>
            {/* <PlacePicker /> */}
            <Async defaultOptions cacheOptions loadOptions={loadOptions} onChange={(option) => selectHandler(option)} />
        </>
    );
}
