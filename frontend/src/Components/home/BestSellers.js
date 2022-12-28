import React,{useEffect, useState} from 'react'
import { getProducts, getProductsCount } from '../../functions/product';
import ProductCard from '../cards/ProductCard';
import LoadingCard from '../cards/LoadingCard';
import { Pagination } from 'antd';

const NewArrivals = () => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false);
    const [productsCount, setProductsCount] = useState(0);
    const [page, setPage] = useState(window.localStorage.getItem("Best Seller paging")); 

    useEffect(() => {
        loadAllProducts()
    }, [page])

    useEffect(() => {
        getProductsCount().then((res) => setProductsCount(res.data));
    },[])

    //paging with refresh
    window.localStorage.setItem("Best Seller paging",page);

    const loadAllProducts = () =>{
        setLoading(true)
        // sort, order, limit
        getProducts('sold','desc', page)
        .then((res) => {
            setProducts(res.data);
            setLoading(false)
        });
    }

    const Page=()=>{

        var paging = 0
        
        for (let i = 0; i < productsCount ; i=i+3 ){
            paging = paging + 10;
        }

        return(
            <>
                <Pagination 
                     current={page} 
                     total={(paging)} 
                     onChange={(value) => setPage(value)} 
                />
            </>
        )
    }

  return( 
      <>
        {/* {productsCount} */}
        <div className='container'>        
        { loading ? (
        <LoadingCard count={3}/>
        ) :  (
        <div className='row' >
            {products.map((product)=> (
                <div key={product._id} className='col-md-4' >
                    <ProductCard product={product} />
                </div>
            ))} 
        </div>)}
    </div>
        
    <div className='col-md-4 offset-md-4 text-center pt-2 p-3'>
                <Page/>
    </div>

      </>
  );
}

export default NewArrivals