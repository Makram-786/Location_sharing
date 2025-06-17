import React from 'react'

const Pagination = ({totalPages,currentPage,setCurrentPage}) => {
   
    
  return (
    <div>
  {[...Array(totalPages)].map((_, index) => {
    const page = index + 1;
    return (
      <button
        key={page}
        onClick={() => setCurrentPage(page)}
        className={page === currentPage ? 'active' : ''}
      >
        {page}
      </button>
    );
  })}
    </div>
  )
}

export default Pagination