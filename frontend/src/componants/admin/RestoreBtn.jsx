'use client'

import { axiosInstance } from "@/library/healper";
// import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { MdOutlineSettingsBackupRestore } from "react-icons/md";

export default function RestoreBtn({endpoint}) {
    // console.log('Delete endpoint:', endpoint);
    const router = useRouter();

    const restoreHandler = ()=>{
        axiosInstance.patch(endpoint)
        .then(
            (responce)=>{
                console.log(responce);
                if(responce.data.flag == 1){
                    router.refresh();
                    toast.success(responce.data.message);
                    
                }else{
                    toast.error(responce.data.message);
            }
        }
        ).catch(
            (error)=>{
                console.log(error);
                
            }
        )
    }

    return (
        <>
                <MdOutlineSettingsBackupRestore className='text-[blue] text-[19px]' onClick={restoreHandler} />
        </>
    )
}