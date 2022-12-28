import React, { useState, useEffect } from "react";
import "../Components/cards/productCard.css";
import { Link, useParams } from "react-router-dom";
import Pagination from "../Components/pagination/Pagination";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";
import { getTopGrossing, getTopRated } from "../functions/product";
import { getPosters } from "../functions/poster";
import ProductCard from "../Components/cards/ProductCard";
import walletposter from "../images/wallet edited.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SubHeader from "../Components/navbar/SubHeader";
import Tooltip from '@mui/material/Tooltip';


const Home = () => {
  const params = useParams();
  const [posters, setPosters] = useState([]);
  const pageNumber = params.pageNumber || 1;
  const [prod, setProd] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [topGrossing123, setTopGrossing] = useState([]);
  const [topRated123, setTopRated] = useState([]);
  const [page, setPage] = useState(pageNumber);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API}/products?page=${page}`
        );
        const { data, pages: totalPages } = await res.json();
        setPages(totalPages);
        setProd(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError("Some error occured");
      }
    };
    fetchProducts();
    loadAllProducts();
    loadPosters();
  }, [page]);

  const products = prod.filter((items) => {
    return (
      items.approved === true &&
      items.activated === true &&
      items.rejected === false
    );
  });
  const topGrossing = topGrossing123.filter((items) => {
    return (
      items.approved === true &&
      items.activated === true &&
      items.rejected === false
    );
  });
  const topRated = topRated123.filter((items) => {
    return (
      items.approved === true &&
      items.activated === true &&
      items.rejected === false
    );
  });

  const loadPosters = () => {
    getPosters().then((s) => {
      setPosters(s.data);
    });
  };

  const loadAllProducts = () => {
    setLoading(true);
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    getTopGrossing()
      .then((res) => {
        setTopGrossing(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    getTopRated()
      .then((res) => {
        setTopRated(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let settingsBestSeller = {
    infinite: true,
    speed: 3000,
    autoplaySpeed: 6000,
    autoplay: true,
    slidesToShow: 5,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 670,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };
  let settingsTopRated = {
    infinite: true,
    speed: 3000,
    autoplaySpeed: 6000,
    autoplay: true,
    slidesToShow: 5,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 670,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  let posterSettings = {
    infinite: true,
    speed: 1000,
    autoplaySpeed: 5000,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  };

  return (
    <>
      <SubHeader />
      <div className="home" style={{ background: "white" }}>
        <div className="m-4 mt-5">
          <div className="home-poster">
            <Slider
              arrows={false}
              className="home-main-poster"
              {...posterSettings}
            >
              {posters &&
                posters.map((p) => (
                  <img height="250px" alt={p.name} key={p._id} src={p.url} />
                ))}
            </Slider>
            <Link
              className="home-side-poster
                    "
              to="/user/profile"
            >
            <Tooltip title="click here to activate wallet">
            <img
              className="ml-3 poster-image"
              height="250px"
              alt="Wallet"
              src={walletposter}
            />
            </Tooltip>
            </Link>
          </div>
          <h1 style={{ fontSize: "25px" }} className="home-title mt-2">
            All Products
          </h1>
          <h6 className="home-subtitle">Latest tech products</h6>
          <div className="product-wrapper mt-3" id="responsive">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          <Pagination page={page} pages={pages} changePage={setPage} />

          <hr className="mt-3" />
          <h5 className="home-title mt-2">Best Seller Products</h5>
          <h6 className="home-subtitle">
            Our most popular products based on sales
          </h6>

          <Slider
            className="sliderTopGrossing"
            arrows={false}
            {...settingsBestSeller}
          >
            {/* <div style={{display: "flex", flexDirection:"row"}} > */}
            {topGrossing &&
              topGrossing.map((product) => (
                <div className="pCardTopGrossing" key={product._id}>
                  <ProductCard product={product} />
                </div>
              ))}
            {/* </div> */}
          </Slider>

          <hr className="mt-3" />
          <h5 className="home-title mt-3">Highest Rated Products</h5>
          <h6 className="home-subtitle">
            Our most liked products based on customer ratings
          </h6>
          <Slider    
            className="sliderTopGrossing"
            arrows={false}
            {...settingsTopRated} >
            {topRated &&
              topRated.map((product) => (
                <div className="pCardTopGrossing" key={product._id}>
                  <ProductCard product={product} />
                </div>
              ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default Home;
