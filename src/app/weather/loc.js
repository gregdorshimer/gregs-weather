export default function Loc({info, clickHandler}) {
    const city = JSON.parse(info).city;
    const state = JSON.parse(info).state;

    return (
        <button 
            type="button"
            className="btn btn-primary"
            onClick={() => clickHandler(city, state)}>
            {city}, {state}
        </button>
    );
}