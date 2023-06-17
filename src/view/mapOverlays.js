import React from "react"

import { MAP_STYLES } from "./styles";
import { toDegrees } from "../util/geometry";

const Ring = ({style, active}) => <div style={{
    ...style,
    borderColor: active ? style.color : "transparent",
    position: "absolute",
    left: -style.size / 2,
    top: -style.size / 2,
    width: style.size,
    height: style.size,
}}>
</div>

export const FocusRing = ({objectId, viewState}) => 
    <Ring style={{...MAP_STYLES.FOCUS_CONTAINER, ...MAP_STYLES.FOCUS_RING}} active={viewState.focusedObjectId === objectId}/>


export const HoverRing = ({objectId, viewState}) => 
    <Ring style={{...MAP_STYLES.HOVER_CONTAINER, ...MAP_STYLES.HOVER_RING}} active={viewState.hoverObjectId === objectId && viewState.focusedObjectId !== objectId}/>

function PathSegment({from, to, style}) {
    
    const vect = from.vectorTo(to)
    return <div style={{
        // translation
        position: "absolute",
        top: from.y,
        left: from.x,
    }}>
        <div style={{
            // rotation
            transformOrigin: "0 0",
            transform: "rotate(" + toDegrees(vect.theta) + "deg)",
        }}>
            <div style={{
                ...style,
                position: "absolute",
                width: vect.length,
                height: style.size, 
                top: -style.size / 2,
            }}>
            </div>            
        </div>
    </div>

}

function Path({path, containerStyle, style}) {
    const edges = []
    for (var i = 0; i < path.length - 1; i++) {
        edges.push([path[i], path[i + 1]])
    }
    return <div style={containerStyle}>
        {edges.map(e => <PathSegment key={"path" + e[1].x + e[1].y} from={e[0]} to={e[1]} style={style}/>)}
    </div>
}

export const FocusPath = ({path}) => <Path path={path} containerStyle={MAP_STYLES.FOCUS_CONTAINER} style={MAP_STYLES.FOCUS_PATH}/>
export const HoverPath = ({path}) => <Path path={path} containerStyle={MAP_STYLES.HOVER_CONTAINER} style={MAP_STYLES.HOVER_PATH}/>