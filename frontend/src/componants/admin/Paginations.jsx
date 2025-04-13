import React from 'react'
import { Pagination } from '@mui/material'

const Paginations = ({setPage, totalPages}) => {
    const changePage = (event, value) => {
        // console.log(value);
        setPage(value);
    }
  return (
    <div>
        <Pagination onChange={changePage} count={totalPages} color='primary' /> 
    </div>
  )
}

export default Paginations