import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

export default function UpdateModal({ show, setShow, eventID, setDataChange }) {
    const { projectId } = useParams()

    const [users, setUsers] = useState([])
    const [input, setInput] = useState({
        title: "",
        color: "",
        date: "",
        user: 0
    });

    const onClose = () => {
        setShow(false);
    };

    // INPUT DATA TO SERVER
    const handleChange = (event) => {
        const { name, value } = event.target;
        setInput({ ...input, [name]: value });
    };

    const fetchDetail = async () => {
        try {
            const { data } = await axios(`http://localhost:3001/tasks/${eventID}`, {
                method: "GET",
                headers: {
                    access_token: localStorage.getItem("access_token"),
                },
            })
            setInput({
                title: data.title,
                color: data.color,
                date: data.date,
                user: data.UserId
            })
        } catch (error) {
            console.log(error);
        }
    }
    const fetchUser = async () => {
        try {
            const { data } = await axios(`http://localhost:3001/userprojects/${projectId}`, {
                method: "GET",
                headers: {
                    access_token: localStorage.getItem("access_token"),
                },
            })
            setUsers(data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (eventID) {
            fetchUser()
            fetchDetail()
        }
    }, [eventID])

    const handleUpdate = async (event) => {
        event.preventDefault()
        try {
            const { title, date, color, user } = input
            await axios(`http://localhost:3001/tasks`, {
                method: 'PATCH',
                headers: {
                    access_token: localStorage.getItem("access_token"),
                },
                data: {
                    title: title,
                    date: date,
                    color: color,
                    UserId: user,
                    TaskId: eventID,
                    ProjectId: projectId
                }
            })
                .then((data) => setDataChange(data))
                .then(() => Swal.fire("Update Success"))
                .finally(() => setShow(false))

        } catch (error) {
            console.log(error);
        }
    }
    const handleDelete = async () => {
        try {
            await axios(`http://localhost:3001/tasks`, {
                method: 'DELETE',
                headers: {
                    access_token: localStorage.getItem("access_token"),
                },
                data: {
                    TaskId: eventID
                }
            })
                .then((data) => setDataChange(data))
                .then(() => Swal.fire("Delete Success"))
                .finally(() => setShow(false))
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={onClose}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-60" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <div className="flex justify-between">
                                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                                            {" "}
                                        </h3>
                                        <div className="font-bold">
                                            <button onClick={onClose} className="">
                                                X
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-center">
                                        <div className="mx-auto w-full max-w-6xl rounded-2xl bg-white">
                                            <form onSubmit={handleUpdate}>

                                                <div className="-mx-3 flex flex-wrap">
                                                    <div className="w-full px-3 sm:w-1/2">
                                                        <div className="mb-5">
                                                            <label
                                                                htmlFor="formTitle"
                                                                className="mb-3 block text-base font-medium text-[#07074D]"
                                                            >Event: </label>
                                                            <input
                                                                id="formTitle"
                                                                type="text"
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                                name="title"
                                                                value={input.title}
                                                                placeholder="Title"
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="w-full px-3 sm:w-1/2">
                                                        <div className="mb-5">
                                                            <label
                                                                className="mb-3 block text-base font-medium text-[#07074D]"
                                                                htmlFor="formColor"
                                                            >Status: </label>
                                                            <select
                                                                id="formColor"
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                                name="color"
                                                                onChange={handleChange}
                                                                value={input.color}
                                                            >
                                                                <option>-- SELECT --</option>
                                                                <option value="#D7A463">On progress</option>
                                                                <option value="#E8697D">Urgent</option>
                                                                <option value="#29A488">Done</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="w-full px-3 sm:w-1/2">
                                                        <div className="mb-5">
                                                            <label
                                                                htmlFor="formDate"
                                                                className="mb-3 block text-base font-medium text-[#07074D]"
                                                            >Date: </label>
                                                            <input
                                                                id="formDate"
                                                                type="date"
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                                name="date"
                                                                value={input.date}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="w-full px-3 sm:w-1/2">
                                                        <div className="mb-5">
                                                            <label
                                                                htmlFor="formUsers"
                                                                className="mb-3 block text-base font-medium text-[#07074D]"
                                                            >Asignee: </label>
                                                            <select
                                                                id="formUsers"
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                                name="user"
                                                                onChange={handleChange}
                                                                value={input.user}
                                                            >
                                                                <option>-- SELECT --</option>
                                                                {users.map((user) => {
                                                                    return <option key={user.id} value={user.User.id}>{user.User.username}</option>
                                                                })}
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="mt-4 mx-5 rounded-xl">
                                                        <button
                                                            type="button"
                                                            onClick={handleUpdate}
                                                            className="mr-4 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                        >
                                                            UPDATE
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={handleDelete}
                                                            className="inline-flex justify-center rounded-md border border-transparent bg-rose-100 px-4 py-2 text-sm font-medium text-rose-900 hover:bg-rose-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
                                                        >
                                                            DELETE
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
