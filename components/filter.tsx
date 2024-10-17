import React, { useEffect, useState } from "react";
import { MdOutlineWeekend, MdOutlinePeopleAlt } from "react-icons/md";

export function Filter({ dataInit, title, select }) {
  const [data, setData] = useState(dataInit);
  const [filter, setFilter] = useState('');
  const[selection, setSelect] = useState(select);

  const applyFilters = () => {
    if (dataInit) {
      let filteredUsers = [...dataInit];

      if (filter) {
        filteredUsers = filteredUsers.filter(user =>
          Object.values(user).some(value => {
            if (value) {
              return value.toString().toLowerCase().includes(filter)
            }
          }
          )
        );
      }

      setData(filteredUsers);
    } else {
      setData([]);
    }
  };

  useEffect(() => {
    applyFilters()
  }, [filter, dataInit]);
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
              Selecione
            </button>
            <ul className="dropdown-menu">
            <input type={'search'} placeholder={'Pesquisar'} className='form-control' onChange={e => setFilter(e.target.value)} />
              {data.map((item, index) => (
                <li key={index}>
                  <a className="dropdown-item" onChange={selection}>
                  {item["MONTH(data_distribuicao)"] || item["YEAR(data_distribuicao)"] || item.nome}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
