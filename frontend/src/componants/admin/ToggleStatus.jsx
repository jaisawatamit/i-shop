'use client'
import { axiosInstance } from "@/library/healper"
import { useState } from "react"
import { toast } from "react-toastify"

export default function ToggleStatus({ current_status, endpoint }) {
    const [status, setStatus] = useState(current_status)

    const toggleStatusHandler = () => {
        axiosInstance.patch(endpoint + !status)
            .then(
                (response) => {
                    console.log(response);
                    if (response.data.flag == 1) {
                        setStatus(!status);
                        toast.success(response.data.message);
                    }
                })
            .catch(
                (error) => {
                    console.log(error);
                })
    }
    return (
        <>
            <span
                onClick={toggleStatusHandler}
                className={`relative inline-block px-3 py-1 rounded-lg cursor-pointer font-semibold ${status ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                    }`}
            >
                {status ? 'Active' : 'Inactive'}
            </span>
        </>
    )
}