import {Route, Routes, useLocation } from "react-router-dom";
import 'flowbite';
import Home from './pages/Home/Home';
import About from './pages/About/About'
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Headers from "./components/Header/Headers";
import Blog from "./components/Blog/Blog";
import './index.css';
import './App.css'
import BookCards from "./components/BookCards/BookCards";
import SingleBook from "./shop/SingleBook";
import Shop from "./shop/Shop";
// import DashboardLayOut from "./dashboard/DashboardLayOut";
import Dashboard from "./dashboard/Dashboard";
import UserDasbord from "./dashboard/UserDasbord.jsx";
import UploadBook from "./dashboard/UploadBook";
import ManageBook from "./dashboard/ManageBook";
import EditBooks from "./dashboard/EditBooks";
import SideBar from './dashboard/SideBar';
import Singup from "./dashboard/Singup";
import Login from "./dashboard/Login";

function App() {
  const adminRoutes = [
    { path: "/admin/dashboard/", element: Dashboard },
    { path: "/admin/dashboard/upload", element: UploadBook },
    { path: "/admin/dashboard/manage", element: ManageBook },
    { path: "/admin/dashboard/edit-books/:id", element: EditBooks }
  ];

  const location = useLocation();
  const isAdmin = location.pathname.split("/")[1] === "admin";
  // console.log(location);

  return (
    <>
      <div className="">
        {/* <div>
      {<Navbar />}
      </div> */}
        {/* <div className="flex justify-center"> */}
        {/* </div> */}
        <div className={isAdmin ? "flex" : "min-h-16"}>
          <div className="" >
            {/* {isAdmin && <SideBar />} */}
            {/* <adminRoutes /> */}
            {isAdmin ? <SideBar /> : <Navbar />}
          </div>
          <div className="">
            <Routes>
              {/* <Outlet/> */}
              {/* <Route path="/" element={<Home />} /> */}
              <Route index element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/singup" element={<Singup />} />
              <Route path="/book/:id" element={<BookCards />} />
              <Route path="/header" element={<Headers />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/upload/book/:id" element={<SingleBook />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/userDasbord" element={<UserDasbord />} />
              {/* <Route path="/admin/dashboard" element={<DashboardLayOut />} /> */}
              {adminRoutes.map((route, index) => {
                return <Route path={route.path} key={index} element={<route.element />} />
              })}
              {/* <Route path="/admin/dashboard" element={<Dashboard />} /> */}
              {/* <Route path="/admin/dashboard/upload" element={<UploadBook />} />
          <Route path="/admin/dashboard/manage" element={<ManageBook />} />
          <Route path="/admin/dashboard/edit-books/:id" element={<EditBooks />} /> */}
            </Routes>

          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;

