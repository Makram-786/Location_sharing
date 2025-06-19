import {useNavigate} from 'react-router-dom'

const Pagination = ({totalPages,currentPage}) => {
   const navigate = useNavigate()
    
  return (
    <div>
  {[...Array(totalPages)].map((_, index) => {
    const page = index + 1;
    return (
      <button
        key={page}
        onClick={() => navigate(`/?page=${page}`)}
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