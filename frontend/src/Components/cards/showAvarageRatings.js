import React from "react";
import StartRating from "react-star-ratings";


export const showAverageRatings = (p) =>{
    if(p && p.ratings){
        let ratingsArray = p && p.ratings
        let total=[]
        let length = ratingsArray.length

        ratingsArray.map((r)=> total.push(r.star))
        let totalReduced = total.reduce((p,n)=>p+n,0);
        // console.log("total reduced",totalReduced);

        let highest = length * 5;
        // console.log("highets",highest);

        let result = (totalReduced*5)/highest;
        // console.log("result",result);
    return(
        <>
        {result}
        </>
    )
};
};


export default showAverageRatings;