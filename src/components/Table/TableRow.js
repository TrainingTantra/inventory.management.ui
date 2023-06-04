import React from 'react'

const TableRow = (props) => {
    const { columnDefs, rowData, rowStyle } = { ...props }
    return (
        <tr className={rowStyle}>
            {
                rowData &&
                columnDefs?.map((column, index) =>
                    <td 
                    key={`row_cell_${column?.headerName}_${index}`}
                    className='p-3 text-sm text-gray-700'
                    >{rowData[column?.field]}</td>
                )
            }
        </tr>
    )
}

export default TableRow
