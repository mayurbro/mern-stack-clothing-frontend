import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
const ProductItems = ({ name, productId, price, image }) => {
  const { currency } = useContext(ShopContext);
  return (
    <div>
      <Link
        to={`/product/${productId}`}
        className="text-gray-700 cursor-pointer"
      >
        <div className="overflow-hidden">
          <img
            className="hover:scale-110 transition ease-in-out"
            src={image[0]}
            alt=""
          />
        </div>
        <p className="pt-3 pb-1 text-sm">{name}</p>
        <p className="text-sm font-medium">
          {currency}
          {price}
        </p>
      </Link>
    </div>
  );
};

export default ProductItems;
