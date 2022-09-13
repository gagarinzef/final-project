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
        padding: '12px 10px',
        backgroundColor: 'white',
        fontSize: '12px',
        color: 'black',
        flexDirection: 'column',
        margin: '5px',
        borderRadius: 8
    }

    const formatDate = (date) => {
        const d = new Date(date);
        const day = [
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
        ];
        const month = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];
        return `${day[d.getDay()]}, ${d.getDate()} ${month[d.getMonth()]
            } ${d.getFullYear()}`;
    }

    

    return <div style={style}>
        <div>
            <span style={{
                 float: 'left'
            }}
            ><b>{user}</b>: {message}</span>
        </div>
        <span style={{
            fontSize: '9px',
            textAlign: 'end'
        }}>
        {formatDate(createdAt)}
        </span>
    </div>
}

export default ChatItem