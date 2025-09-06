import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItems from "./ProductItems";
import Title from "./Title";

const RelatedProduct = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productCopy = products.slice();
      productCopy = productCopy.filter((item) => item.category === category);
      productCopy = productCopy.filter(
        (item) => item.subCategory === subCategory
      );
      setRelated(productCopy.slice(0.5));
    }
  }, [products]);
  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1={"RELATED"} text2={"PRODUCTS"} />
      </div>

      <div className="grid grid-col-2 sm:grid-cols-3 md:grid-col-4 lg:grid-col-5 gap-4 gap-y-6">
        {related.map((item, index) => (
          <ProductItems
            key={index}
            name={item.name}
            price={item.price}
            productId={item._id}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
