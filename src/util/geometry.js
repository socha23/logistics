export function toDegrees(radian) {
    return 180 * radian / Math.PI
}

export function vectorForPolar(r, theta) {
    return new Vector(r * Math.cos(theta), r * Math.sin(theta))
}

export class Point {
    static ZERO = new Point(0, 0)

    constructor(x, y) {
        this.x = x
        this.y = y
    }

    plus(v) {
        return new Point(this.x + v.x, this.y + v.y)
    }

    minus(v) {
        return new Point(this.x - v.x, this.y - v.y)
    }

    distanceTo(p) {
        const dX = p.x - this.x
        const dY = p.y - this.y
        return Math.sqrt(dX * dX + dY * dY)
    }

    inRange(p, range) {
        const dX = p.x - this.x
        const dY = p.y - this.y
        return dX * dX + dY * dY < range * range
    }

    negative() {
        return new Point(-this.x, -this.y)
    }

    rotate(theta, origin=Point.ZERO) {
        if (theta === 0) {
            return this
        }
        return new Point(
            Math.cos(theta) * (this.x - origin.x) - Math.sin(theta) * (this.y - origin.y) + origin.x,
            Math.sin(theta) * (this.x - origin.x) + Math.cos(theta) * (this.y - origin.y) + origin.y,
        )
    }

    vectorTo(p) {
        return new Vector(p.x - this.x, p.y - this.y)
    }

    get string() {
        return `${this.x.toFixed(1)}, ${this.y.toFixed(1)}`
    }

    scale(scale = 1) {
        return new Point(this.x * scale, this.y * scale)
    }
}

export class Vector {
    static ZERO = new Vector(0, 0)

    constructor(x, y) {
        this.x = x
        this.y = y
    }

    plus(v) {
        return new Vector(this.x + v.x, this.y + v.y)
    }

    negative() {
        return new Vector(-this.x, -this.y)
    }


    div(c) {
        return new Vector(this.x / c, this.y / c)
    }

    multiply(c) {
        return this.times(c)
    }

    times(c) {
        return new Vector(this.x * c, this.y * c)
    }

    get length() {
        return Math.sqrt(this.squared())
    }

    squared() {
        return this.x * this.x + this.y * this.y
    }

    get theta() {
        return Math.atan2(this.y, this.x)
    }

    isZero() {
        return this.x === 0 && this.y === 0
    }

    withLength(len = 1) {
        const multiplier = len / this.length
        return new Vector(this.x * multiplier, this.y * multiplier)
    }

    withTheta(theta=0) {
        return vectorForPolar(this.length, theta)
    }

    scale(scale = 1) {
        return this.multiply(scale)
    }

}
