import { useEffect, useState } from "react";
import SideNav from "./SideNav";
import TableInput from "./TableInput";

export default function TableTest() {
  const [dataTask, setTask] = useState();

  // useEffect(){

  // }
  return (
    <div className="bg-biru h-screen">
      {/* <SideNav /> */}
      <div className="">
        <div>
          <table>
            <thead className="text-white">
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Assignees</th>
                <th>Due Date</th>
                <th>Priority</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <TableInput />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
