// import { useEffect, useState } from 'react'
// import io from 'socket.io-client'

// const ChatSocket = props => {
//     const {
//         projectId,
//         onMessageReceived,
//     } = props

//     const [socket, setSocket] = useState(null)

//     useEffect(() => {
//         if (!projectId) return

//         const tempSocket = io.connect("http://localhost:3003")
//         tempSocket.on('receive_message', data => {
//             onMessageReceived(data.message)
//         })

//         tempSocket.emit('join_project_chat', projectId)
//         setSocket(tempSocket)
//     },[])

//     return <>
//     </>
// }

// export default ChatSocket
