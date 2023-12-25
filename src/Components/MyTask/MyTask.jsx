// MyTask.js

import { useContext } from "react";
import { AuthContext } from "../AuthProviders/AuthProviders";
import useAxiosPublic from "../Hooks/AxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Task from "../Task/Task";

const MyTask = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    let email = "mymail";

    if (!loading) {
        email = user.email;
    }

    const url = `/my-task?email=${email}`;

    const { data: myTask = [], refetch, error, isLoading } = useQuery({
        queryKey: ["myTask", email],
        queryFn: async () => {
            const response = await axiosPublic.get(url, {
                credentials: "include",
            });
            return response.data;
        },
    });

    const handleDrop = async (item, newStatus) => {
        console.log(item)
        try {
            const response = await axiosPublic.patch(`/update-task-status/${item._id}`, {
                status: newStatus,
            });
            console.log(response.data);
            refetch();
        } catch (error) {
            console.error(error);
        }
    };


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
                        {myTask.filter((task) => task.status === "todo")
                            .map((task) => (
                                <Task
                                    key={task._id}
                                    title={task.title}
                                    id={task._id}
                                    status="todo"
                                    onDrop={() => handleDrop(task, "todo")}
                                />
                            ))}
                    </div>
                </div>
                <div>
                    <div className="text-2xl font-bold w-full mx-auto text-center bg-pink-500 rounded-xl">
                        <h1 className="text-white py-4">Ongoing</h1>
                    </div>
                    <div>
                        {myTask
                            .filter((task) => task.status === "ongoing")
                            .map((task) => (
                                <Task
                                    key={task._id}
                                    title={task.title}
                                    id={task._id}
                                    status="ongoing"
                                    onDrop={() => handleDrop(task, "ongoing")}
                                />
                            ))}
                    </div>
                </div>
                <div>
                    <div className="text-2xl font-bold w-full mx-auto text-center bg-[#16EEAD] rounded-xl">
                        <h1 className="text-white py-4">Completed</h1>
                    </div>
                    <div>
                        {myTask
                            .filter((task) => task.status === "completed")
                            .map((task) => (
                                <Task
                                    key={task._id}
                                    title={task.title}
                                    id={task._id}
                                    status="completed"
                                    onDrop={() => handleDrop(task, "completed")}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyTask;
