import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, Link, useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [bgColor, setBgColor] = useState("");

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  const location = useLocation();

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to={"/"}>
        <img src={assets.logo} alt="" className="w-60" />
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700" hidden />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700" hidden />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700" hidden />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700" hidden />
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        {/* Conditionally render the search icon only on the Collection page */}
        {location.pathname === "/collection" && (
          <img
            onClick={() => setShowSearch(true)}
            src={assets.search_icon}
            alt=""
            className="w-4 cursor-pointer"
          />
        )}
        <div className="group relative">
          <img
            onClick={() => (token ? null : navigate("/login"))}
            src={assets.profile_icon}
            alt=""
            className="w-4 cursor-pointer"
          />
          {/*Dropdown Menu from profile icon */}
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu pt-2 right-0">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p
                  onClick={() => {
                    navigate("/orders");
                  }}
                  className="cursor-pointer hover:text-black"
                >
                  Orders
                </p>
                <p onClick={logout} className="cursor-pointer hover:text-black">
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} alt="" className="w-4 min-w-4" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          alt=""
          className="w-5 cursor-pointer sm:hidden"
        />
      </div>
      {/*Sidebar menu for smaller screens */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => {
              setVisible(false);
              setBgColor("bg-black");
            }}
            className="flex items-center gap-4 p-3"
          >
            <img
              src={assets.dropdown_icon}
              alt=""
              className="h-4 rotate-180 "
            />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => {
              setVisible(false);
              setBgColor("bg-black");
            }}
            className={({ isActive }) =>
              `py-2 pl-6 border ${isActive ? "bg-black text-white" : ""}`
            }
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => {
              setVisible(false);
              setBgColor("bg-black");
            }}
            className={({ isActive }) =>
              `py-2 pl-6 border ${isActive ? "bg-black text-white" : ""}`
            }
            to="/collection"
          >
            Collection
          </NavLink>
          <NavLink
            onClick={() => {
              setVisible(false);
              setBgColor("bg-black");
            }}
            className={({ isActive }) =>
              `py-2 pl-6 border ${isActive ? "bg-black text-white" : ""}`
            }
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            onClick={() => {
              setVisible(false);
              setBgColor("bg-black");
            }}
            className={({ isActive }) =>
              `py-2 pl-6 border ${isActive ? "bg-black text-white" : ""}`
            }
            to="/contact"
          >
            Contact
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
