import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import "../App.css";
import { useEffect, useState } from "react";
import CreateModal from "./modal/CreateModal";
import { useParams } from "react-router-dom";
import UpdateModal from "./modal/UpdateModal";
import { useDispatch } from "react-redux";
import { fetchData } from "../store/actions";
import { success } from "../helpers/toast";
import { URL_SERVER } from "../helpers/server-link";

function CalendarPage({ data, trigger }) {
  const { projectId } = useParams();
  const dispatch = useDispatch();

  const [event, setEvent] = useState([]);

  // SHOW MODAL
  const [show, setShow] = useState(false);
  const [detail, setDetail] = useState(false);
  const [eventID, setEventID] = useState(0);

  // INPUT MODAL
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    setEvent(data?.project?.Tasks);
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
      date: `${dateInfo[2]}-${dateInfo[1]}-${dateInfo[0]}`,
    };

    dispatch(
      fetchData(
        `${URL_SERVER}/tasks/${info.event._def.publicId}`,
        "PATCH",
        input
      )
    )
      .then((data) => {
        success(data);
        trigger(input);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {/* Create Event MODAL */}
      <CreateModal
        show={show}
        dueDate={dueDate}
        setEvent={setEvent}
        setShow={setShow}
        projectId={projectId}
        trigger={trigger}
      />

      {/* Update Event MODAL */}
      <UpdateModal
        show={detail}
        setShow={setDetail}
        eventID={eventID}
        member={data.member}
        trigger={trigger}
      />

      <div className="container m-auto w-full bg-white rounded-xl shadow-lg shadow-slate-700 mb-10">
        <div className="p-3">
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
      </div>
    </>
  );
}

export default CalendarPage;
