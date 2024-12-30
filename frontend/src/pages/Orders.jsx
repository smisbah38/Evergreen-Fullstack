import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);

  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {}
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      <div className="">
        {orderData.map((item, index) => (
          <div
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            key={index}
          >
            <div className="flex items-start gap-6 text-sm">
              <img className="w-16 sm:w-16" src={item.image[0]} alt="" />
              <div>
                <p className="sm:text-base font-medium">{item.name}</p>
                <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                  <p className="font-medium text-sm sm:text-base">
                    {currency}
                    {item.price}
                  </p>
                  <p className="text-sm sm:text-base font-medium">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-sm sm:text-base font-medium">
                    Size: {item.size}
                  </p>
                </div>
                <p className="mt-2 flex">
                  <p className="font-semibold">Date: &nbsp;</p>{" "}
                  <span> {new Date(item.date).toDateString()}</span>
                </p>
                <p className="mt-2 flex">
                  <p className="font-semibold">Payment: &nbsp;</p>{" "}
                  <span>{item.paymentMethod}</span>
                </p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center">
                <p className="min-w-2 h-2 rounded-full bg-green-600 mx-2"></p>
                <p className="text-sm md:text-base">{item.status}</p>
              </div>
            </div>
            <button
              onClick={loadOrderData}
              className="border px-4 py-2 text-sm font-medium rounded-sm"
            >
              Track Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
