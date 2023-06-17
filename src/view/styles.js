export const COLORS = {
    DEFAULT: "#888",
    VEHICLE: "#444",
    ROAD: "#ccc",
}




export const MAP_STYLES = {}

MAP_STYLES.CITY = {
        border: "3px solid " + COLORS.DEFAULT,
        backgroundColor: "white", 
        borderRadius: 30,
        size: 30
    }
MAP_STYLES.VEHICLE = {
        backgroundColor: COLORS.VEHICLE, 
        size: 16,
    }
MAP_STYLES.ROAD = {
        laneDistance: 0,
        size: 20,
        backgroundColor: COLORS.ROAD,
        border: "none",
    }

MAP_STYLES.FOCUS_RING = {
        borderWidth: 3,
        borderStyle: "dashed",
        borderRadius: 50,
        size: 50,
        color: "red",
        animationName: "spin",
        animationDuration: "5s",
        animationTimingFunction: "linear",
        animationIterationCount: "infinite",
        opacity: 0.7,
}
MAP_STYLES.HOVER_RING = {
        ...MAP_STYLES.FOCUS_RING,
        opacity: 0.3,
}
