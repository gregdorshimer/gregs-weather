export default function Loc({info, clickHandler}) {
    return (
        <button
            onClick={() => clickHandler(info.office, info.gridpoints)}
            className="shrink-0 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
            {info.city}, {info.state}
        </button>
    );
}
