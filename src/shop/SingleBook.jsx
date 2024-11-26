import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SingleBook = () => {
  const [loader, setLoader] = useState({});
  const params = useParams();
  // console.log(param);
  useEffect(() => {
    fetch(`http://localhost:4000/upload/books/${params.id}`, { method: "GET" })
      .then((response) => response.json())
      .then((result) => setLoader(result.data[0]))
      .catch((error) => console.error(error));
  }, [])
  console.log(loader);

  return (
    <div className='mt-28 px-4 lg:px-24'> 
      <img src={loader.imgUrl} alt="" className='h-96' />
    </div>
  )
}

export default SingleBook;