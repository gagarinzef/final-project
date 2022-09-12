import SideNav from "./SideNav";

export default function TableTest() {
  return (
    <div className="bg-biru h-screen">
      <SideNav />
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
              <tr>
                <td className="">
                  <input />
                </td>
                <td>
                  <input />
                </td>
                <td>
                  <input />
                </td>
                <td>
                  <input />
                </td>
                <td>
                  <input />
                </td>
                <td>
                  <input />
                </td>
                <td>
                  <input />
                </td>
                <td>
                  <button className="px-2 bg-white rounded">submit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
