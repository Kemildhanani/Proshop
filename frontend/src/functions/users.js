import axios from "axios";

export const getUsers = async () =>
    await axios.get(`${process.env.REACT_APP_API}/users`);

export const UpdateUsers = async (slug, action, authtoken) =>
    await axios.put(`${process.env.REACT_APP_API}/user/${slug}`, action);

export const deactivateUser = async (id, authtoken) => {
    return await axios.put(`http://localhost:8000/api/admin/deactivate/${id}`, {}, {
        headers: {
            authtoken: authtoken
        }
    })
}
export const activateUser = async (id, authtoken) => {
    return await axios.put(`http://localhost:8000/api/admin/activate/${id}`, {}, {
        headers: {
            authtoken: authtoken
        }
    })
}
export const getUser = async (email) => {
    return await axios.get(`${process.env.REACT_APP_API}/admin/user/${email}`);
}

export const getUserDetails = async (id) =>
    await axios.get(`${process.env.REACT_APP_API}/user/${id}`);

export const userUpdateProfile = async (id, val) =>
    await axios.put(`${process.env.REACT_APP_API}/profile/update/${id}`, val);
    
export const getProfile = async (id) =>
    await axios.get(`${process.env.REACT_APP_API}/profile/${id}`);

