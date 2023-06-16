import City from "./city"
import Road from "./road"
import Vehicle from "./vehicle"


class _World {
    constructor() {
        this.cities = []
        this.citiesById = {}
        this.roads = []
        this.roadsById = {}
        this.vehicles = []
        this.vehiclesById = {}
    }

    addCity(params) {
        const c = new City(params)
        this.cities.push(c)
        this.citiesById[c.id] = c
        return c
    }

    addRoad(params) {
        const r = new Road(params)
        this.roads.push(r)
        this.roadsById[r.id] = r
        return r
    }

    addVehicle(params) {
        const v = new Vehicle(params)
        this.vehicles.push(v)
        this.vehiclesById[v.id] = v
        return v
    }

    toView() {
        return {
            cities: this.cities.map(c => c.toView()),
            roads: this.roads.map(r => r.toView()),
            vehicles: this.vehicles.map(v => v.toView())
        }
    }

    updateState(deltaMs) {
        this.vehicles.forEach(v => v.updateState(deltaMs))
    }


    findEdgeBetween(from, to) {
        return this.roads.find(e =>
            (e.from === from && e.to === to)
            || (e.from === to && e.to === from)            
            ) || null
    }

}

const WORLD = new _World()

const c1 = WORLD.addCity({name: "C1", position: {x: 200, y: 50}})
const c2 = WORLD.addCity({name: "C2", position: {x: 500, y: 200}})

const r1 = WORLD.addRoad({from: c1, to: c2})

WORLD.addVehicle({name: "V1", maxSpeed: 20, road: r1})

export default WORLD