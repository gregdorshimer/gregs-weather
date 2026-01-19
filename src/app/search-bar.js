import AsyncSelect from "react-select/async";
import usePlacesAutocomplete from "use-places-autocomplete";

export default function SearchBar({selectNewLoc}) {
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
    // inputValue is what is in the text field, and callback calls the onChange prop of <AsyncSelect> below 
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

    return (
        <>
            <AsyncSelect 
                defaultOptions
                cacheOptions
                placeholder="Search US cities..."
                // loadOptions is what happens on keystroke:
                loadOptions={loadOptions} 
                // onChange is what happens when an option from the dropdown is selected. this is invoked
                // in loadOptions using callback, and option is whatever is selected
                onChange={(option) => selectNewLoc(option)} />
        </>
    );
}
