import React from 'react';
import { useTable } from 'react-table';
import { useSelector, useDispatch } from 'react-redux';
import { removeData, updateData } from '../redux/dataSlice';

import './custom.css';

const DataTable = () => {
  const data = useSelector((state) => state.data.data);
  const dispatch = useDispatch();

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Age',
        accessor: 'age',
      },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <div>
            <button onClick={() => dispatch(removeData(row.original.id))}>
              Delete
            </button>
            <button onClick={() => handleUpdate(row.original)}>Update</button>
          </div>
        ),
      },
    ],
    [dispatch]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  const handleUpdate = (rowData) => {
    const name = prompt('Enter new name', rowData.name);
    const age = prompt('Enter new age', rowData.age);

    if (name || age) {
      dispatch(updateData({ id: rowData.id, name, age }));
    }
  };

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DataTable;
