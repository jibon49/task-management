import { useEffect, useContext } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { AuthContext } from '../../AuthProviders/AuthProviders';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../Hooks/AxiosPublic/useAxiosPublic';
import axios from 'axios';
import { updateProfile } from 'firebase/auth';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const axiosPublic = useAxiosPublic();
    const { createUser, user, loading } = useContext(AuthContext);
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    const location = useLocation();
    const navigate = useNavigate();

    const handleRegister = async (data) => {
        const email = data.email;
        const password = data.password;
        const name = data.name;
        let photoUrl = data.photoUrl;
    
        if (password.length > 6) {
            if (passwordRegex.test(password)) {
                const imageFile = { image: data.photoUrl[0] };
                const res = await axios.post(image_hosting_api, imageFile, {
                    headers: {
                        'content-type': 'multipart/form-data',
                    },
                });
    
                if (res.data.success) {
                    photoUrl = res.data.data.display_url;
                }
    
                try {
                    const result = await createUser(email, password);
                    const loggedUser = result.user;
    
                    updateProfile(loggedUser, {
                        displayName: name,
                        photoURL: photoUrl,
                    })
                        .then(() => {
                            let membership = 'bronze';
                            let userRole = 'member';
                            const userName = name;
                            const userMail = email;
                            const userPhoto = photoUrl; // Use the updated photoUrl
                            const userJoined = loggedUser.metadata.creationTime;
    
                            const userInfo = {
                                userName,
                                userMail,
                                userPhoto,
                                userJoined,
                                membership,
                                userRole,
                            };
                            axiosPublic.post('/users', userInfo)
                                .then(res => {
                                    if (res.data.insertedId) {
                                        console.log('user added to database');
                                        Swal.fire({
                                            position: 'top-end',
                                            icon: 'success',
                                            title: 'User created successfully.',
                                            showConfirmButton: false,
                                            timer: 1500
                                        });
                                        navigate(location?.state ? location.state : '/');
                                    }
                                });
                        });
                } catch (error) {
                    console.error(error);
                }
            } else {
                toast.error(
                    'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.'
                );
            }
        } else {
            toast.error('Password must be at least 6 characters long');
        }
    };
    


    return (
        <div>
            <div className="className=mt-20 max-w-6xl mx-auto">
                <div className="hero-content flex-col lg:flex-row-reverse mb-20">
                    <div className="card flex-shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(handleRegister)} className="card-body text-[#403F3F]">
                            <div className="form-control">
                                <h1 className="text-center text-4xl font-semibold">Register your account</h1>
                                <hr className="my-12" />
                                <label className="label">
                                    <span className="text-xl font-semibold">Your Name</span>
                                </label>
                                <input type="text"
                                    {...register("name", { required: true })}
                                    name="name" placeholder="Enter your name" className="input input-bordered bg-[#F3F3F3]" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="text-xl font-semibold">Email</span>
                                </label>
                                <input type="email"
                                    {...register("email", { required: true })}
                                    name="email" placeholder="Enter your email" className="input input-bordered bg-[#F3F3F3]" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="text-xl font-semibold">Password</span>
                                </label>
                                <input type="password"
                                    {...register("password", { required: true })}
                                    name="password" placeholder="password" className="input input-bordered bg-[#F3F3F3]" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="text-xl font-semibold">Upload photo</span>
                                </label>
                                <input type="file"
                                    {...register("photoUrl")}
                                    className="file-input file-input-bordered w-full max-w-xs" />
                            </div>
                            <div className="form-control mt-6">
                                <p className="font-semibold text-center mt-7">Already have an account ? <span className="text-[#eb1c3a]"><NavLink to='/login'>Login</NavLink></span></p>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn bg-[#eb1c3a] text-white">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
                <ToastContainer></ToastContainer>
            </div>
        </div>
    );
};

export default Register;