
import React from 'react';
import underConstructionAnimation  from "../../assets/lottie/site under construction.json"
import Lottie from 'lottie-react';
const Check = () => {
    return (
        <div className='min-h-screen'>

        <Lottie
          animationData={underConstructionAnimation}
          loop={true}
        className="w-96 h-96 mx-auto"
        />
        </div>
    );
};

export default Check;