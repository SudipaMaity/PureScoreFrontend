import React from "react";
import { useDispatch, useSelector } from "react-redux";
import img1 from "../../../assets/Products/Product1.jpeg";
import Arrow from "../../../assets/icons/right-arrow.svg";
import Button from "../../Sharing-Component/Button";
import { setCartModal, setCartProducts } from "../../../Store/Products/productsSlice";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product = {} }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const user = useSelector((state) => state.User.user);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const onProductClick = (productId) => {
    // Implement product click logic here
    navigate(`/product/${productId}`)
  };

  const onAddCart = (product) => {
    dispatch(setCartProducts(product)); // Add the product to the cart
    dispatch(setCartModal(true)); // Open the cart modal
  };

  return (
    <div className="w-full h-full min-w-[340px] max-w-[380px] max-h-[520px] overflow-hidden shadow grid grid-cols-1 rounded-[8px] border">
      <div className="w-full h-full">
        <img
          src={`${baseUrl}/${product.image}`}
          alt="product image"
          className="w-full max-h-[325px] object-cover"
        />
      </div>
      <div className="w-full p-7 grid grid-cols-1 gap-5 bg-white">
        <div className="w-full flex items-center justify-between">
          <div>
            <h2 className="font-atype font-semibold text-2xl">
              {product?.name}
            </h2>
            <h4 className="font-atype text-xl">{product?.category?.name}</h4>
          </div>
          <div>
            <img
              src={Arrow}
              alt="right_icon"
              onClick={() => onProductClick(product._id)}
              className="cursor-pointer"
            />
          </div>
        </div>
        <div className="w-full flex items-center gap-20 font-atype font-semibold">
        {user && user.role===0 && <Button label="Add to Cart" onClick={() => onAddCart(product)} />}
          <span>₹ {product.price}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
