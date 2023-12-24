import { FaFacebookF, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="mt-10">
            <footer className="footer footer-center p-20 bg-gradient-to-b from-blue-500 to-white text-base-content  rounded">
                <nav className="grid grid-flow-col gap-4 font-bold">
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">FAQ</a>
                    <a className="link link-hover">Review</a>
                </nav>
                <nav>
                    <div className="grid grid-flow-col gap-4">
                        <Link className="text-2xl"><FaFacebookF></FaFacebookF></Link>
                        <Link className="text-2xl"><FaTwitter></FaTwitter></Link>
                        <Link className="text-2xl"><FaLinkedin></FaLinkedin></Link>
                    </div>
                </nav>
                <aside>
                    <p>Copyright © 2023 - All right reserved by TaskNest Industries Ltd</p>
                </aside>
            </footer>
        </div>
    );
};

export default Footer;