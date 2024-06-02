import React from "react";
import { MdOutlineWeekend } from "react-icons/md";

export function Card({ data, cardTitle }) {
  return (
        <div className="card">
            <div className="card-header bg-white p-3 pt-2">
              <div className="icon icon-lg icon-shape bg-gradient-dark shadow-dark text-center border-radius-xl mt-n4 position-absolute">
                <MdOutlineWeekend className="opacity-10" />
              </div>
              <div className="text-end pt-1">
                <p className="text-sm mb-0 text-capitalize">{cardTitle}</p>
                <hr className="dark horizontal my-0" />
                <h4 className="mb-0 text-success text-sm font-weight-bolder">{data}</h4>
              </div>
            </div>
          </div>
  );
}

export default Card;
