import React from 'react';
import { useTable, useSortBy, usePagination, useGlobalFilter } from 'react-table';
import './SortableTable.css'; // Import your custom CSS styles

const SortableTable = ({ columns, data, showSearch = true, showPagination = true }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
    gotoPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    page,
    nextPage,
    previousPage,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 5 },
    },
    useGlobalFilter,
    useSortBy,
    showPagination ? usePagination : []
  );

  return (
    <div className="table-sorting">
      {showSearch && (
        <input
          type="text"
          placeholder="Search..."
          onChange={e => setGlobalFilter(e.target.value)}
          className="form-control mb-3"
        />
      )}
      <table {...getTableProps()} className="table table-striped table-bordered">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.length === 0 ? (
            <tr>
              <td className="dataTables_empty" colSpan={columns.length}>No data available</td>
            </tr>
          ) : (
            page.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()} data-label={cell.column.Header}>
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      {showPagination && (
        <>
          <div className="dataTables_info">
            {rows.length === 0 ? (
              'Showing 0 to 0 of 0 data'
            ) : (
              `Showing ${state.pageIndex * state.pageSize + 1} to ${Math.min(
                (state.pageIndex + 1) * state.pageSize,
                rows.length
              )} of ${rows.length} data`
            )}
          </div>
          <div className="dataTables_paginate d-flex justify-content-between align-items-center mt-3">
            <div>
              <button className="btn btn-secondary me-1" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                {'<<'}
              </button>
              <button className="btn btn-secondary me-1" onClick={previousPage} disabled={!canPreviousPage}>
                {'<'}
              </button>
              <button className="btn btn-secondary me-1" onClick={nextPage} disabled={!canNextPage}>
                {'>'}
              </button>
              <button className="btn btn-secondary" onClick={() => gotoPage(pageOptions.length - 1)} disabled={!canNextPage}>
                {'>>'}
              </button>
            </div>
            <span className="mx-2">
              Page <strong>{state.pageIndex + 1} of {pageOptions.length}</strong>
            </span>
            <select
              className="form-select w-auto"
              value={state.pageSize}
              onChange={e => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[5, 10, 15, 20].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
    </div>
  );
};

export default SortableTable;
