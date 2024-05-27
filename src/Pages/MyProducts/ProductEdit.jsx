import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchAllCategories,
  fetchSingleProoduct,
  updateProduct,
} from "../../Store/Products/productsSlice";

const ProductEdit = () => {
  const { id } = useParams();
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const dispatch = useDispatch();

  const product = useSelector((state) => state.Products.product);
  const categories = useSelector((state) => state.Products.categories);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    short_desc: "",
    desc: "",
    image: null,
  });
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    dispatch(fetchSingleProoduct(id));
    console.log(categories);
  }, [id, dispatch]);

  useEffect(() => {
    if (!categories.length) {
      console.log("insider categories");
      dispatch(fetchAllCategories());
    }
  }, [categories, dispatch]);
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        category: product.category?.name || "",
        price: product.price || "",
        quantity: product.quantity || "",
        short_desc: product.short_desc || "",
        desc: product.desc || "",
        image: product.image || null,
      });
      setPreviewImage(`${baseUrl}/${product.image}`);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        image: file,
      }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    const updatedProduct = {
      name: formData.productName,
      category: formData.category,
      price: formData.price,
      quantity: formData.quantity,
      short_desc: formData.shortDesc,
      desc: formData.desc,
      image: formData.image, // Assuming you're handling image updates separately
    };
    dispatch(updateProduct(id, updatedProduct));
  };

  return (
    <section className="w-screen py-10 font-atype">
      <div className="max-w-screen-xl m-auto">
        <div>
          <h1 className="text-center text-3xl font-semibold">
            Product Edit Page
          </h1>
        </div>

        <div className="grid grid-cols-2 mt-10 gap-10">
          <div className="bg-[#FAFAFA] p-10 rounded-xl flex flex-col gap-3">
            <div className="grid grid-cols-2 ">
              <div>
                <img src={previewImage} alt="product" className="w-[60%]" />
              </div>
              <div className="py-4">
                <h1 className="text-xl font-semibold">{product.name}</h1>
                <h2 className="font-semibold">{product?.category?.name}</h2>
                <h3 className="font-semibold">
                  Price : <span className="font-medium">₹ {product.price}</span>
                </h3>
                <h3 className="font-semibold">
                  Quantity :{" "}
                  <span className="font-medium">{product.quantity}</span>
                </h3>
              </div>
            </div>
            <div>
              <h4 className="font-xl font-semibold">Short Description :</h4>
              <p className="font-campton indent-8 mt-1">{product.short_desc}</p>
            </div>
            <div>
              <h4 className="font-xl font-semibold">Product Description :</h4>
              <p className="font-campton indent-8 mt-1">{product.desc}</p>
            </div>
          </div>
          <form onSubmit={handleUpdateProduct}>
            <div className="bg-[#FAFAFA] p-10 rounded-xl flex flex-col gap-3">
              <div className="grid grid-cols-2 ">
                <div className="w-[80%] h-40 flex justify-center items-center rounded-lg">
                  <input
                    required
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="product"
                        className="w-40 h-full object-cover rounded-lg "
                      />
                    ) : (
                      "Upload Image"
                    )}
                  </label>
                </div>
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter Product Name"
                    className="rounded-lg w-full"
                    required
                  />
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="rounded-lg w-full"
                  >
                    {categories.map((category, i) => {
                      return (
                        <option value={category._id} key={i}>
                          {category.name}
                        </option>
                      );
                    })}
                  </select>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Enter Price"
                    className="rounded-lg w-full"
                    required
                  />
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="Enter Product Quantity"
                    className="rounded-lg w-full"
                    required
                  />
                </div>
              </div>
              <div>
                <textarea
                  required
                  name="short_desc"
                  value={formData.short_desc}
                  onChange={handleChange}
                  placeholder="Enter short description in 30 words"
                  className="w-full rounded-lg"
                />
              </div>
              <div>
                <textarea
                  required
                  name="desc"
                  value={formData.desc}
                  onChange={handleChange}
                  placeholder="Enter detailed description"
                  className="w-full rounded-lg"
                />
              </div>
              <button
                type="submit"
                className="bg-primary px-6 py-2 m-auto text-white rounded-lg"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProductEdit;
