import axios from "axios";

const updateMyData = async (index, id, value) => {
  try {
    let { data } = await axios.patch(`http://localhost:3001/tasks/${index}`, {
      id: value,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default updateMyData;
