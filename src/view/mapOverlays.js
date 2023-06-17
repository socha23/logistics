import React from "react"

import { MAP_STYLES } from "./styles";

export const FocusRing = ({objectId, viewState}) => <div style={{
        ...MAP_STYLES.FOCUS_RING,
        borderColor: viewState.focusedObjectId === objectId ? MAP_STYLES.FOCUS_RING.color : "transparent",
        position: "absolute",
        left: -MAP_STYLES.FOCUS_RING.size / 2,
        top: -MAP_STYLES.FOCUS_RING.size / 2,
        width: MAP_STYLES.FOCUS_RING.size,
        height: MAP_STYLES.FOCUS_RING.size,
    }}>
</div>

export const HoverRing = ({objectId, viewState}) => <div style={{
    ...MAP_STYLES.HOVER_RING,
    borderColor: viewState.hoverObjectId === objectId && viewState.focusedObjectId !== objectId ? MAP_STYLES.HOVER_RING.color : "transparent",
    position: "absolute",
    left: -MAP_STYLES.HOVER_RING.size / 2,
    top: -MAP_STYLES.HOVER_RING.size / 2,
    width: MAP_STYLES.HOVER_RING.size,
    height: MAP_STYLES.HOVER_RING.size,
}}>
</div>
