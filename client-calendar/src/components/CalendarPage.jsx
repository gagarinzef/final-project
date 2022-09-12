import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import "../App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import SideNav from "./SideNav";
import CreateModal from "./modal/CreateModal";
import { useParams } from "react-router-dom";

function CalendarPage() {
	const { projectId } = useParams();

	const [event, setEvent] = useState([]);
	const [dataChange, setDataChange] = useState([]);

	// SHOW MODAL
	const [show, setShow] = useState(false);

	// INPUT MODAL
	const [dueDate, setDueDate] = useState("");

	// FETCH DATA
	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data } = await axios.get(`http://localhost:3001/tasks`, {
					headers: {
						access_token: localStorage.getItem("access_token"),
					},
				});
				setEvent(data);
			} catch (error) {
				if (error.response.data.statusCode == 404) {
					Swal.fire("User tidak memiliki event");
				} else {
					console.log(error);
				}
			}
		};
		fetchData();
	}, [dataChange]);

	// TO HANDLE DELETE EVENTS
	const eventClick = (event) => {
		console.log(event.event._def.publicId);
	};

	// MODAL
	const selectDate = (selectInfo) => {
		setShow(true);
		setDueDate(selectInfo.startStr);
	};
	const eventDrop = (info) => {};

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
