import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import "../App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function CalendarPage() {
  const [event, setEvent] = useState([]);
  const [input, setInput] = useState({
    title: "",
    date: "",
    color: "",
  });
  const [dataChange, setDataChange] = useState([]);

  // FETCH DATA
  useEffect( () => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3001/tasks`, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        setEvent(data);
      } catch (error) {
        if(error.response.data.statusCode == 404) {
          Swal.fire("User tidak memiliki event")
        } else {
          console.log(error);
        }
      }
    };

    fetchData();

    // fetch(`http://localhost:4000/Events`, {
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    //   .then((response) => {
    //     if (!response.ok) throw new Error("Fetch error")
    //     return response.json()
    //   })
    //   .then((data) => setEvent(data))
    //   .catch((err) => console.log(err))
  }, [dataChange]);

  // TO HANDLE DELETE EVENTS
  const eventClick = (event) => {
    console.log(event.event._def.publicId);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  // INPUT DATA TO SERVER
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { title, date } = input;
      const { data } = await axios(`http://localhost:3001/tasks`, {
        method: "post",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        data: {title, date, color: "Red"}
      });
      setDataChange(data);
      Swal.fire("Success add task")
    } catch (error) {
      console.log(error);
    }
    
    // fetch(`http://localhost:4000/Events`, {
    //   method: "post",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     title: title,
    //     date: date,
    //     color: "red",
    //   }),
    // })
    //   .then((res) => {
    //     if (!res.ok)
    //       return res.json().then((message) => {
    //         throw message;
    //       });
    //     return res.json();
    //   })
    //   .then((data) => console.log(data));
  };
  return (
    <div className="App">
      <h1>ADD EVENTS</h1>
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

        <label htmlFor="formDate">Date: </label>
        <input
          type="date"
          className="border"
          name="date"
          value={input.date}
          placeholder="date"
          onChange={handleChange}
        />
        <button className="border bg-blue-600 text-white">SUBMIT</button>
      </form>
      <div className="container m-auto w-1/2">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          events={event}
          eventClick={eventClick}
        />
      </div>
    </div>
  );
}

export default CalendarPage;
