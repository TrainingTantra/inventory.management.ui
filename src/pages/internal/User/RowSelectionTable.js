import React from 'react'
import { useTable, useRowSelect } from 'react-table'
import './table.css'
import { Checkbox } from './Checkbox'

const BasicTable = (props) => {
    const { rowData, columnDefs } = { ...props }

    const { 
        getTableProps, 
        getTableBodyProps, 
        headerGroups, 
        rows, 
        prepareRow, 
        selectedFlatRows 
    } = useTable({
        columns: columnDefs,
        data: rowData
    },
        useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push((columns) => {
                return [
                    {
                        id: 'selection',
                        Header: ({ getToggleAllRowsSelectedProps }) => (
                            <Checkbox {...getToggleAllRowsSelectedProps()} />
                        ),
                        cell: ({ row }) => (
                            <Checkbox {...row.getToggleRowSelectedProps()} />
                        )
                    },
                    ...columns
                ]
            })
        })
    const firstPageRows = rows.slice(0, 10)
    return (
        <div className='flex flex-col'>
            <table {...getTableProps()}>
                <thead>
                    {
                        headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {
                                    headerGroup.headers.map(column => (
                                        <th {...column.getHeaderProps()}>
                                            {column.render('Header')}
                                        </th>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        firstPageRows.map((row) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {
                                        row.cells.map((cell) => {
                                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <pre>
                <code>
                    {
                        JSON.stringify(
                            {
                                selectedRowsData: selectedFlatRows.map((row) => row.original)
                            },
                            null,
                            2
                        )
                    }
                </code>
            </pre>
        </div>
    )
}

export default BasicTable
