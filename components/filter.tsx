import React from "react";
import { MdOutlineWeekend, MdOutlinePeopleAlt } from "react-icons/md";

export function Filter({ data, title }) {
  return (
    <div className="card mx-1 my-4">
      <div className="card-header bg-white p-3 pt-2">
        <div className="text-start pt-1">
          <p className="text-sm mb-0 text-capitalize m-2">{title}</p>
          <hr className="dark horizontal my-2" />
          <div className="dropdown">
            <button
              className="btn btn-dark dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Dropdown button
            </button>
            <ul className="dropdown-menu">
                <input type="search" className="m-2"/>
                <li>
                    <a className="dropdown-item" href="#">
                    {data}
                    </a>
                </li>
                <li>
                    <a className="dropdown-item" href="#">
                    Option
                    </a>
                </li>
                <li>
                    <a className="dropdown-item" href="#">
                    Option
                    </a>
                </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
