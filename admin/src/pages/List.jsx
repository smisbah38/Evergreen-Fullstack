// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { backendUrl, currency } from "../App";
// import { toast } from "react-toastify";

// const List = ({ token }) => {
//   const [list, setList] = useState([]);

//   const fetchList = async () => {
//     try {
//       const response = await axios.get(backendUrl + "/api/product/list");
//       if (response.data.success) {
//         console.log(response.data.products);
//         setList(response.data.products);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   const removeProduct = async (id) => {
//     try {
//       const response = await axios.post(
//         backendUrl + "/api/product/remove",
//         { id },
//         { headers: { token } }
//       );

//       if (response.data.success) {
//         toast.success(response.data.message);
//         await fetchList();
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     fetchList();
//   }, []);

//   return (
//     <>
//       <p className="mb-2 text-lg font-semibold">All Products List</p>
//       <div className="flex flex-col gap-4">
//         {/* Table header (visible only on medium screens and above) */}
//         <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-4 border bg-gray-100 text-sm font-bold">
//           <span>Image</span>
//           <span>Name</span>
//           <span>Category</span>
//           <span>Price</span>
//           <span className="text-center">Action</span>
//         </div>

//         {/* Product List */}
//         {list.map((item, index) => (
//           <div
//             className="grid grid-cols-1 md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-4 py-2 px-4 border text-sm bg-white rounded-md shadow-sm"
//             key={index}
//           >
//             {/* Image */}
//             <div className="flex justify-center md:justify-start">
//               <img
//                 className="w-16 h-16 object-cover rounded-md"
//                 src={item.image[0]}
//                 alt={item.name}
//               />
//             </div>

//             {/* Product Details */}
//             <div className="text-center md:text-left">
//               <p className="font-semibold">{item.name}</p>
//               <p className="text-gray-500 md:hidden">{item.category}</p>
//             </div>

//             {/* Category (hidden on small screens) */}
//             <p className="hidden md:block">{item.category}</p>

//             {/* Price */}
//             <p className="text-center md:text-left font-medium">
//               {currency}
//               {item.price}
//             </p>

//             {/* Action */}
//             <div className="flex justify-center md:justify-center">
//               <button
//                 onClick={() => removeProduct(item._id)}
//                 className="bg-red-500 text-white text-sm px-3 py-1 rounded-md hover:bg-red-600 transition"
//               >
//                 Remove
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default List;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        console.log(response.data.products);
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  // Capitalize words utility function
  const capitalizeWords = (str) => {
    if (!str) return "";
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <>
      <p className="mb-2 text-lg font-semibold">All Products List</p>
      <div className="flex flex-col gap-4">
        {/* Table header (visible only on medium screens and above) */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-4 border bg-gray-100 text-sm font-bold">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span className="text-center">Action</span>
        </div>

        {/* Product List */}
        {list.map((item, index) => (
          <div
            className="grid grid-cols-1 md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-4 py-2 px-4 border text-sm bg-white rounded-md shadow-sm"
            key={index}
          >
            {/* Image */}
            <div className="flex justify-center md:justify-start">
              <img
                className="w-16 h-16 object-cover rounded-md"
                src={item.image[0]}
                alt={item.name}
              />
            </div>

            {/* Product Details */}
            <div className="text-center md:text-left">
              <p className="font-semibold">{item.name}</p>
              <p className="text-gray-500 md:hidden">
                {capitalizeWords(item.category)}
              </p>
            </div>

            {/* Category (hidden on small screens) */}
            <p className="hidden md:block">{capitalizeWords(item.category)}</p>

            {/* Price */}
            <p className="text-center md:text-left font-medium">
              {currency}
              {item.price}
            </p>

            {/* Action */}
            <div className="flex justify-center md:justify-center">
              <button
                onClick={() => removeProduct(item._id)}
                className="bg-red-500 text-white text-sm px-3 py-1 rounded-md hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
