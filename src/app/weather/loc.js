"use client";

export default function Loc({info, clickHandler}) {
    const parsed = JSON.parse(info);

    return (
        <button 
            type="button"
            className="btn btn-primary"
            onClick={() => clickHandler(parsed.office, parsed.gridpoints)}>
            {parsed.city}, {parsed.state}
        </button>
    );
}