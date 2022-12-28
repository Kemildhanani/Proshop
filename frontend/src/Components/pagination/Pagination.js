import "./Pagination.css"
// import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { BsArrowRight,BsArrowLeft } from 'react-icons/bs';

const Pagination = ({page, pages, changePage}) => {

// let middlePagination;

// if(pages <= 5) {
//     middlePagination = [...Array(pages)].map((_, idx) => (
//         <button
//         key={idx + 1}
//         onClick={() => changePage(idx + 1)}
//         disabled={page === idx + 1}
//         className="btn pButton btn-dark"
//         >
//         {idx + 1}
//         </button>
//     ))
// }else{
//     const startValue = Math.floor((page - 1) / 5) *5;

//     middlePagination=(
//         <>
//             {[...Array(10)].map((_, idx)=>{
//                 <button
//                     className="btn pButton btn-dark"
//                     key={startValue + idx + 1}
//                     disbaled={page === startValue + idx + 1}
//                     onClick={() => changePage(startValue + idx + 1)}
//                 >
//                 {startValue + idx + 1}
//                 </button>
//             })}
//             <button className="pButton">...</button>
//             <button 
//             className="btn pButton btn-dark"
//             onClick={() => changePage(pages)}>{pages}</button>
//         </>
//     )
//     if(page > 5) {
//         if(pages - page >= 5){
//             middlePagination=(
//                 <>
//                   <button className="pButton" onClick={() => changePage(1)}>1</button>  
//                   <button className="pButton">...</button>  
//                   <button className="pButton" onClick={() => changePage(startValue)}>{startValue}</button>  
//                 {[...Array(10)].map((_, idx)=>{
//                     <button
//                         className="pButton"
//                         key={startValue + idx + 1}
//                         disbaled={page === startValue + idx + 1}
//                         onClick={() => changePage(startValue + idx + 1)}
//                     >
//                     {startValue + idx + 1}
//                     </button>
//                 })}
//                 <button className="pButton">...</button>
//                 <button onClick={() => changePage(pages)}>{pages}</button>
//                 </>
//             )
//         }else{
//             let amountLeft = pages-page + 5;
//             middlePagination=(
//                 <>
//             <button className="pButton" onClick={() => changePage(1)}>1</button>  
//             <button className="pButton">...</button>  
//             <button onClick={() => changePage(startValue)}>{startValue}</button>  
//           {[...Array(amountLeft)].map((_, idx)=>{
//               <button
//               className="btn pButton btn-outline-dark"
//               key={startValue + idx + 1}
//               style={pages < startValue + idx + 1}
//               disbaled={page === startValue + idx + 1 ? {display: "none"} : null
//             }
//             onClick={() => changePage(startValue + idx + 1)}
//             >
//               {startValue + idx + 1}
//               </button>
//           })}
//           <button className="btn pButton btn-dark">...</button>
//           <button onClick={() => changePage(pages)}>{pages}</button>
//           </>
//           )
//         }
//     }
// }




  return pages > 1 && (
          <>
      <div className="pagination">
          <div>

          <button 
            onClick={() => changePage(page => page - 1)}
            className="pagination__prev btn-block align-center"
            disabled={page === 1}>
                        <BsArrowLeft/>
                {/* &#171; */}
            </button>
                </div>
          {/* {middlePagination} */}
          <div className="pt-2" >
          <h6 className="curPages">Page <strong>{page}</strong> of <strong>{pages}</strong></h6>
          </div>
          <div>

          <button 
            onClick={() => changePage(page => page + 1)}
            className="pagination_next btn-block align-center"
            disabled={page === pages}
            >
            <BsArrowRight  />
              {/* &#187; */}
            </button>
            </div>
      </div>


</>
)
}

export default Pagination 