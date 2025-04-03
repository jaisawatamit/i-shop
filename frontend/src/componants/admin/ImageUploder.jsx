'use client'

import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { MdMultipleStop } from 'react-icons/md'

export default function ImageUploder({isMulti, onImageSelect, imageUrl }) {

    const [previewSrc, setPreviewSrc] = useState( imageUrl ?? null);
    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        if(file){
            onImageSelect(file);
            const reader = new FileReader();
            reader .readAsDataURL(file);
            reader.onloadend = (e) => {
                setPreviewSrc(e.target.result);
            };
        }
        
        // Do something with the files
      }, [])

      const removeHandler = (e)=>{
        e.stopPropagation();
        onImageSelect(null);
        setPreviewSrc(null);
      }
      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    
      return (
        <div  className='flex justify-center cursor-pointer border p-3 hover:shadow' {...getRootProps()}>
          <input {...getInputProps() }  multiple={isMulti} accept={"image/png, image/jpeg, image/jpg"}  />
          { previewSrc ==null ? isDragActive ?
              <p>Drop the files here ...</p> : 
              <p>Drag 'n' drop some files here, or click to select files</p>
              :<div className='flex items-center flex-col gap-3'>
                <img width={250} src={previewSrc}/>
                <button onClick={removeHandler} className='hover:bg-black hover:text-white'>Remove</button>
              </div>
          }
        </div>
      )
}

