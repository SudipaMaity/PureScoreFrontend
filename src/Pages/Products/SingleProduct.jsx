import React, { useEffect } from "react";
import productImg from "../../assets/Products/Product1.jpeg";
import DownloadBImg from "../../assets/icons/download.svg";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProoduct, setCartModal, setCartProducts } from "../../Store/Products/productsSlice";

const SingleProduct = () => {
  const {id} = useParams()
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchSingleProoduct(id))
  },[])
  const product =  useSelector((state)=> state.Products.product)
  const baseUrl = import.meta.env.VITE_BASE_URL; 
  const onAddCart = (product) => {
    console.log("onAdd");
    dispatch(setCartProducts(product)); // Add the product to the cart
    dispatch(setCartModal(true)); // Open the cart modal
  };
  return (
    <section className="w-screen min-h-screen pt-20">
      <div className="max-w-screen-xl m-auto ">
        <div className="w-full">
          <h1 className="text-4xl font-semibold text-center">{product.name}</h1>
        </div>
        <div className="w-full m-auto  mt-12">
          <div className="grid grid-cols-2 gap-10">
            <div className="w-full h-full  flex  flex-col justify-center items-center ">
              <img src={`${baseUrl}/${product.image}`} alt="image" className="w-[60%] h-auto" />
              <div className="flex gap-10 px-10 mt-5">
                <button className="font-atype font-medium border border-primary px-5 py-2 rounded-md" onClick={()=>onAddCart(product)}>
                  Add to Cart
                </button>
                <button className="font-atype font-medium bg-[#202E99] px-5 py-2 text-white rounded-md">
                  Buy Now
                </button>
              </div>
            </div>
            <div className="bg-[#F7F7F7] rounded-lg  p-8">
              <h2 className="font-semibold font-atype">
                Product Category :{" "}
                <span className="text-[#A98C6C] font-bold">{product?.category?.name}</span>
              </h2>
              <h3 className="font-semibold font-atype mt-3">Short Description :</h3>
              <p className="indent-10">
                  {
                    product.short_desc
                  }
              </p>
              <h3 className="font-semibold font-atype mt-3">Description :</h3>
              <p className="indent-10">
                  {
                    product.desc
                  }
              </p>
              <div className="mt-5 ">
                <span className="text-2xl font-semibold">₹ {product.price}</span>{" "}
                <span className="line-through">₹ {product.price+100}</span>
                <button className="ml-5 text-primary font-semibold">
                  Buy Now
                </button>
              </div>
              <div className="flex justify-end  items-center gap-5  mt-10">
                <p className="text-end text-primary font-semibold">
                  Download user manual
                </p>
                <img src={DownloadBImg} alt="download"  className="w-7 h-auto"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
