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

function PathNode({position, style}) {
    return <div style={{
        // translation
        position: "absolute",
        top: position.y,
        left: position.x,
    }}>
        <div style={{
            ...style,
            position: "absolute",
            width: style.size,
            height: style.size, 
            top: -style.size / 2,
            left: -style.size / 2,
        }}>
        </div>            
    </div>
}


function Path({path, containerStyle, edgeStyle, nodeStyle}) {
    const edges = []
    for (var i = 0; i < path.length - 1; i++) {
        edges.push([path[i], path[i + 1]])
    }
    return <div style={containerStyle}>
        {edges.map(e => 
            <div key={"path" + e[1].x + e[1].y}>
                <PathSegment from={e[0]} to={e[1]} style={edgeStyle}/>
                <PathNode position={e[1]} style={nodeStyle}/>
            </div>)
        }
    </div>
}

export const FocusPath = ({path}) => <Path path={path} 
    containerStyle={MAP_STYLES.FOCUS_CONTAINER} 
    edgeStyle={MAP_STYLES.FOCUS_PATH_EDGE}
    nodeStyle={MAP_STYLES.FOCUS_PATH_NODE}
    />
export const HoverPath = ({path}) => <Path path={path} 
    containerStyle={MAP_STYLES.HOVER_CONTAINER} 
    edgeStyle={MAP_STYLES.HOVER_PATH_EDGE}
    nodeStyle={MAP_STYLES.HOVER_PATH_NODE}
    />