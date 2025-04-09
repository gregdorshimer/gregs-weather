import Async, { useAsync } from 'react-select/async';

export default function MyAsync({locs, locSetter}) {

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
    
    
    function selectHandler(option) {
        // console.log("selectHandler option:");
        // console.log(option.city);
        // console.log(locs);
        let newLocs = [...locs];
        newLocs.unshift(
            {
                city: option.city,
                state: option.state,
                coords: option.coords,
                office: option.office,
                gridpoints: option.gridpoints,
            });
        console.log(newLocs);
        locSetter(newLocs);

        // TODO use {locSetter} to updates {locs}


        // let gridpointURL = buildGridpointURL(option.coords);

        // TODO
        // make NWS call here
        // parse response
        // request forecast
        // call setForecast (need to pass it to this component from above)
    }

    function buildGridpointURL(coords) {
        // console.log(coords);
        let c = coords.split(",");
        let url = "https://api.weather.gov/points/" + c[0] + "%2C" + c[1];
        // console.log("buildGridpointURL:" + url);
    }

    function buildForecastURL() {
        // TODO
    }

    const filterLocs = (term) => {
        return locOptions.filter((i) => 
            i.label.toLowerCase().includes(term.toLowerCase())
        );
    };

    const loadOptions = /* async */ (inputValue, callback) => {
        // https://developers.google.com/maps/documentation/places/web-service/text-search?apix_params=%7B%22fields%22%3A%22places.displayName%2Cplaces.formattedAddress%2Cplaces.addressComponents.longText%2Cplaces.addressComponents.types%22%2C%22resource%22%3A%7B%22textQuery%22%3A%22Jenkintown%22%2C%22pageSize%22%3A10%2C%22includedType%22%3A%22cities%22%7D%7D
        // https://stackoverflow.com/questions/16132591/google-maps-places-api-to-only-return-cities

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

