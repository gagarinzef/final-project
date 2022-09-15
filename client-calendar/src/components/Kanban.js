import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { URL_SERVER } from "../helpers/server-link";
import { errorHandler } from "../helpers/toast";

export default function Kanban({ trigger }) {
  const { projectId } = useParams();
  const [columns, setColumns] = useState({});
  const [initColumns, setInitColumns] = useState({});
  const [loading, setLoading] = useState(true);
  var HOST = window.location.origin.replace(/^http/, "ws");
  // const ws = new WebSocket("ws://wokitout-server.herokuapp.com");

  const ws = new WebSocket(HOST);
  const [value, setValue] = useState("");

  const fetchTask = async () => {
    let columnsFromBackend = {
      0: {
        color: "#E8697D",
        name: "Urgent",
        items: [],
      },
      1: {
        color: "#D7A463",
        name: "On Progress",
        items: [],
      },
      2: { color: "#29A488", name: "Done", items: [] },
    };
    try {
      const { data } = await axios({
        method: "GET",
        url: `${URL_SERVER}/tasks/project/${projectId}`,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });
      for (const key in columnsFromBackend) {
        data.forEach((el) => {
          if (el.User) {
            el.username = el.User.username;
          }
          if (columnsFromBackend[key].name === el.status) {
            columnsFromBackend[key].items.push(el);
          }
        });
      }
      setColumns(columnsFromBackend);
      setInitColumns(columnsFromBackend);
      setLoading(false);
    } catch (error) {
      errorHandler(error);
    }
  };

  const updateTask = async () => {
    try {
      const { data } = await axios({
        method: "PUT",
        url: `${URL_SERVER}/tasks`,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        data: columns,
      });
      setValue(data);
      trigger(data);
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleWsMessage = async (message) => {
    if (message.data === "updated") {
      await fetchTask();
    }
  };

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);

      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  useEffect(() => {
    ws.onmessage = handleWsMessage;
    fetchTask();
  }, [value]);

  useEffect(() => {
    if (JSON.stringify(columns) !== JSON.stringify(initColumns)) {
      setInitColumns(columns);
      updateTask();
    }
  }, [columns]);

  if (!loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100%",
          marginTop: 50,
        }}
      >
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                key={columnId}
              >
                <h2 className="text-black font-bold">{column.name}</h2>
                <div
                  style={{
                    margin: 8,
                  }}
                >
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver ? "" : "",
                            padding: 4,
                            width: 250,
                            minHeight: 500,
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={String(item.id)}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      className="hover:scale-105 duration-300"
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: "none",
                                        padding: 0,
                                        margin: "0 0 15px 0",
                                        minHeight: "20px",
                                        height: "120px",
                                        backgroundColor: snapshot.isDragging
                                          ? "#e5e7eb"
                                          : "white",
                                        color: "black",
                                        borderLeftWidth: 10,
                                        borderLeftColor: `${item.color}`,
                                        ...provided.draggableProps.style,
                                        boxShadow: "1px 5px 5px 1px gray",
                                      }}
                                    >
                                      <p
                                        style={{
                                          textAlign: "start",
                                          padding: 15,
                                          fontWeight: 600,
                                          fontSize: 20,
                                          textOverflow: "ellipsis",
                                          overflow: "hidden",
                                          whiteSpace: "nowrap",
                                          color: "black",
                                        }}
                                      >
                                        {item.title}
                                      </p>
                                      {item.username ? (
                                        <p
                                          style={{
                                            textAlign: "end",
                                            fontWeight: 400,
                                            marginRight: 10,
                                            marginTop: "30px",
                                          }}
                                        >
                                          {item.username}
                                        </p>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    );
  }
}
