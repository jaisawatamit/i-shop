import { useState } from "react";
import { FaTh, FaBars } from "react-icons/fa";

const SortFilterBar = ({ totalItems, onSortChange, onItemsPerPageChange, onViewChange }) => {
    const [sortBy, setSortBy] = useState("name");
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [viewType, setViewType] = useState("grid"); // 'grid' or 'list'

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
        onSortChange(e.target.value);
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(parseInt(e.target.value));
        onItemsPerPageChange(parseInt(e.target.value));
    };

    const handleViewChange = (type) => {
        setViewType(type);
        onViewChange(type);
    };

    return (
        <div className="flex items-center justify-between bg-gray-100 p-3 rounded-md shadow-sm">
            {/* Total Items */}
            <span className="text-gray-700 text-sm">{totalItems} Items</span>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
                <span className="text-gray-600 text-sm">Sort By</span>
                <select
                    value={sortBy}
                    onChange={handleSortChange}
                    className="border rounded-md px-2 py-1 text-sm bg-white shadow-sm focus:ring focus:ring-blue-300"
                >
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                    <option value="rating">Rating</option>
                </select>
            </div>

            {/* Items Per Page Dropdown */}
            <div className="flex items-center gap-2">
                <span className="text-gray-600 text-sm">Show</span>
                <select
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                    className="border rounded-md px-2 py-1 text-sm bg-white shadow-sm focus:ring focus:ring-blue-300"
                >
                    <option value="6">6</option>
                    <option value="12">12</option>
                    <option value="24">24</option>
                </select>
            </div>

            {/* View Toggle Buttons */}
            <div className="flex items-center gap-2">
                <button
                    onClick={() => handleViewChange("grid")}
                    className={`p-2 border rounded-md ${viewType === "grid" ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`}
                >
                    <FaTh />
                </button>
                <button
                    onClick={() => handleViewChange("list")}
                    className={`p-2 border rounded-md ${viewType === "list" ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`}
                >
                    <FaBars />
                </button>
            </div>
        </div>
    );
};

export default SortFilterBar;
