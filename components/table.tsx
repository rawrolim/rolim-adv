import React, { useEffect, useState } from "react";
import { FaEllipsisV } from 'react-icons/fa'

export function Table({ title, columns, dataInit, showFilter = true }) {
  const [data, setData] = useState(dataInit);
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(0);
  const pageSize = 8;
  const pages = dataInit.length / pageSize;

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
    <div className="col-12 border p-3">
      <div className="card-header border-bottom d-flex flex-wrap pb-3">
        <h5 className='col-12 col-md-6 col-lg-8 align-self-center'>
          {title}
        </h5>
        {showFilter &&
          <div className="col">
            <input type={'search'} placeholder={'Pesquisar'} className='form-control' onChange={e => setFilter(e.target.value)} />
          </div>
        }
      </div>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              {columns && columns.map((field, fieldIndex) => {
                return (
                  <td key={field.name + '-' + fieldIndex.toString()}>{field.name}</td>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {data && data.map((dataCurrent, dataIndex) => {
              if (dataIndex >= page * pageSize && dataIndex < (page + 1) * pageSize) {
                return (
                  <tr key={'tr-' + dataIndex.toString()}>
                    {columns && columns.map((columnsCurrent, columnsIndex) => {
                      return (
                        <td key={'td-' + dataIndex.toString() + '-' + columnsIndex.toString()}>
                          {columnsCurrent.actions ?
                            <div className='dropstart' key={'td-' + dataIndex.toString() + '-' + columnsIndex.toString() + '-dropdown'}>
                              <button className="btn border" type="button" id={'td-' + dataIndex.toString() + '-' + columnsIndex.toString() + '-dropdown'} data-bs-toggle="dropdown" aria-expanded="false">
                                <FaEllipsisV />
                              </button>
                              <ul className="dropdown-menu" aria-labelledby={'td-' + dataIndex.toString() + '-' + columnsIndex.toString() + '-dropdown'}>
                                {columnsCurrent.actions && columnsCurrent.actions.map((actionCurrent, actionIndex) => {
                                  const valuesParams = [];
                                  actionCurrent.fieldParams.map(field =>
                                    valuesParams.push(dataCurrent[field])
                                  )
                                  return (
                                    <li key={'td-' + dataIndex.toString() + '-' + columnsIndex.toString() + '-' + actionIndex.toString() + '-li'} >
                                      <button key={'td-' + dataIndex.toString() + '-' + columnsIndex.toString() + '-' + actionIndex.toString()} onClick={() => actionCurrent.handler(valuesParams)} className={'btn'}>
                                        {actionCurrent.icon} {actionCurrent.name}
                                      </button>
                                    </li>
                                  )
                                })}
                              </ul>
                            </div>
                            :
                            <div key={'td-' + dataIndex.toString() + '-' + columnsIndex.toString() + '-data'} className='align-self-center'>
                              {columnsCurrent.field == 'index' ? (dataIndex + 1).toString() : dataCurrent[columnsCurrent.field]}
                            </div>
                          }
                        </td>
                      )
                    })}
                  </tr>
                )
              }
            })}
          </tbody>
        </table>
      </div>
      {dataInit &&
        <div className="container ">
          <div className='row '>
            <div className='col align-self-center '>
              Qtd: {dataInit.length}
              <br />
              Página {page + 1} de {(pages<1?1:pages).toFixed(0)}
            </div>
            <div className='col align-self-center '>
              <div className='row justify-content-end'>
                <div className="w-auto ">
                  <ul className="pagination m-0">
                    <li className={`page-item ${page == 0 && 'disabled'}`}><a className="page-link" onClick={() => setPage(page - 1)}>Anterior</a></li>
                    <li className="page-item"><a className="page-link" onClick={() => setPage(page)}>{page + 1}</a></li>
                    <li className={`page-item ${Number((pages<1?1:pages).toFixed(0)) == Number(page+1) && 'disabled'}`}><a className="page-link" onClick={() => setPage(page + 1)}>Próximo</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default Table;
