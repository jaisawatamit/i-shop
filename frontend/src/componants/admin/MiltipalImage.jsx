'use client';
import { axiosInstance } from '@/library/healper';
import { useState } from 'react';
import { FaTimes, FaTrash } from 'react-icons/fa';
import { GrGallery } from 'react-icons/gr';
import { toast } from 'react-toastify';
export default function MultipalImagePage({ other_images, name, product_id }) {

  const [images, setImages] = useState(other_images);
  const [flag, setFlag] = useState(false);

  const deletebutton = (index)=>{

    axiosInstance.delete(`product/delete-other-image/${product_id}/${index}`)
    .then(response=>{

      if(response.data.flag == 1){
        toast.success(response.data.message);
       setImages(response.data.other_images)
      }else{
        toast.error(response.data.message);
      }
      }
    ).catch(err=>{
      console.log(err); 
    }
    )
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const other_images = e.target.other_images.files;
    const formData = new FormData();
    for (let otherImage of other_images) {
      formData.append('other_images', otherImage);
    }
    axiosInstance.post(`product/upload/other-images/${product_id}`, formData)
      .then(response => {
        if (response.data.flag == 1) {
          toast.success(response.data.message);
          setImages(response.data.other_images);
          e.target.reset();
        } else {
          toast.error(response.data.message);
        }
      }
      ).catch(err => {
        console.log(err);
      }

      )
  }
  return (
    <>
      <div className={`fixed  top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 ${flag ? "flex" : "hidden"} flex-col items-center justify-center z-50 `}>
        <div className="bg-white shadow p-3 w-[60%] h-[60%] ">
          <div className='flex justify-center items-center gap-3'>
            <h3 className='font-bold'>other image of {name}</h3>
            <FaTimes onClick={() => setFlag(false)} className='cursor-pointer' />
          </div>

          {
            images.length === 0 ? <h3 className='text-center text-red-500'>No other image found</h3> :
              <div className="flex gap-4">
                {
                  images.map(
                    (image, index) => (
                      <div>
                        <div className='border  p-3'key={index}>
                          <img key={index} src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/product/other-images/${image}`} width={150} alt="" />
                        </div>
                        <FaTrash onClick={()=> deletebutton(index)} />
                      </div>
                    )
                  )
                }
              </div>
          }
          <form onSubmit={submitHandler}>
            <div className="bg-white shadow w-[60%] flex gap-2">
              <input type="file" name="other_images" multiple className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition" />
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Upload</button>
            </div>
          </form>
        </div >

      </div>
      <GrGallery className="cursor-pointer" onClick={() => setFlag(true)} />
    </>
  );
}
