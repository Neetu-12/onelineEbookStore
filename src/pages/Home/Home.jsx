import React from 'react';
// import { Outlet } from 'react-router-dom';
// import Navbar from '../../components/Navbar/Navbar'
import Banner from '../../components/Banner/Banner';
import BestSellerBooks from './BestSellerBooks';
import FavBook from './FavBook';
import PromoBanner from './PromoBanner';
import OtherBooks from './OtherBooks';
import Review from './Review';

const Home = () => {
  return (
    <>
      <Banner />
      <BestSellerBooks/>
      {/* <Navbar /> */}
      <FavBook/>
      <PromoBanner/>
      <OtherBooks/>
      <Review/>
    </>
  )
}

export default Home;