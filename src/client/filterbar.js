import React, { useContext } from "react";
import Home from "./home";

export const Filterbar = ()=>{
    const {active} = useContext(Home)
    return (
        <div className={`container-filters active`}>
            <div className="filter-by-type">

                <span>tipo</span>
            </div>

        </div>
        
    )
}