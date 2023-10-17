import { createContext, useEffect, useState } from "react";

export const CategoryContext = createContext()

// export const CategoryProvider = ({children}) => {
//     const [categories, setCategories] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
//     const [totalPages, setTotalPages] = useState(1)

//     useEffect(() => {
//         const itemsPerPage = 5;
//         const newTotalPages = Math.ceil(categories.length / itemsPerPage);
//         setTotalPages(newTotalPages);

//     // Kiểm tra nếu currentPage vượt quá totalPages sau khi tính toán, thì đặt currentPage lại thành totalPages
//         if(currentPage > totalPages) {
//             setCurrentPage(newTotalPages);
//         }
//     }, [categories, currentPage])
//     return (
//         <CategoryContext.Provider value={[{ categories, setCategories, currentPage , totalPages, setCurrentPage}]}>
//             {children}
//         </CategoryContext.Provider>
//     )
// }