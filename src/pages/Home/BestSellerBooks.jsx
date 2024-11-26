import React, { useEffect, useState } from 'react'
import BookCards from '../../components/BookCards/BookCards';
import bookData from '../../bookData.json'

const BestSellerBooks = () => {
    const [books, setBooks] = useState([]);
    // let localServer = true;

    useEffect(() => {
        const fetchBooks = async () => {
            // console.log(bookData);
            try {
                const response = await fetch('http://localhost:4000/upload/all-books');
                console.log(response,'ress');
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setBooks(data.data.slice(0,8));
            } catch (error) {
                console.error('Error fetching data:', error);
                setBooks(bookData);  // Fallback to `bookData` in case of error
            }
        };
        fetchBooks();
    }, [bookData]);

    return (
        <div>
            <BookCards books={books} headline='Best Seller Books' />
        </div>
    )
}

export default BestSellerBooks;