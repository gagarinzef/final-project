import axios from "axios";
import { useState } from "react";

const [data, setData] = useState([]);
const updateMyData = (index, id, value) => {
  // We also turn on the flag to not reset the page

  setData((old) =>
    old.map((row, index) => {
      if (index === index) {
        return {
          ...old[index],
          [id]: value,
        };
      }
      return row;
    })
  );
};

export default updateMyData;
