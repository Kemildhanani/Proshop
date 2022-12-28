import axios from "axios";

export const createProduct = async (product, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/product`, product, {
    headers: {
      authtoken,
    },
  });


export const getProductsByCount = async (count) =>
  await axios.get(`${process.env.REACT_APP_API}/products/${count}`);

export const getTopGrossing = async () => {
  return axios.get(`${process.env.REACT_APP_API}/products/top/grossing`)
}

export const getTopRated = async () => {
  return axios.get(`${process.env.REACT_APP_API}/products/top/rated`)
}

export const getproductbyid = async (id) => {
  return axios.get(`${process.env.REACT_APP_API}/getproduct/${id}`)
}

export const removeProduct = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const getProduct = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);

export const updateProduct = async (slug, product, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/product/${slug}`, product, {
    headers: {
      authtoken,
    },
  });

export const getProducts = async (sort, order, page) =>
  await axios.post(`${process.env.REACT_APP_API}/products`, {
    sort,
    order,
    page,
  });

export const getProductsCount = async () =>
  await axios.get(`${process.env.REACT_APP_API}/products/total`);

export const productStar = async (productId, star, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/product/star/${productId}`,
    { star },
    {
      headers: {
        authtoken,
      },
    }
  );
  
  

export const getRelated = async (productId) =>
  await axios.get(`${process.env.REACT_APP_API}/product/related/${productId}`);

export const fetchProductsByFilter = async (arg) =>
  await axios.post(`${process.env.REACT_APP_API}/search/filters`, arg);

export const getFilteredProductsFunction = async (price,categoryIds,star,sub) =>
  await axios.post(`${process.env.REACT_APP_API}/search/filters/products`, price,categoryIds,star,sub);

export const getUnapprovedProduct = async ()=>
await axios.get(`${process.env.REACT_APP_API}/admin/product/approve`);
 
export const approveProduct = async (id) =>
await axios.put(`${process.env.REACT_APP_API}/admin/product/approve/${id}`);

export const rejectProduct = async (id) =>
await axios.put(`${process.env.REACT_APP_API}/admin/product/reject/${id}`);

export const activateProduct = async (seller,id) =>
await axios.put(`${process.env.REACT_APP_API}/seller/product/activate/${id}`,{seller});

export const deactivateProduct = async (seller,id) =>
await axios.put(`${process.env.REACT_APP_API}/seller/product/deactivate/${id}`,{seller});

export const SellerProduct = async (id) =>
await axios.get(`${process.env.REACT_APP_API}/seller/product/${id}`);

export const getOrderProduct = async (id) =>
await axios.get(`${process.env.REACT_APP_API}/order/product/${id}`);