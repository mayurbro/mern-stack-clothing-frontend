import React, { useContext, useState } from "react";
import Title from "../component/Title";
import CartTotal from "../component/CartTotal";
import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  console.log(method);
  const {
    navigate,
    backendUrl,
    token,
    setToken,
    cartItems,
    setCartItems,
    getCartItems,
    delivery_fees,
    products,
    getCartAmount,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);
        try {
          const { data } = await axios.post(
            backendUrl + "/api/order/verifyrazorpay",
            response,
            {
              headers: { token },
            }
          );

          if (data.success) {
            navigate("/orders");
            setCartItems({});
          }
        } catch (error) {
          toast.error(data.message);
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open(); //pop the razorpay window or ui
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(cartItems);
    try {
      let orderItems = [];
      for (const items in cartItems) {
        console.log(cartItems);
        console.log("items" + items);
        for (const item in cartItems[items]) {
          console.log("item" + item);
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            console.log(itemInfo);
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fees,
      };
      console.log(delivery_fees);
      console.log(orderData.amount);

      switch (method) {
        // api call for cod
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }

          break;

        case "stripe":
          try {
            const responseStripe = await axios.post(
              backendUrl + "/api/order/stripe",
              orderData,
              { headers: { token } }
            );
            console.log(responseStripe.data);
            if (responseStripe.data.success) {
              const { session_url } = responseStripe.data;
              window.location.replace(session_url);
              setCartItems({});
            } else {
              toast.error(responseStripe.data.message);
            }
          } catch (error) {
            console.log(error);
          }

          break;

        case "razorpay":
          const responseRazorpay = await axios.post(
            backendUrl + "/api/order/razorpay",
            orderData,
            { headers: { token } }
          );

          if (responseRazorpay.data.success) {
            console.log(responseRazorpay.data);
            initPay(responseRazorpay.data.order);
          }

          break;

        default:
          break;
      }
      console.log(orderItems);
    } catch (error) {}
  };

  return (
    <form action="" onSubmit={onSubmitHandler}>
      {" "}
      <div className="flex  flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
        {/* ..........Left-side........ */}
        <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
          <div className="text-xl sm:text-2xl  my-3">
            <Title text1={"DELIVERY"} text2={"INFORMATION"} />
          </div>
          <div className="flex gap-3">
            <input
              className="border-gray-300 border rounded py-1.5 px-3.5 w-full "
              type="text"
              placeholder="First name"
              onChange={onChangeHandler}
              name="firstName"
              value={formData.firstName}
              required
            />
            <input
              type="text"
              className="border-gray-300 border rounded py-1.5 px-3.5 w-full "
              placeholder="Last name"
              onChange={onChangeHandler}
              name="lastName"
              value={formData.lastName}
              required
            />
          </div>
          <input
            type="email"
            className="border-gray-300 border rounded py-1.5 px-3.5 w-full "
            placeholder="Email Address"
            onChange={onChangeHandler}
            name="email"
            value={formData.email}
            required
          />
          <input
            type="text"
            className="border-gray-300 border rounded py-1.5 px-3.5 w-full "
            placeholder="Street"
            onChange={onChangeHandler}
            name="street"
            value={formData.street}
            required
          />

          <div className="flex gap-3">
            <input
              className="border-gray-300 border rounded py-1.5 px-3.5 w-full "
              type="text"
              placeholder="City"
              onChange={onChangeHandler}
              name="city"
              value={formData.city}
              required
            />
            <input
              type="text"
              className="border-gray-300 border rounded py-1.5 px-3.5 w-full "
              placeholder="State"
              onChange={onChangeHandler}
              name="state"
              value={formData.state}
              required
            />
          </div>
          <div className="flex gap-3">
            <input
              className="border-gray-300 border rounded py-1.5 px-3.5 w-full "
              type="number"
              placeholder="Zip Code"
              onChange={onChangeHandler}
              name="zipcode"
              value={formData.zipcode}
              required
            />
            <input
              type="text"
              className="border-gray-300 border rounded py-1.5 px-3.5 w-full "
              placeholder="Country"
              onChange={onChangeHandler}
              name="country"
              value={formData.country}
              required
            />
          </div>
          <input
            className="border-gray-300 border rounded py-1.5 px-3.5 w-full "
            type="number"
            placeholder="Phone"
            onChange={onChangeHandler}
            name="phone"
            value={formData.phone}
            required
          />
        </div>
        {/* ........Rigth Side */}

        <div className="mt-8">
          <div className="mt-8 min-w-80">
            <CartTotal />
          </div>

          <div className="mt-12">
            <Title text1={"PAYMENT"} text2={"METHOD"} />
            {/* ...........Payment Method Selection */}
            <div className="flex gap-3 flex-col lg:flex-row">
              <div
                className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
                onClick={() => setMethod("stripe")}
              >
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full ${
                    method === "stripe" ? "bg-green-400" : ""
                  }`}
                ></p>
                <img src={assets.stripe_logo} className="h-5 " alt="" />
              </div>
              <div
                className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
                onClick={() => setMethod("razorpay")}
              >
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full ${
                    method === "razorpay" ? "bg-green-400" : ""
                  }`}
                ></p>
                <img src={assets.razorpay_logo} className="h-5 " alt="" />
              </div>
              <div
                className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
                onClick={() => setMethod("cod")}
              >
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full ${
                    method === "cod" ? "bg-green-400" : ""
                  }`}
                ></p>
                <p className="text-gray-500 text-2 font-medium ">
                  CASH ON DELIVERY
                </p>
              </div>
            </div>
            <div className="w-full text-end mt-8">
              <button
                type="submit"
                className="bg-black text-white px-16 py-3 text-sm"
              >
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
