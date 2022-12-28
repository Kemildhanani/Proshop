import axios from "axios";

export const createPoster = async (posters, authtoken) => 
  await axios.post(`${process.env.REACT_APP_API}/poster`,posters, {
    headers:{
      authtoken,
    }
  })

  export const  getPosters = async () =>
  await axios.get(`${process.env.REACT_APP_API}/posters`)

  export const removePoster = async () =>
  await axios.delete(`${process.env.REACT_APP_API}/posters`)