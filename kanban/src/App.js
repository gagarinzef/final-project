import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";

export default function App() {
  const [columns, setColumns] = useState({});
  const [initColumns, setInitColumns] = useState({});
  const [loading, setLoading] = useState(true);
  const [updatedData, setUpdatedData] = useState("");
  // var HOST = window.location.origin.replace(/^http/, "ws");
  const ws = new WebSocket("ws://localhost:3002/");
  // const ws = new WebSocket(HOST);

  const fetchTask = () => {
    return fetch("http://localhost:3001/tasks") // nanti tambahin headers access_token
      .then((response) => response.json())
      .then((data) => {
        let columnsFromBackend = {
          0: {
            color: "Red",
            name: "Unstarted",
            items: [],
          },
          1: {
            color: "Yellow",
            name: "In Progress",
            items: [],
          },
          2: {
            color: "Green",
            name: "Completed",
            items: [],
          },
        };

        for (const key in columnsFromBackend) {
          data.forEach((el) => {
            if (columnsFromBackend[key].name === el.status) {
              columnsFromBackend[key].items.push(el);
            }
          });
        }
        setColumns(columnsFromBackend);
        setInitColumns(columnsFromBackend);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleWsMessage = async (message) => {
    console.log("socket mashyukkk");
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

      // bisa pake bisa ngga
      // const updated = {
      //   ...removed,
      //   status: destColumn.name,
      //   color: destColumn.color,
      // };
      // setUpdatedData(updated);

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
  }, []);

  useEffect(() => {
    // if (updatedData) {
    if (JSON.stringify(columns) !== JSON.stringify(initColumns)) {
      setInitColumns(columns);
      fetch("http://localhost:3001/tasks", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        // nanti tambahin headers access_token
        body: JSON.stringify(columns),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    // }
  }, [columns]);

  if (!loading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", height: "100%" }}
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
                <h2>{column.name}</h2>
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
                            background: snapshot.isDraggingOver
                              ? "lightblue"
                              : "lightgrey",
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
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: "none",
                                        padding: 16,
                                        margin: "0 0 8px 0",
                                        minHeight: "50px",
                                        backgroundColor: snapshot.isDragging
                                          ? "#263B4A"
                                          : "#456C86",
                                        color: "white",
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      {item.title}
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
