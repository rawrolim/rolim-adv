import React from "react";
import { MdOutlineWeekend, MdOutlinePeopleAlt } from "react-icons/md";

export function Card({ data, cardTitle }) {
  return (
        <div className="card">
            <div className="card-header bg-white p-3 pt-2">
              <div className="bg-gradient-dark shadow-dark text-center border-radius-xl mt-n4 position-absolute">
                <MdOutlinePeopleAlt size={60} />
              </div>
              <div className="text-end pt-1">
                <p className="text-sm mb-0 text-capitalize m-2">{cardTitle}</p>
                <hr className="dark horizontal my-2" />
                <h4 className="mb-0 text-primary text-lg font-weight-bolder">{data}</h4>
              </div>
            </div>
          </div>
  );
}

export default Card;
