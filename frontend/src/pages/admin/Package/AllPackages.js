import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from "react-redux";
import { getPackages, removePack } from "../../../functions/package";
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import UpdatePackage from "./UpdatePackage";
import {useNavigate} from "react-router-dom"

const AllPackages = () => {

    const { user } = useSelector((state) => ({ ...state }));
    const navigate  = useNavigate()
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        loadPackages()
    }, []);


    const loadPackages = () => {
        getPackages().then((res) => setPackages(res.data));

    }

    const removePackage = async (id) => {
        alert("hello")
        try {
            await removePack(id);
            window.location.reload()
        }
        catch (err) {
            console.log("remove package", err)
        }
    }

    const updatePackage= async (id) =>{
        navigate(`/package/update/${id}`)
    }


    return (
        <>
            <div className="container-fluid">

                {packages && packages.length > 0 && packages.map(p => (
                    <div className="col-md-4 pb-2 float-left">
                        <Card sx={{ maxWidth: 345, marginTop: "1px", height: "250px", color: "white", bgcolor: "#aaaaaa" }}>
                            <CardContent >
                                <Typography className="typography-activated" >
                                    <strong>
                                        id:  #{p._id}
                                    </strong>
                                </Typography>
                                <Typography className="typography-activated">
                                    Name :  {p.name}
                                </Typography>
                                <Typography className="typography-activated">
                                    Price: {p.price}
                                </Typography>
                                <Typography className="typography-activated">
                                    Products: {p.products}
                                </Typography><Typography className="typography-activated">
                                    Duration: {p.duration}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ float: "right" }}>
                                {/* <Button className="button-activated variant="contained" sx={{bgcolor: '#a51414'}} >Deactivate</Button> */}
                                <EditTwoToneIcon onClick={()=>updatePackage(p._id)} sx={{marginRight:"20px",cursor:"pointer"}}/>
                                <DeleteForeverIcon onClick={() => removePackage(p._id)} sx={{ cursor: "pointer", marginRight: "20px" }} />
                            </CardActions>
                        </Card>
                    </div>
                ))}
            </div>


        </>
    )
}

export default AllPackages;
