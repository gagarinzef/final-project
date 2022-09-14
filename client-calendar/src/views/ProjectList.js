import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideNav from "../components/SideNav";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../store/actions";
import Loading from "../components/Loader/Loading";

export default function ProjectList() {
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.project);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState({
    name: "",
  });
  const [value, setValue] = useState("");
  useEffect(() => {
    dispatch(
      fetchData(`http://localhost:3001/projects`, "GET", null, "projects")
    )
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch, value]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = (event, data) => {
    event.preventDefault();
    let newInput = input;
    if (data) {
      newInput = data;
    }

    dispatch(fetchData(`http://localhost:3001/projects`, "POST", newInput))
      .then(() => {
        setValue(newInput);
        setShowModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openProject = (id) => {
    navigate(`/table/${id}`);
  };

  const deleteProject = (id) => {
    console.log("DELETE", id);
  };

  return (
    <>
      <div className="h-screen bg-biru flex ">
        <SideNav handleSubmit={handleSubmit} />
        <div className="items-center mx-16 my-4 w-screen text-start">
          <div className="bg-slate-600 h-[85vh] p-6 rounded-lg">
            <h1 className="text-2xl text-white mx-6">
              <i class="fas fa-gavel"> </i>
              <span className="font-extrabold"> My Projects</span>
            </h1>

            {/* STARTING CARD HERE */}
            {loading ? (
              <Loading />
            ) : (
              <div className="grid grid-cols-5 gap-2">
                <div
                  className="m-5 rounded-xl shadow-xl items-center w-56 "
                  onClick={() => setShowModal(true)}
                >
                  <div className=" bg-white shadow-xl hover:shadow-xl rounded-lg  h-52 justify-between cursor-pointer transform translate-y-4 hover:translate-y-0 duration-500 ease-in-out">
                    <div className="relative overflow-hidden items-center">
                      <i className="fas fa-plus fa-4x flex px-24 pt-16 scale-50"></i>
                      <h1 className="px-4 mt-3 mb-2 font-bold text-[16px] text-center">
                        CREATE PROJECT
                      </h1>
                    </div>
                  </div>
                </div>
                {/* END CARD */}
                {projects.map((e) => {
                  return (
                    <div
                      key={e.id}
                      className="m-5 rounded-xl shadow-xl items-center w-56"
                    >
                      {/* test */}
                      <div className="cursor-pointer bg-white shadow-xl hover:shadow-xl rounded-lg overflow-hidden h-52 justify-between transform translate-y-4 hover:translate-y-0 duration-500 ease-in-out">
                        <div onClick={() => openProject(e?.Project?.id)}>
                          <div className="relative overflow-hidden">
                            <h1 className=" px-7 mt-4 pt-4 mb-2 font-bold text-[24px] text-start truncate">
                              {e?.Project?.name}
                            </h1>
                            <div className="pl-6">
                              <img
                                src="https://img.icons8.com/fluency/48/000000/open-book.png"
                                alt="modal-card"
                              />
                            </div>
                          </div>
                        </div>
                        {/* onlclick */}
                        <div className="flex justify-between ">
                          <img
                            onClick={() => deleteProject(e.id)}
                            className="pt-8 scale-75 duration-200 hover:scale-100"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAFbklEQVRoge2ZXWwUVRTH/+fOlmLodnflm21LadFFSniBQIg+wINVwwMNRo3xVYmEJ8OHgBiNCgZbJDEq5cnExERNIG2iwfigJCompphoaRoSaguUBdrU7c7SStm55/iwW/e7e2c7DQ9yksmcmdxz7/8399yPmQEe2AP7fxu5KbzxZzsCja8Jsn4uxAjoT1h4vueJ2sumMcpNA8TonCvxAECQ9cTodBNjDLD5fGwbRLa6l+XSRLZu/DFm3I4xABO9VZki90aWZdxW2TGw86ZsF8FpAcKzk+XahkHY1bWczs1UqGwPsKDzPogHgDoITpcrZJJCdR6IqdTqyxUwmkYXHB08JIJjIqlrSTupk8Dkfn4ZAzuMY5H3yxXymdREQokMqiDDbe4TpcQTEUSMQGwTbUYAQmQTVS6+mD8Nkt1TuY16CKCIbJB34kv5OSBKvARgW0gVpMGcgnjZA1DKJlBBQ9MgRAIRb0EEkvAMoMqnbEeXb3QaxIueEu1hCkE5CeLpopUP2HzA4uXTVj3fOwDLmW8zaUPB5pYCyZxz66o2AjBudeGJaBIQ32wWMxf39b23m40erlkKAVAKCREKzdz93vgEs/x3BUAgG4RQqZXV45loDgAU2TB48mYDtazvPYAiJNiDPZBRTwl7DwB4ux+auaeU0SLmCsA0hWa1W2UNAkMA7wGgYCuZgz2QAGAHwg7AGhABMU94DkBZKeRuZZ3B1xrCScxL3sVTI714cvQSWuwo6u6MvVS1pfU50TwszL8LO12jU2NdLX199yoGsAgJSaOUEuZmDyROEtD38MzIHzg0cA4Nk2MQZggLRLgKQBWACIAIhF5cZD08cHvd4weWXvrlbLYu488qQsomIqQOwMRXKuUrhfQ5dQ2dhM+5iyMD36Cz/0s03I2ZSGgGcObmmi3tkqXbGIAUEhlxszg4CSVJHBz8Dq9EfzVtPqODZN+tyKb/3pWNARTBdvP0i/oQgDWeHu3Fy9ELrsVn2YFo84Y2VwCWSg3i6TSoBASiMU9P4eDQ94X1R1aDArUF91UwAN/aSKEgog/7WlrmmX/cFeSMgfz8NgJhjdaxvoKctx5djZqPjqPm5DFQKJgRHwoi0HkCoc8+hq9lTb6iVYHJqh3mg9iaOYVyB2qRnoKAwGgd6y+om2+PQF+/AWvVSvhPHoUKBaFCQdR+0g6reRWcq8PgGzcL4ghqh/E0KppspVJh6TtGfmbNYGgI1k0UCpG4jYl9b2JB+zuwmhrhP9UBOA6sxgbooWuI794LHo8Xk7XRuAdqHiLX02hO/qexlkzdKf6AxuO4s/cI9NXrsOpWpMRfjyL+6l7w2N8lVEnYGGDhikBi1rOQ67fO9PtmaWNjgPPbyFGKJisWrwikFEaq/UXrp2AANSfeg7WyHnr4BvTQNVj1YQROdUAtWlhKVtTdL6b0WpA/YM1WZQukLPT5VxTWG6jFgo53YTU1Qg9eRWL3fiT27IceGILV2IDApx1QwUBBnEB6XAKogWIi82eeolOrsqCUwg+L1xbUq5YugVUfTol/7Q1wbBwcG4e9Zz/0wCB8K+ugwsuLKep2lZUtX0xugvDnAkRKf2XIv86UE2cKamoS3T+1o35iFGBJb+AY1iNN0NFb4FgcohlgDdEMqvWDli5GsrcfYIZonYrR/Fes+p/H3H/M8cAS21/YKcJnsgGQPgtLDoBMi9acA8Ca28JXerpdpZBX5v/2q7MQ6ZhFFcfDV3q6AZf/ib00/+Z1rwPS7jaOgA+WXf7tcNb1/TW79dk2Zt0O5tUzphDzFWG9b1nvhe7s+PsOAACyYVdVPHCrTZh3CMsG0VwH1hDmYXH0RWHpWqwS3XTxYjI/9l87Q1Cb6kaUIQAAAABJRU5ErkJggg=="
                          ></img>
                          <div className="pt-12 pl-8">
                            {new Date(e.createdAt).toLocaleDateString("en-EN", {
                              weekday: "short",
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </div>
                          <a href="https://icons8.com/icon/x4eY9knZ24Hv/delete-trash"></a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        {showModal ? (
          <>
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-abu outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                    <h3 className="text-3xl text-white font-bold uppercase">
                      New
                    </h3>
                    <button
                      className="bg-transparent border-0 text-black float-right"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="text-black opacity-7 h-5 w-5 text-xl bg-white py-0 rounded-full">
                        <i className="fas fa-times-circle h-7 w-7"></i>
                      </span>
                    </button>
                  </div>
                  <form
                    onSubmit={handleSubmit}
                    className="bg-abu shadow-md rounded px-8 pt-6 pb-8 w-full"
                  >
                    <div className="relative p-6 flex-auto">
                      <label className="block text-white text-sm font-extrabold mb-1">
                        Title
                      </label>
                      <input
                        name="name"
                        type="name"
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                      />
                    </div>
                    <div className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="text-white bg-blue-600 active:bg-blue-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}
