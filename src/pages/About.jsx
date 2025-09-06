import React from "react";
import Title from "../component/Title";
import { assets } from "../assets/frontend_assets/assets";
import NewsLetterBox from "../component/NewsLetterBox";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          src={assets.about_img}
          className="w-full md:max-w-[450px]"
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Welcome to Forever, where style meets individuality. Founded with a
            passion for fashion and a commitment to quality, we aim to bring you
            the best in modern, comfortable, and trendsetting apparel.
          </p>
          <p>
            Our journey began with a vision to create clothing that resonates
            with every personality and occasion. From everyday essentials to
            statement pieces, our collections are designed to inspire confidence
            and celebrate uniqueness.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            At Forever, sustainability and customer satisfaction are at the
            heart of everything we do. We carefully source materials and craft
            each piece with precision to ensure you not only look great but feel
            great too.
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 ">
          <b>Quality Assurance</b>
          <p className="text-gray-600">
            We are committed to delivering the highest quality products,
            ensuring every piece meets rigorous standards of excellence.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience</b>
          <p className="text-gray-600">
            Our user-friendly website ensures you can easily browse, select, and
            purchase your favorite styles with just a few clicks.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service</b>
          <p className="text-gray-600">
            Our friendly and knowledgeable support staff is available to assist
            you with any inquiries, ensuring quick and effective solutions.
          </p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
};

export default About;
