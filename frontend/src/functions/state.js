import axios from "axios"

export const getStates = async () =>  
    await axios.get(`${process.env.REACT_APP_API}/states`);


export const getState = async (slug) => 
    await axios.get(`${process.env.REACT_APP_API}/state/${slug}`);

export const removeState = async (slug, authtoken) => 
    await axios.delete(`${process.env.REACT_APP_API}/state/${slug}`, {
        headers:{
            authtoken,
        }
    });

export const updateState = async (slug,state, authtoken ) => 
    await axios.put(`${process.env.REACT_APP_API}/state/${slug}`, state,{
        headers:{
            authtoken,
        }
    });

export const creareState = async (state, authtoken ) => 
    await axios.post(`${process.env.REACT_APP_API}/state`, state, {
        headers:{
            authtoken,
        }
    });

export const getStateCities = async (_id) => 
    await axios.get(`${process.env.REACT_APP_API}/state/cities/${_id}`);