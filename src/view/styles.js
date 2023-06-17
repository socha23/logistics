export const COLORS = {
    DEFAULT: "#888",
    VEHICLE: "#444",
    ROAD: "#ccc",
}

export const MAP_STYLES = {
    CITY: {
        border: "3px solid " + COLORS.DEFAULT,
        backgroundColor: "white", 
        borderRadius: 30,
        size: 30
    },
    VEHICLE: {
        backgroundColor: COLORS.VEHICLE, 
        size: 16,
    },
    ROAD: {
        laneDistance: 0,
        size: 20,
        backgroundColor: COLORS.ROAD,
        border: "none",
    },
    FOCUS_RING: {
        borderWidth: 5,
        borderStyle: "dashed",
        borderRadius: 50,
        size: 50,
        color: "red",
        animationName: "spin",
        animationDuration: "5s",
        animationTimingFunction: "linear",
        animationIterationCount: "infinite",
    },
}