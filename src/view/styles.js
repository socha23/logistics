export const COLORS = {
    DEFAULT: "#888",
    VEHICLE: "#444",
    ROAD: "#ccc",
    FOCUS: "red",
    HOVER: "red",
}


export const MAP_STYLES = {}

MAP_STYLES.FOCUS_CONTAINER = {
    opacity: 0.7,
}

MAP_STYLES.HOVER_CONTAINER = {
    opacity: 0.3,
}


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
        color: COLORS.FOCUS,
        animationName: "spin",
        animationDuration: "5s",
        animationTimingFunction: "linear",
        animationIterationCount: "infinite",
}
MAP_STYLES.HOVER_RING = {
        ...MAP_STYLES.FOCUS_RING,
        color: COLORS.HOVER,
}


MAP_STYLES.FOCUS_PATH = {
    size: 5,
    backgroundColor: COLORS.FOCUS,
    border: "none",
}

MAP_STYLES.HOVER_PATH = {
    size: 5,
    backgroundColor: COLORS.HOVER,
    border: "none",
}
