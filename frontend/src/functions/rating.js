import React from "react";
import StartRating from "react-star-ratings";


export const showAverage = (p) =>{
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
        <div className="text-center pt-3 pb-0">
            <span>
                <StartRating 
                    className="p-0 m-0"
                    starDimension="20px"
                    starSpacing="0.005rem"
                    starRatedColor="#FFA500"
                    editing={false}
                    rating={result} 
                />
                {/* ({p.ratings.length}) */}
            </span>
        </div>
    )
};
};


export default showAverage;