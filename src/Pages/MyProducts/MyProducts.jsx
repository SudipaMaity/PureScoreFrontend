import React from "react";
import productImG from "../../assets/Products/Product1.jpeg";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const MyProducts = () => {
  const products = useSelector((state) => state.Products.Products);
  const baseUrl = import.meta.env.VITE_BASE_URL; 
  const navigate = useNavigate()

  const onProductClick = (productId) => {
    // Implement product click logic here
    navigate(`/product/${productId}`)
  };

  const onEdit = (productId) => {
    // Implement product click logic here
    navigate(`/productEdit/${productId}`)
  };
  return (
    <section className="w-screen min-h-screen font-atype py-10">
      <div className=" w-full max-w-screen-2xl flex flex-col justify-center  items-center m-auto">
        <div>
          <h1 className="text-3xl font-semibold ">My Products</h1>
        </div>
        <div className="max-w-screen-xl m-auto mt-10">
          {products.map((product, i) => {
            return (
              <div
                className="w-full grid grid-cols-3 bg-slate-50 py-4 rounded-xl my-3"
                key={i}
              >
                <div className=" flex justify-center items-center ">
                  <img
                    src={`${baseUrl}/${product.image}`}
                    alt="product"
                    className="w-[40%] rounded-xl"
                  />
                </div>
                <div className="flex flex-col  gap-1">
                  <h1 className="text-xl font-semibold">{product?.name}</h1>
                  <h3 className="text-lg font-medium">{product.category.name}</h3>
                  <p>
                   {product.short_desc}
                  </p>
                  <span className="font-semibold text-primary cursor-pointer" onClick={()=>{onProductClick(product._id)}} >View More</span>
                </div>
                <div className="flex justify-center items-center gap-5">
                  <div>
                    <div className="flex justify-center items-end gap-3">
                      <div className="flex flex-col">
                        {" "}
                        <span>Product Quantity Left</span>
                        <span className="text-center border border-primary px-6 py-2  rounded-lg mt-2">
                          {product?.quantity}
                        </span>
                      </div>
                      <div>
                        <button className="px-6 py-2 bg-primary rounded-lg text-white flex justify-center items-center gap-3" onClick={()=>{onEdit(product._id)}}>
                          <ModeEditIcon /> <span>Edit</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MyProducts;
