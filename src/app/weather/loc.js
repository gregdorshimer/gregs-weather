"use client";

export default function Loc({info, clickHandler}) {
    return (
        <button 
            type="button"
            className="btn btn-primary"
            onClick={() => clickHandler(info.office, info.gridpoints)}>
            {info.city}, {info.state}
        </button>
    );
}