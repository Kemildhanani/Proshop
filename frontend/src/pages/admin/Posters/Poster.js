import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import PosterUpload from "../../../Components/Forms/PosterUopload";
import AdminSidebar from "../../../Components/sidebar/AdminSidebar/AdminSidebar";
import { getPosters, removePoster } from "../../../functions/poster";
import { createPoster } from "../../../functions/poster";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Image } from "antd";
import axios from "axios";
import "./poster.css";

const Poster = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const initialState = {
    posters: [],
  };

  const [values, setValues] = useState(initialState);
  const [url, setUrl] = useState("");
  const [public_id, setPublic_id] = useState();
  const [loading, setLoading] = useState(false);
  const [val, setVal] = useState({});
  const [posters, setPosters] = useState([]);

  useEffect(() => {
    loadPosters();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    values.posters.forEach((element) => {
      createPoster(element, user.token)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    });
    toast.success("Poster Uploaded");
    window.location.reload();
  };

  const loadPosters = () => {
    getPosters().then((s) => {
      setPosters(s.data);
    });
  };

  const handlePosterRemove = async (id, public_id) => {
    setLoading(true);
    console.log("remove poster Public id:", public_id);
    console.log("remove poster object id:", id);

    try {
      await axios.post(
        `${process.env.REACT_APP_API}/removePosters`,
        { public_id },
        {
          headers: {
            authtoken: user ? user.token : "",
          },
        }
      );
      removePoster(id);
      window.location.reload();
    } catch (err) {
      console.log("Remove poster", err);
    }
  };

  return (
    <>
      <div className="poster-dashboard-home">
        <AdminSidebar />
        <div className="poster-dashboard-homeContainer">
          <div className="poster-dashboard-listContainer">
            <PosterUpload
              values={values}
              setUrl={setUrl}
              setPublic_id={setPublic_id}
              setValues={setValues}
              setLoading={setLoading}
            />
            <hr style={{ border: "1px solid gray" }} />
            <Button variant="contained" onClick={handleSubmit}>
              Upload
            </Button>
          </div>
          <div className="ml-5">
            {posters &&
              posters.map((p) => (
                <span key={p._id}>
                  <Card
                    sx={{
                      bgcolor: "#AAAAAA",
                      marginTop: "10px",
                      marginBottom: "20px",
                      marginRight: "15px",
                      marginLeft: "20px",
                      float: "left",
                      maxWidth: 345,
                    }}
                  >
                    <CardContent sx={{ float: "right" }}>
                      <Image src={p.url} style={{ height: 100, width: 400 }} />
                    </CardContent>
                    <CardActions sx={{ justifyContent: "center" }}>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => {
                          var ans = window.confirm(
                            "Do you want to delete this poster? ",
                            p.public_id
                          );
                          if (ans) {
                            handlePosterRemove(p._id, p.public_id);
                          }
                        }}
                        alt="Delete"
                      >
                        Remove
                      </Button>
                    </CardActions>
                  </Card>
                </span>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Poster;
