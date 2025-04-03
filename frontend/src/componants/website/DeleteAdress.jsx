// 'use client'

// import { axiosInstance } from "@/library/healper";
// import { FaTrash } from "react-icons/fa";
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";

// export default function DeleteAdress({endpoint}) {
//     const router = useRouter();
//     const deleteHandler = ()=>{
//         // console.log('Delete endpoint:', endpoint);
//         axiosInstance.delete(endpoint)
//         .then(
//             (responce)=>{
//                 console.log(responce);
//                 if(responce.data.flag == 1){
//                 console.log(responce.data.flag);
//                     router.refresh();
//                     toast.success(responce.data.message);
//                 }else{
//                     toast.error(responce.data.message);
//             }
//         }
//         ).catch(
//             (error)=>{
//                 console.log(error.message.data);
//                 toast.error(error.data.message);
//             }
//         )
//     }

//     return (
//         <>
//                 <FaTrash className='text-[red]' onClick={deleteHandler} />
//         </>
//     )
// }