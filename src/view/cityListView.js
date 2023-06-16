import React from "react"


const CityListView = ({cities=[]}) => <div> 
    {
        cities.map(c => <div key={c.id}>
            {c.name}C
        </div>)
    }

    CITIES
</div> 

export default CityListView