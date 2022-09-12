import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function CreateModal({
    show,
    dueDate,
    setShow,
    setDataChange,
    projectId
}) {

    const [input, setInput] = useState({
        title: "",
        color: "",
    });
    const [email, setEmail] = useState([])

    useEffect(() => {
        
    }, [])

    // INPUT DATA TO SERVER
    const handleChange = (event) => {
        const { name, value } = event.target;
        setInput({ ...input, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { title, color } = input;
            const { data } = await axios(`http://localhost:3001/tasks`, {
                method: "post",
                headers: {
                    access_token: localStorage.getItem("access_token"),
                },
                data: {
                    title: title,
                    date: dueDate,
                    color: color,
                    ProjectId: projectId
                },
            });
            setDataChange(data);
            Swal.fire("Success add task");
        } catch (error) {
            console.log(error);
        }
    }

    const onClose = () => {
        setShow(false);
    };

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
                                            New Event
                                        </h3>
                                        <div className="font-bold">
                                            <button onClick={onClose} className="">
                                                X
                                            </button>
                                        </div>
                                    </div>

                                    <div className="container mt-5">
                                        <form onSubmit={handleSubmit}>
                                            <label htmlFor="formTitle">Event: </label>
                                            <input
                                                type="text"
                                                className="border"
                                                name="title"
                                                value={input.title}
                                                placeholder="name"
                                                onChange={handleChange}
                                            />

                                            <label htmlFor="formColor">Status: </label>
                                            <select
                                                id="formColor"
                                                name="color"
                                                onChange={handleChange}
                                                value={input.color}
                                            >
                                                <option value="#D7A463">On progress</option>
                                                <option value="#E8697D">Urgent</option>
                                                <option value="#29A488">Done</option>
                                            </select>

                                            <div className="mt-4 rounded-xl">
                                                <button
                                                    type="button"
                                                    onClick={handleSubmit}
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                >
                                                    SUBMIT
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
