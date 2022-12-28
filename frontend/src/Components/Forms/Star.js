import React from "react";
import StarRating from 'react-star-ratings';

const Star=({starClick,numberOfStars}) =>{
    return(
        <>
            <StarRating 
                changeRating={()=>starClick(numberOfStars)}
                numberOfStars={numberOfStars}
                starDimension="20px"
                starSpacing="8px"
                starHoverColor="#FFA500"
                starEmptyColor="#FFA500"
            />
        <br/>
        </>
    )
}


export default Star;


