import { useContext } from "react";
import { AuthContext } from "../AuthProviders/AuthProviders";
import useAxiosPublic from "../Hooks/AxiosPublic";
import { useQuery } from "@tanstack/react-query";


const MyTask = () => {

    const { user, loading } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    let email = "mymail";

    if (!loading) {
        email = user.email
    }

    const url = `/my-task?email=${email}`

    const { data: myTask = [], refetch, error, isLoading } = useQuery(
        {
            queryKey: ['myTask', email],
            queryFn: async () => {
                const response = await axiosPublic.get(url, { credentials: 'include' });
                return response.data;
            }
        }
    );

    console.log(myTask)

    return (
        <div>
            <div className="text-3xl font-bold mx-auto text-center bg-indigo-700 rounded-lg">
                <h1 className="text-white py-4">My Task</h1>
            </div>
            <div className="mt-20 grid grid-cols-3 gap-5">
                <div>
                    <div className="text-2xl font-bold w-full mx-auto text-center bg-gray-700 rounded-xl">
                        <h1 className="text-white py-4">To Do</h1>
                    </div>
                    <div>
                        <h1>Eating food</h1>
                    </div>
                </div>
                <div className="text-2xl font-bold w-full mx-auto text-center bg-pink-500 rounded-xl">
                    <h1 className="text-white py-4">Ongoing</h1>
                </div>
                <div className="text-2xl font-bold w-full mx-auto text-center bg-[#16EEAD] rounded-xl">
                    <h1 className="text-white py-4">Completed</h1>
                </div>
            </div>
        </div>
    );
};

export default MyTask;