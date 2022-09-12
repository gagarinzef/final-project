import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function TableBaru() {
  const [rowdata, setRowData] = useState([]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th id="teass" name="teass">
              teass
            </th>
            <th>des</th>
            <th>se</th>
            <th>co</th>
          </tr>
        </thead>
        <tbody>
          <tr>
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
          </tr>
        </tbody>
      </table>
    </div>
  );
}
