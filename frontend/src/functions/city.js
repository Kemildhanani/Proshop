import axios from "axios"

export const getCities = async () =>  
    await axios.get(`${process.env.REACT_APP_API}/cities`);


export const getCity = async (slug) => 
    await axios.get(`${process.env.REACT_APP_API}/city/${slug}`);

export const getStateOfCities = async (slug, city) =>
    await axios.get(`${process.env.REACT_APP_API}/city/${slug}`);

export const remoceCity = async (slug, authtoken) => 
    await axios.delete(`${process.env.REACT_APP_API}/city/${slug}`, {
        headers:{
            authtoken,
        }
    });

export const updateCity = async (slug,city, authtoken ) => 
    await axios.put(`${process.env.REACT_APP_API}/city/${slug}`, city,{
        headers:{
            authtoken,
        }
    });

export const createCity = async (city, authtoken ) => 
    await axios.post(`${process.env.REACT_APP_API}/city`, city, {
        headers:{
            authtoken,
        }
    });



