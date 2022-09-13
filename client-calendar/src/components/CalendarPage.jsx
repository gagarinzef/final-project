import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import "../App.css";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import CreateModal from "./modal/CreateModal";
import { useParams } from "react-router-dom";
import UpdateModal from "./modal/UpdateModal";
import { useDispatch } from "react-redux";
import { fetchData } from "../store/actions";

function CalendarPage({ data, trigger }) {
  const { projectId } = useParams();
  const dispatch = useDispatch();

  const [event, setEvent] = useState([]);
  const [dataChange, setDataChange] = useState([]);

  // SHOW MODAL
  const [show, setShow] = useState(false);
  const [detail, setDetail] = useState(false);
  const [eventID, setEventID] = useState(0);

  // INPUT MODAL
  const [dueDate, setDueDate] = useState("");

  // FETCH DATA
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const { data } = await axios.get(
  //         `http://localhost:3001/tasks/project/${projectId}`,
  //         {
  //           headers: {
  //             access_token: localStorage.getItem("access_token"),
  //           },
  //         }
  //       );
  //       console.log(data, "jordan");
  //       setEvent(data);
  //     } catch (error) {
  //       if (error.response.data.statusCode === 404) {
  //         Swal.fire("User tidak memiliki event");
  //       } else {
  //         console.log(error);
  //       }
  //     }
  //   };
  //   fetchData();
  // }, [dataChange]);

  useEffect(() => {
    setEvent(data.project.Tasks);
    console.log(data.project.Tasks, "gaga");
  }, [data]);

  // TO HANDLE DELETE EVENTS
  const eventClick = (event) => {
    setEventID(event.event._def.publicId);
    setDetail(true);
  };

  // MODAL
  const selectDate = (selectInfo) => {
    setShow(true);
    setDueDate(selectInfo.startStr);
  };
  const eventDrop = async (info) => {
    const dateInfo = info.event.start
      .toLocaleString("id-ID", {
        year: "numeric",
        day: "2-digit",
        month: "2-digit",
      })
      .split("/");

    const input = {
      TaskId: info.event._def.publicId,
      date: `${dateInfo[2]}-${dateInfo[1]}-${dateInfo[0]}`,
    };

    dispatch(fetchData(`http://localhost:3001/tasks`, "PATCH", input))
      .then(() => {
        trigger(input);
      })
      .catch((err) => {
        console.log(err);
      });
    // try {

    //   await axios(`http://localhost:3001/tasks`, {
    //     method: "PATCH",
    //     headers: {
    //       access_token: localStorage.getItem("access_token"),
    //     },
    //     data: ,
    //   })
    //     .then((data) => setDataChange(data))
    //     .then(() => Swal.fire("Date has been updated"));
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const patch = () => {};

  return (
    <>
      {/* Create Event MODAL */}
      <CreateModal
        show={show}
        dueDate={dueDate}
        setEvent={setEvent}
        setShow={setShow}
        setDataChange={setDataChange}
        projectId={projectId}
      />

      {/* Update Event MODAL */}
      <UpdateModal
        show={detail}
        setShow={setDetail}
        eventID={eventID}
        setDataChange={setDataChange}
        member={data.member}
      />

      <div className="container mx-auto my-10 w-1/2 text-white">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          editable={true}
          selectable={true}
          selectMirror={true}
          droppable={true}
          initialView="dayGridMonth"
          events={event}
          eventClick={eventClick}
          select={selectDate}
          eventDrop={eventDrop}
        />
      </div>
    </>
  );
}

export default CalendarPage;
