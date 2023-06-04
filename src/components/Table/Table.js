import React from 'react'
import TableRow from './TableRow'

const Table = (props) => {
  const { columnDefs, rowData } = { ...props }

  const checkRownNumber = (rowIndex) => {
    return rowIndex % 2 === 0;
  }
  return (
    <div>
      <table className='w-full'>
        <thead className='bg-gray-50 border-b-2 border-gray-200'>
          <tr>
            {
              columnDefs?.map((column, index) => (
                !column?.hidden && <th className='p-3 text-sm font-semibold tracking-wide text-left' key={`column_${column?.headerName}_${index}`} >{column?.headerName}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            rowData && rowData?.map((row, index) => (
              <TableRow rowStyle={checkRownNumber(index)? "bg-white":"bg-gray-50"} key={`row_${index}`} columnDefs={columnDefs} rowData={row} />
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default Table
