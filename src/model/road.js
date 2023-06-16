var __road_autoinc = 0

export default class Road {

    constructor(params) {
        this.id = "road#" + (__road_autoinc++)
        
        this.from = params.from     
        this.to = params.to

        this._fromPos = this.from.position
        this._vect = this._fromPos.vectorTo(this.to.position)
    }

    pointAlong(distanceFromStart) {
        return this._fromPos.plus(
            this._vect.withLength(distanceFromStart)
        )
    }

    get length() {
        return this._vect.length
    }

    toView() {
        return {
            id: this.id,
            fromX: this.from.position.x,
            fromY: this.from.position.y,
            toX: this.to.position.x,
            toY: this.to.position.y,
        }
    }


}