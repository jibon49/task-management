import { NavLink, Outlet } from "react-router-dom";
import logo from "/logo.png"
import { FaHome, FaListUl, FaMedal, FaPen, FaUser, FaUsers } from "react-icons/fa";
import { IoIosAlert, IoIosDocument, IoMdLogOut } from "react-icons/io";
import { FaBullhorn } from "react-icons/fa6";
import { useContext } from "react";
import { AuthContext } from "../AuthProviders/AuthProviders";

const Dashboard = () => {

    const { user, logOut } = useContext(AuthContext)

    const handleLogout=()=>{
        logOut()
    }

    return (
        <div className="flex">
             <div className="drawer lg:drawer-open ">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-row md:flex-col items-center  justify-start md:justify-normal">
                    {/* Page content here */}
                    <div>
                        <label htmlFor="my-drawer-2" className="btn drawer-button lg:hidden"><FaListUl></FaListUl></label>
                    </div>
                    <div className="w-full p-10">
                        <Outlet></Outlet>
                    </div>

                </div>
                <div className="drawer-side ">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-64 min-h-full bg-blue-300 text-black">
                        <img className="mb-10" src={logo} alt="" />
                        <hr className="mb-10" />
                        {/* Sidebar content here */}
                        
                                <>
                                    <li>
                                        <NavLink to='my-profile'>
                                            <FaUser></FaUser> My Profile
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='create-task'>
                                            <FaPen></FaPen> Create task
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='my-task'>
                                            <IoIosDocument></IoIosDocument> My task
                                        </NavLink>
                                    </li>
                                </>
                        
                        <hr className="my-10" />
                        <>
                            <li><NavLink to='/'
                            ><FaHome></FaHome> Home</NavLink></li>

                            <li><NavLink onClick={handleLogout}
                            ><IoMdLogOut></IoMdLogOut> Logout</NavLink></li>

                        </>

                    </ul>

                </div>

            </div>


        </div >
    );
};

export default Dashboard;