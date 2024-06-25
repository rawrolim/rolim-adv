import React, { useEffect, useState } from "react";

export function Table({ title, columns, dataInit, showFilter = true }) {
  const [data, setData] = useState(dataInit);
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(0);
  const pageSize = 10;

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
              {columns && columns.map((field,fieldIndex) => {
                return (
                  <td key={field.name+'-'+fieldIndex.toString()}>{field.name}</td>
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
                            <div className='btn-group' key={'td-' + dataIndex.toString() + '-' + columnsIndex.toString()+'-btn-group'}>
                              {columnsCurrent.actions && columnsCurrent.actions.map((actionCurrent, actionIndex) => {
                                const valuesParams = [];
                                actionCurrent.fieldParams.map(field =>
                                  valuesParams.push(dataCurrent[field])
                                )
                                return (
                                  <button key={'td-' + dataIndex.toString() + '-' + columnsIndex.toString()+'-'+actionIndex.toString()} onClick={() => actionCurrent.handler(valuesParams)} className={'btn btn-' + actionCurrent.btnColor}>
                                    {actionCurrent.icon}
                                  </button>
                                )
                              })}
                            </div>
                            :
                            <div key={'td-' + dataIndex.toString() + '-' + columnsIndex.toString()+'-data'} className='align-self-center'>
                              {dataCurrent[columnsCurrent.field]}
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
        {dataInit &&
          <div className="d-flex flex-wrap">
            <div className='col align-self-center'>
              Qtd: {dataInit.length}
            </div>
            <div className='col align-self-center'>
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className={`page-item ${page == 0 && 'disabled'}`}><a className="page-link" onClick={() => setPage(page - 1)}>Anterior</a></li>
                  <li className="page-item"><a className="page-link" onClick={() => setPage(page)}>{page + 1}</a></li>
                  <li className="page-item"><a className="page-link" onClick={() => setPage(page + 1)}>Próximo</a></li>
                </ul>
              </nav>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default Table;
