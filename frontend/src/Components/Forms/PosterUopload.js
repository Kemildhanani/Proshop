import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
import { Avatar,Badge } from 'antd';



const PosterUpload = ({ values, setPublic_id,setUrl,setValues, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const fileUploadAndResize = (e) => {
    // console.log(e.target.files);
    // resize
    let files = e.target.files; // 3
    let allUploadedFiles = values.posters;

    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            // console.log(uri);
            axios.post(`${process.env.REACT_APP_API}/uploadPosters`,{ poster: uri }, {headers: {authtoken: user ? user.token : "",},})
              .then((res) => {
                // console.log("IMAGE UPLOAD RES DATA", res);
                setLoading(false);
                allUploadedFiles.push(res.data);
                setPublic_id(res.data.public_id);
                setUrl(res.data.url);
                setValues({ ...values, posters: allUploadedFiles });
                
              })
              .catch((err) => {
                setLoading(false);
                console.log("CLOUDINARY UPLOAD ERR", err);
              });
          },
          "base64"
        );
      } 
    }
    // send back to server to upload to cloudinary
    // set url to images[] in the parent component state - ProductCreate
  };

    const handlePosterRemove=(public_id)=>{
      setLoading(true);
      console.log("remove",public_id)
      axios.post(`${process.env.REACT_APP_API}/removePosters`,{public_id},{
        headers:{
          authtoken: user ? user.token: "",
        },
      })
      .then((res)=>{
        setLoading(false);
        const {posters}=values
        let filteresPosters=posters.filter((item)=>{
          return item.public_id != public_id;
        });
        setValues({...values,posters: filteresPosters});
      })
      .catch((err)=>{
          console.log(err);
          setLoading(false)
      })
    }

  return (
    <>
      <div className="row">
        
        {values.posters && values.posters.map((poster)=>(
          <Badge count="X" key={poster.public_id} 
                onClick={()=>handlePosterRemove(poster.public_id)}
                style={{cursor:"pointer"}}
            >
              <Avatar 
                  src={poster.url} 
                  shape="square" 
                  className="m-3" 
                  size={200}/>
          </Badge>
        ))}
      </div>  

      <div className="row">
      <label className="btn btn-primary btn-raised mt-3">
        Choose Poster
        <input
          type="file"
          multiple
          hidden
          accept="images/*"
          onChange={fileUploadAndResize}
        />
      </label>
    </div>
    </>
  );
};

export default PosterUpload;
