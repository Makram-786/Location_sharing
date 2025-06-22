import {useNavigate} from 'react-router-dom'

const Pagination = ({totalPages,currentPage}) => {
   const navigate = useNavigate()
    
  return (
    <div className='pagination-wrapper'>
  {[...Array(totalPages)].map((_, index) => {
    const page = index + 1;
    return (
      <button 
        key={page}
        onClick={() => navigate(`/?page=${page}`)}
        className={page === currentPage ? 'active pagination-btn' : 'pagination-btn'}
      >
        {page}
      </button>
    );
  })}
    </div>
  )
}

export default Pagination