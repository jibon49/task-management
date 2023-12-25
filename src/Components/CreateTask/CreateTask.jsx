import dateFormat from "dateformat";
import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProviders/AuthProviders";
import useAxiosPublic from "../Hooks/AxiosPublic";


const CreateTask = () => {

    const { user } = useContext(AuthContext)
    const postId = uuidv4();
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()




    const handleAddAssignment = e => {
        e.preventDefault();
        const form = e.target;

        const title = form.title.value;
        const priority = form.tag.value;
        const description = form.description.value;
        let status = 'todo'
        const time = dateFormat(new Date());

        const author = {
            name: user.displayName,
            avatar: user.photoURL,
            email: user.email
        }


        const createTask = { postId, title, priority, description, time, author, status }


        console.log(createTask);

        
            axiosPublic.post('/create-task', createTask)
                .then(data => {
                    console.log(data.data);
                    if (data.data.insertedId) {
                        Swal.fire({
                            title: 'Success',
                            text: 'Task created Successfully',
                            icon: 'success',
                            confirmButtonText: 'Cool'
                        })
                        navigate('/dashboard/my-task')
                    }
                    
                })
    }

    return (
        <div className=" w-full mx-auto mt-20">

            <form onSubmit={handleAddAssignment}>

                {/* title and image */}
                <div className="flex md:flex gap-5">
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="text-xl font-semibold">Task Title</span>
                        </label>
                        <input type="text" name="title" placeholder="title" className="input input-bordered w-full bg-[#F3F3F3]" required />
                    </div>
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="text-xl font-semibold">Priority</span>
                        </label>
                        <select name="tag"
                            className="select select-bordered w-full bg-[#F3F3F3]">
                            <option value="low">Low</option>
                            <option value="moderate">Moderate</option>
                            <option value="high">High</option>

                        </select>
                    </div>
                </div>



                {/* description */}
                <div className="">

                    <div className="form-control">
                        <label className="label">
                            <span className="text-xl font-semibold"> Description</span>
                        </label>
                        <textarea

                            name="description"
                            placeholder="description"
                            className="textarea textarea-bordered w-full bg-[#F3F3F3] h-40"

                            required />
                    </div>
                </div>

                {/* submit */}
                <div className=" w-full mx-auto mt-6">
                    <button className=" btn btn-outline w-full mb-2">
                        Submit
                    </button>
                </div>
            </form>

        </div>
    );
};

export default CreateTask;