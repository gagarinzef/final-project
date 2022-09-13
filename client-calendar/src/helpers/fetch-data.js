export const fetchTask = (projectId) => {
  return fetch(`http://localhost:3001/tasks/project/${projectId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      access_token: localStorage.getItem("access_token"),
    },
  });
};
