import Chip from "@mui/material/Chip";

export default function Loc({info, selectCachedLoc, removeCachedLoc}) {
    return (
        <Chip
            label={`${info.city}, ${info.state}`}
            onClick={() => selectCachedLoc(info)}
            onDelete={() => removeCachedLoc(info)}
            sx={{
                backgroundColor: "#5A6B2F",
                color: "#ffffff",
                "&:hover": {
                    backgroundColor: "#7B8C45",
                },
                "& .MuiChip-deleteIcon": {
                    color: "#ffffff",
                    "&:hover": {
                        color: "#e5e5e5",
                    },
                },
            }}
        />
    );
}
