"use client";
import {
  axiosInstance,
  capitalizeWords,
  formatDate,
  getKeyByValue,
} from "@/library/healper";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";
import { jsPDF } from "jspdf";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // Default styles
import "react-date-range/dist/theme/default.css"; // Theme
import { format } from "date-fns";

const Transaction = () => {
  const router = useRouter();
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({
    dateRange: null,
    orderId: "",
    transactionId: "",
    name: "",
    email: "",
    status: "",
  });
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateChange = (ranges) => {
    setDateRange([ranges.selection]);
    setFilters({
      ...filters,
      dateRange: {
        startDate: format(ranges.selection.startDate, "yyyy-MM-dd"),
        endDate: format(ranges.selection.endDate, "yyyy-MM-dd"),
      },
    });
  };

  const generatePDF = (transaction) => {
    const doc = new jsPDF();
    doc.setFont("helvetica");
    doc.setFontSize(14);
    doc.text("Transaction Receipt", 20, 10);
    doc.text(`Transaction ID: ${transaction._id}`, 20, 20);
    doc.setFontSize(12);
    doc.text(`Name: ${transaction.user_id.name}`, 20, 30);
    doc.text(`Email: ${transaction.user_id.email}`, 20, 35);
    doc.text(`Contact: ${transaction.user_id.contact}`, 20, 40);
    doc.text(`Order ID: ${transaction.order_id._id}`, 20, 45);
    doc.text(`Total: $${transaction.order_id.final_total}`, 20, 50);
    doc.text(
      `Status: ${payment_status[transaction.order_id.payment_status]}`,
      20,
      55
    );
    doc.save("transaction.pdf");
  };

  const fetchData = async () => {
    const response = await axiosInstance.get("/transaction");
    setTransactions(response.data.transactions);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value.trim() });
  };

  const payment_status = {
    1: "Pending",
    2: "Success",
    3: "Failed",
    4: "Refund Init",
    5: "Refunded",
  };

  const searchHandler = async () => {
    setShowCalendar(false);
    const searchQuery = new URLSearchParams();
    if (filters.orderId) searchQuery.append("order_id", filters.orderId);
    if (filters.transactionId)
      searchQuery.append("transaction_id", filters.transactionId);
    if (filters.name) searchQuery.append("name", filters.name);
    if (filters.email) searchQuery.append("email", filters.email.toLowerCase());
    if (filters.status)
      searchQuery.append(
        "status",
        getKeyByValue(payment_status, filters.status)
      );
    if (filters.dateRange) {
      searchQuery.append("startDate", filters.dateRange.startDate);
      searchQuery.append("endDate", filters.dateRange.endDate);
    }
    const queryString = searchQuery.toString();
    // console.log("Query String:", queryString);
    const response = await axiosInstance.get(`/transaction?${queryString}`);
    setTransactions(response.data.transactions);
  };

  return (
    <div className="mt-8 px-5">
      {/* Filters Section */}
      <div className="grid grid-cols-3 gap-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 rounded-lg shadow-lg mb-6 relative text-white">
        <input
          type="text"
          name="orderId"
          placeholder="Order ID"
          className="p-3 border-none rounded-md bg-white/10 backdrop-blur-sm focus:ring-2 focus:ring-white text-white placeholder:text-white/70"
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="transactionId"
          placeholder="Transaction ID"
          className="p-3 border-none rounded-md bg-white/10 backdrop-blur-sm focus:ring-2 focus:ring-white text-white placeholder:text-white/70"
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="p-3 border-none rounded-md bg-white/10 backdrop-blur-sm focus:ring-2 focus:ring-white text-white placeholder:text-white/70"
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          className="p-3 border-none rounded-md bg-white/10 backdrop-blur-sm focus:ring-2 focus:ring-white text-white placeholder:text-white/70"
          onChange={handleFilterChange}
        />
        <select
          name="status"
          className="p-3 border-none rounded-md bg-white/10 backdrop-blur-sm focus:ring-2 focus:ring-white text-white placeholder:text-white/70"
          onChange={handleFilterChange}
        >
          <option value="">Select Payment Status</option>
          <option value="Success">Success</option>
          <option value="Pending">Pending</option>
        </select>
        {/* Date Range Picker */}
        <div className="relative">
          <button
            className="p-3 w-full text-left rounded-md bg-white/10 backdrop-blur-sm focus:ring-2 focus:ring-white text-white"
            onClick={() => setShowCalendar(!showCalendar)}
          >
            {`${format(dateRange[0].startDate, "yyyy-MM-dd")} to ${format(
              dateRange[0].endDate,
              "yyyy-MM-dd"
            )}`}
          </button>
          {showCalendar && (
            <div className="absolute z-50 bg-white shadow-md p-2 mt-2 rounded-lg">
              <DateRange
                editableDateInputs={true}
                onChange={handleDateChange}
                moveRangeOnFirstSelection={false}
                ranges={dateRange}
              />
            </div>
          )}
        </div>
        <div className="flex gap-4 items-center justify-end col-span-3">
          <button
            onClick={searchHandler}
            className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-indigo-600 hover:to-pink-600 transition duration-300 ease-in-out shadow-md"
          >
            Search
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg leading-normal overflow-hidden shadow-lg bg-white">
          <thead className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
            <tr>
              <th className="p-4 text-start text-sm font-semibold">S.No</th>
              <th className="p-4 text-start text-sm font-semibold">
                Transaction
              </th>
              <th className="p-4 text-start text-sm font-semibold">Customer</th>
              <th className="p-4 text-start text-sm font-semibold">Amount</th>
              <th className="p-4 text-start text-sm font-semibold">Status</th>
              <th className="p-4 text-start text-sm font-semibold">Payment ID</th>
              <th className="p-4 text-start text-sm font-semibold">Date</th>
              <th className="p-4 text-start text-sm font-semibold">Download</th>
            </tr>
          </thead>
          <tbody>
            {transactions?.length === 0 ? (
              <tr className="text-center w-full">
                <td
                  colSpan="8"
                  className="py-6 text-sm font-semibold text-gray-500"
                >
                  No transactions!
                </td>
              </tr>
            ) : (
              transactions?.map((transaction, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50 transition duration-200 ease-in-out"
                >
                  <td className="p-4 text-sm">{index + 1}</td>
                  <td className="p-4 text-sm">
                    <span className="font-bold text-gray-800">
                      Transaction ID:
                    </span>{" "}
                    {transaction?._id}
                    <br />
                    <span className="font-bold text-gray-800">Order ID:</span>{" "}
                    {transaction?.order_id?._id}
                  </td>
                  <td className="p-4 text-sm">
                    <span className="font-bold text-gray-800">
                      {transaction?.user_id?.name}
                    </span>
                    <br />
                    {transaction?.user_id?.email}
                    <br />
                    +91-{transaction?.user_id?.phone}
                  </td>
                  <td className="p-4 text-sm">${transaction?.order_id?.final_total}</td>
                  <td className="p-4 text-sm">
                    {payment_status[transaction?.order_id?.payment_status]}
                  </td>
                  <td className="p-4 text-sm">{transaction?.razorpay_payment_id}</td>
                  <td className="p-4 text-sm">{formatDate(transaction?.createdAt)}</td>
                  <td className="p-4 text-sm">
                    <FaDownload
                      onClick={() => generatePDF(transaction)}
                      className="cursor-pointer text-indigo-500 hover:text-indigo-700 transition duration-300 ease-in-out"
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transaction;