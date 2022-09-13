import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchData } from "../../store/actions";

export default function CreateModal({
  show,
  dueDate,
  setShow,
  projectId,
  trigger,
}) {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    title: "",
    color: "",
  });

  // INPUT DATA TO SERVER
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      fetchData(`http://localhost:3001/tasks`, "POST", {
        ...input,
        ProjectId: projectId,
        date: dueDate,
      })
    )
      .then(() => {
        trigger(input);
        setShow(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
                      <form onSubmit={handleSubmit}>
                        <div className="-mx-3 flex flex-wrap">
                          <div className="w-full px-3 sm:w-1/2">
                            <div className="mb-5">
                              <label
                                htmlFor="formTitle"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                              >
                                Event:{" "}
                              </label>
                              <input
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
                              >
                                Status:{" "}
                              </label>
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

                          <div className="mt-4 rounded-xl">
                            <button
                              type="button"
                              onClick={handleSubmit}
                              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            >
                              SUBMIT
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
  );
}
