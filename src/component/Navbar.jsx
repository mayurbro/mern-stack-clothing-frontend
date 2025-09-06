import React, { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { NavLink, Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    token,
    setToken,
    navigate,
    setCartItems,
    cartItems,
  } = useContext(ShopContext);
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
    console.log(isDropdownOpen);
  };
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});

    // Redirect to login page
    navigate("/login");
    console.log(token);

    console.log("Token after logout:", localStorage.getItem("token")); // Should log null
  };
  return (
    <div
      className="
    flex items-center justify-between py-5 font-medium"
    >
      <img src={assets.logo} alt="" className="w-36" />
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1 ">
          <p>Home</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>Collection</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>About</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>Contact</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>
      <div className="flex  items-center gap-5">
        <img
          src={assets.search_icon}
          className="cursor-pointer w-5"
          alt=""
          onClick={() => setShowSearch(true)}
        />
        <div className="relative">
          <div className=" cursor-pointer " onClick={toggleDropdown}>
            <img
              src={assets.profile_icon}
              className="w-5 cursor-pointer"
              alt=""
            />
            {isDropdownOpen && (
              <div className=" absolute flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <p
                  className="cursor-pointer hover:text-black"
                  onClick={() => navigate("/orders")}
                >
                  Order
                </p>
                <p onClick={logout} className="cursor-pointer hover:text-black">
                  Logout
                </p>
                {token ? (
                  ""
                ) : (
                  <Link to="/login">
                    <p className="cursor-pointer hover:text-black">Login</p>
                  </Link>
                )}
              </div>
            )}

            {/* Dropdown Menu */}

            {/* )} */}
          </div>
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5  min-w-5" alt="" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px] ">
            {getCartCount()}
          </p>
        </Link>
      </div>
      <img
        src={assets.menu_icon}
        className="sm:hidden w-5 cursor-pointer
       "
        onClick={() => {
          setVisible(true);
        }}
        alt=""
      />
      {/* sidebar menu */}
      <div
        className={`absolute top-0 right-0 bottom-0 left-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            className="flex items-center gap-4 p-3"
            onClick={() => {
              setVisible(false);
            }}
          >
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="" />
            <p>Back</p>
          </div>
          <NavLink
            className="py-2 pl-6 border"
            to="/"
            onClick={() => {
              setVisible(false);
            }}
          >
            Home
          </NavLink>
          <NavLink
            className="py-2 pl-6 border"
            to="/collection"
            onClick={() => {
              setVisible(false);
            }}
          >
            Collection
          </NavLink>
          <NavLink
            className="py-2 pl-6 border"
            to="/about"
            onClick={() => {
              setVisible(false);
            }}
          >
            About
          </NavLink>
          <NavLink
            className="py-2 pl-6 border"
            to="/contact"
            onClick={() => {
              setVisible(false);
            }}
          >
            Contact
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
