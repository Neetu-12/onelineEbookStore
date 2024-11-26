import React, { useEffect, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { Button, Label, TextInput, Textarea } from "flowbite-react";

const EditBooks = () => {
    const params = useParams();
    const [loader, setLoader] = useState({});
    // const { bookTitle, authorName, category, imgUrl, bookPdfUrl } = useLoaderData();
    useEffect(() => {
        fetch(`http://localhost:4000/upload/books/${params.id}`, { method: "GET" })
            .then((response) => response.json())
            .then((result) => setLoader(result.data[0]))
            .catch((error) => console.error(error));
    }, [])
    // console.log(loader.imgUrl);
    // console.log(params);
    const bookCatories = [
        "Mystery",
        "Fiction",
        "Fantasy",
        "Horror",
        "Self-help",
        "History",
        "Autobiography",
        "Biography"
    ]

    const [selectedBookCategories, setSelectedBookCategories] = useState(bookCatories[0]);
    const handleChangeSelectedValue = (event) => {
        console.log(event.target.value);
        setSelectedBookCategories(event.target.value)
    }

    // handle book submission

    const handleUpdate = (event) => {
        event.preventDefault();
        const form = event.target;

        const bookTitle = form.bookTitle.value;
        const authorName = form.authorName.value;
        const imgUrl = form.imgUrl.value;
        const category = form.category.value;
        const bookDescription = form.bookDescription.value;
        const bookPdfUrl = form.bookPdfUrl.value;
        console.log(bookTitle, authorName, imgUrl, category, bookDescription, bookPdfUrl);

        const updatedBookObj = {
            bookTitle, authorName, imgUrl, category, bookDescription, bookPdfUrl

        }

        // Perform the fetch request
        fetch(`http://localhost:4000/upload/book/${params}`,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(updatedBookObj)
        })
            .then(res=> res.json()).then(data =>{
                alert("Book updated successfully!")
                form.reset();
            })


        // fetch("http://localhost:4000/upload/uploadBook/", {
        //     method: "POST", // Use POST for uploading
        //     headers: {
        //         "Content-Type": "application/json", // Inform the server about the data type
        //     },
        //     body: JSON.stringify(bookObj), // Convert data to JSON format

        // })
        //     .then((res) => {
        //         console.log(res);
        //         if (!res.ok) {
        //             throw new Error("Failed to upload book");
        //         }
        //         return res.json();
        //     })
        //     .then((data) => {
        //         alert("Book uploaded successfully!");
        //         console.log(data); // Log server response
        //     })
        //     .catch((error) => {
        //         console.error("Error uploading book:", error);
        //         alert("Error uploading book, please try again.");
        //     });

    };

    // console.log(loader);

    return (
        <div className='px-4 my-12 '>
            <h2 className='mb-8 text-3xl font-bold'>Update the Book data</h2>
            <form onSubmit={handleUpdate} className="lg:w-[1180px] flex flex-wrap  gap-4">
                {/* Need to remove parent div if I want large input width */}
                {/* first row */}
                {/* <div className='flex gap-8'> */}
                <div className='w-[48rem]'>
                    <div className="mb-2 block">
                        <Label htmlFor="bookTitle" value="Book Title" />
                    </div>
                    <TextInput id="bookTitle" name='bookTitle' type="text" placeholder="Book name" required defaultValue={loader.bookTitle} />
                </div>
                <div className='w-[48rem]'>
                    <div className="mb-2 block">
                        <Label htmlFor="authorName" value="Author Name" />
                    </div>
                    <TextInput id="authorName" name='authorName' type="text" placeholder="Author Name" required defaultValue={loader.authorName} />
                </div>
                {/* </div> */}
                {/* 2nd row  book imgUrl*/}
                {/* <div className='flex gap-8'> */}
                <div className='w-[48rem]'>
                    <div className="mb-2 block">
                        <Label htmlFor="imgUrl" value="imgUrl" />
                    </div>
                    <TextInput id="imgUrl" name='Book img Url' type="text" placeholder="Book Img url" required defaultValue={loader.imgUrl} />
                </div>
                {/* category */}
                <div className='w-[48rem]'>
                    <div className="mb-2 block">
                        <Label htmlFor="inputState" value="Book category" />
                    </div>
                    <select name="category" id="inputState" className='w-full rounded' value={selectedBookCategories} onChange={handleChangeSelectedValue}>
                        {
                            bookCatories.map((option) => <option key={option} value={option}>{option}</option>)
                        }
                    </select>
                </div>
                {/* </div> */}
                {/* dicription */}
                {/* <div className=''>
                    <div className="mb-2 block ">
                        <Label htmlFor="bookDescription" value="Book Description" />
                    </div>
                    <Textarea id="bookDescription" type="text" name='bookDescription' placeholder="Write your boom description..."
                        className='w-[48rem] h-32 p-2 border rounded'
                        required rows={5} defaultValue={loader}/>
                </div> */}
                <div className='w-[48rem]'>
                    <div className="mb-2 block">
                        <Label htmlFor="bookPdfUrl" value="Book pdf url" />
                    </div>
                    <TextInput id="bookPdfUrl" name='bookPdfUrl' type="text" placeholder="Book pdf url" required defaultValue={loader.bookPdfUrl} />
                </div>
                {/* <Button type="submit" className='mt-5'>Upload Book</Button> */}
                {/* <Button type="submit" className='bg-blue-700 px-6 py-2 text-white font-medium mt-5 w-1/2 lg:w-full border rounded'>Upload Book</Button> */}
                <Button
                    type="submit"
                    className='bg-blue-700 px-6 py-2 text-white font-medium mt-5 w-[48rem] border rounded'>
                    Update Book
                </Button>
            </form>
        </div>
    )
}

export default EditBooks;