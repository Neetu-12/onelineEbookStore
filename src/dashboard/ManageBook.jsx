import { Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ManageBook = () => {

  const [allBooks, setAllBooks] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/upload/all-books")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data); // Log the fetched data
        setAllBooks(data.data); // Update state with the fetched books
      })
      .catch((err) => {
        console.error("Error fetching books:", err); // Log the error
      });
  }, []);

  const handleDelete = (id) => {
    // console.log(id);
    fetch(`http://localhost:4000/upload/book/${id}`, {
      method: "DELETE"
    }).then(res => res.json()).then(data => {
      alert("Book is deleted successfully!")
      console.log(data.data);
      // setAllBooks(data.data)
    }).catch((err) => {
      console.log(err);
    })

  }

  // console.log(allBooks);
  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Manage Your Book Account</h2>
      {/* Table for book data */}
      <Table className='lg:w-[1180px]'>
        <Table.Head>
          <Table.HeadCell>No</Table.HeadCell>
          <Table.HeadCell>Book name</Table.HeadCell>
          <Table.HeadCell>Author name</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Prices</Table.HeadCell>
          <Table.HeadCell>
            <span>Edit or Manage</span>
          </Table.HeadCell>
        </Table.Head>
        {
          allBooks.map((book, index) => <Table.Body className="divide-y" key={book.id}>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {index + 1}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {book.bookTitle}
              </Table.Cell>
              <Table.Cell>{book.authorName}</Table.Cell>
              <Table.Cell>{book.category}</Table.Cell>
              <Table.Cell>₹80</Table.Cell>
              <Table.Cell>
                <Link to={`/admin/dashboard/edit-books/${book.id}`} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-5">
                  Edit
                </Link>
                <button onClick={() => handleDelete(book.id)} className='bg-red-600 px-4 py-1 font-semibold text-white rounded-sm hover:bg-sky-600'>Delete</button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
          )
        }
      </Table>
    </div>
  );
}

export default ManageBook;
