import { PageHeader } from "@/componants/admin/PageHeader";
import Pagination from "@/componants/admin/Pagination";
import { getOrders } from "@/library/api-colls";
import { formatDate } from "@/library/healper";
import React from "react";

const Orders = async ({ searchParams }) => {
  let limit = searchParams.limit ?? 5;
  let page = searchParams.page ?? null;
  const response = await getOrders(page, limit);
  const payment_status = {
    1: "Pending",
    2: "Success",
    3: "Failed",
    4: "Refund Init",
    5: "Refunded",
  };

  const order_status = {
    0: "Pending",
    1: "Placed",
    2: "Packed",
    3: "Dispatched",
    4: "Shipped",
    5: "OFD",
    6: "Delivered",
  };

  return (
    <div className="container min-h-screen mx-auto px-4 sm:px-8 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
      <div className="py-8">
        <PageHeader
          breadcrums={["Dashboard", "Orders"]}
          button={{ url: "/admin/orders/" }}
        />
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow-lg rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr className="text-center">
                  <th className=" border-b-2 border-blue-200 bg-blue-500 text-center text-xs font-semibold text-white uppercase tracking-wider">
                    S.No
                  </th>
                  <th className="px-5 py-3 border-b-2 border-blue-200 bg-blue-500 text-center text-xs font-semibold text-white uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-5 py-3 border-b-2 border-blue-200 bg-blue-500 text-center text-xs font-semibold text-white uppercase tracking-wider">
                    Customer
                  </th>
                  <th className=" border-b-2 border-blue-200 bg-blue-500 text-center text-xs font-semibold text-white uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-5 py-3 border-b-2 border-blue-200 bg-blue-500 text-center text-xs font-semibold text-white uppercase tracking-wider">
                    Total
                  </th>
                  <th className=" border-b-2 border-blue-200 bg-blue-500 text-center text-xs font-semibold text-white uppercase tracking-wider">
                    Mode
                  </th>
                  <th className="px-5 py-3 border-b-2 border-blue-200 bg-blue-500 text-center text-xs font-semibold text-white uppercase tracking-wider">
                    Payment Status
                  </th>
                  <th className="px-5 py-3 border-b-2 border-blue-200 bg-blue-500 text-center text-xs font-semibold text-white uppercase tracking-wider">
                    Order Status
                  </th>
                  <th className="border-b-2 border-blue-200 bg-blue-500 text-center text-xs font-semibold text-white uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {response.orders.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="py-4 text-center text-xl font-semibold text-gray-700 bg-white">
                      No Orders Found!
                    </td>
                  </tr>
                ) : (
                  response.orders.map((order, index) => (
                    <tr key={index} className="border-b text-center border-gray-200 text-sm hover:bg-gray-100">
                      <td className="px-5 py-4 bg-green-100">{index + 1}</td>
                      <td className="px-3 py-4 bg-yellow-100">{order?._id}</td>
                      <td className="px-5 py-4 bg-blue-100 text-left">
                        <span className="text-gray-900 font-bold">{order?.user_id?.name}</span>
                        <br />
                        {order?.user_id?.email}
                        <br />
                        +91-{order?.user_id?.phone}
                      </td>
                      <td className=" bg-purple-100">{order?.products?.length}</td>
                      <td className="px-5 py-4 bg-red-100">$ {order?.final_total}</td>
                      <td className="px-5 py-4 bg-green-200">
                        {order?.payment_method === 1 ? "COD" : "Razorpay"}
                      </td>
                      <td className="px-5 py-4 bg-blue-200">{payment_status[order?.payment_status]}</td>
                      <td className="px-5 py-4 bg-orange-200">{order_status[order?.order_status]}</td>
                      <td className="px-5 py-4 bg-gray-200">{formatDate(order?.createdAt)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-5">
          <Pagination {...response} />
        </div>
      </div>
    </div>
  );
};

export default Orders;
