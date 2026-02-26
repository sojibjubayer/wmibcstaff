import React from "react";
import { NavLink } from "react-router-dom";
import underConstructionAnimation from "../assets/lottie/site under construction.json";
import Lottie from "lottie-react";

const NotFound = () => {
    return (
            //UNDER CONSTRUCTION 
    // <div className="min-h-screen">
    //   <Lottie
    //     animationData={underConstructionAnimation}
    //     loop={true}
    //     className="w-96 h-96 mx-auto"
    //   />
    // </div>
        <div className="min-h-screen text-center mt-10">
            <p>404 :: page not found</p>
            <NavLink to='/'>goto  <span className="text-blue-500">Home</span></NavLink>
        </div>
    );
};

export default NotFound;