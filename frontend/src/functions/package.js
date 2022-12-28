import axios from "axios";

export const createPackage = async (value) =>
    await axios.post(`${process.env.REACT_APP_API}/admin/package`, value);


export const getPackages = async () =>
    await axios.get(`${process.env.REACT_APP_API}/admin/getpackage`);

export const getPack = async (id) => {
    return await axios.get(`${process.env.REACT_APP_API}/getpack/${id}`);
}

export const removePack = async (id) =>
    await axios.post(`${process.env.REACT_APP_API}/pack/remove/${id}`);

export const updatePack = async (id,pack) =>
    await axios.post(`${process.env.REACT_APP_API}/pack/update/${id}`,pack);


