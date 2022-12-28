import axios from "axios"

export const createOrUpdateUser=async (authtoken) => {
    
    return await axios.post(
        `${process.env.REACT_APP_API}/create-or-update-user`,
        {},
        {
        headers:{
            authtoken,
        },
    }
    );
};


export const createOrUpdateSeller=async(authtoken) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/create-or-update-seller`,
        {},
        {
        headers:{
            authtoken,
        },
    }
    );
};

export const createSeller = async (packageData, authtoken) => {
    return await axios.post('http://localhost:8000/api/user/register', { packageData }, {
        headers: {
            authtoken: authtoken
        }
    })
}

export const currentUser=async (authtoken) => {
    
    return await axios.post(
        `${process.env.REACT_APP_API}/current-user`,
        {},
        {
        headers:{
            authtoken,
        },
    }
    );
};

export const currentAdmin=async (authtoken) => {
    
    return await axios.post(
        `${process.env.REACT_APP_API}/current-admin`,
        {},
        {
        headers:{
            authtoken,
        },
    }
    );
};

export const currentSeller = async (authtoken) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/current-seller`,
        {},
        {
            headers:{
                authtoken,
            },
        }
    );
};

export const currentAgency = async (authtoken) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/current-agency`,
        {},
        {
            headers:{
                authtoken,
            },
        }
    );
};