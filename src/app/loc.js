export default function Loc({info, selectCachedLoc}) {
    return (
        <button
            onClick={() => selectCachedLoc(info)}
            className="shrink-0 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
            {info.city}, {info.state}
        </button>
    );
}
