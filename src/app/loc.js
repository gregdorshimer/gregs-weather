export default function Loc({info, selectCachedLoc}) {
    return (
        <button
            onClick={() => selectCachedLoc(info)}
            className="shrink-0 rounded-full bg-[#5A6B2F] px-3 py-2 text-sm font-medium text-white hover:bg-[#7B8C45]"
        >
            {info.city}, {info.state}
        </button>
    );
}
