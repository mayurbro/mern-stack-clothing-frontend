import React from "react";
import { useContext } from "react";
import Hero from "../component/Hero";
import LatestCollection from "../component/LatestCollection";
import BestSeller from "../component/BestSeller";
import OurPolicy from "../component/OurPolicy";
import NewsLetterBox from "../component/NewsLetterBox";
import { ShopContext } from "../context/ShopContext";
const Home = () => {
  const { products } = useContext(ShopContext);
  console.log(products);

  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsLetterBox />
    </div>
  );
};

export default Home;
