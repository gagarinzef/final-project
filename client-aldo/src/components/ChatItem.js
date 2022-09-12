import React from "react";

const ChatItem = props => {
    const {
        user,
        message,
        createdAt
    } = props

    const style = {
        display: 'flex',
        alignItem: 'flex-start',
        padding: '12px 24px',
        backgroundColor: 'lightcyan'
    }

    const formatDate = (date) => {
        const d = new Date(date);
        const day = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
        const month = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        return `${day[d.getDay()]}, ${d.getDate()} ${month[d.getMonth()]
            } ${d.getFullYear()}`;
    }

    return <div style={style}>
        <div>
            <span><b>{user}</b>: {message} ,  {formatDate(createdAt)}</span>
        </div>
    </div>
}

export default ChatItem