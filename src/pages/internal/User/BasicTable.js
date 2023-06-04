import React, { useMemo } from 'react'
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination, useRowSelect } from 'react-table'
import GlobalFilter from './GlobalFilter'
import './table.css'
import ColumnFilter from './ColumnFilter'
import { Checkbox } from './Checkbox'

const BasicTable = (props) => {
    const { rowData, columnDefs, isGlobalFilter, isColumnFilter, isSort, pagination, showPageNumber = true, showGotoPage = true, showPageSize = true } = { ...props }
    var filters = [];
    if (!isSort && isColumnFilter) {
        filters.push(useFilters);
    }
    if (isGlobalFilter) {
        filters.push(useGlobalFilter);
    }
    if (isSort) {
        filters.push(useSortBy);
    }
    if (pagination) {
        filters.push(usePagination);
    }
    const defaultColumn = useMemo(() => {
        return {
            Filter: ColumnFilter
        }
    }, [])

    const initialState = { hiddenColumns: columnDefs?.filter(column => column?.hidden === true).map(c => { return c.accessor }) };

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        prepareRow,
        setPageSize,
        state,
        setGlobalFilter,
        selectedFlatRows
    } = useTable({
        columns: columnDefs,
        data: rowData,
        defaultColumn,
        initialState
    },
        ...filters,
        useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push((columns) => {
                return [
                    {
                        id: 'selection',
                        Header: ({ getToggleAllRowsSelectedProps }) => (
                            <Checkbox {...getToggleAllRowsSelectedProps()} />
                        ),
                        Cell: ({ row }) => (
                            <Checkbox {...row.getToggleRowSelectedProps()} />
                        )
                    },
                    ...columns
                ]
            })
        })
    const { globalFilter, pageIndex, pageSize } = state
    const firstPageRows = rows.slice(0, 10)
    const paginationStyle = {
        padding: '1px',
        margin:'4px',
        display: 'flex',
        justifyContent: "space-between",
        float: 'right'
    }
    return (
        <div className=''>
            {isGlobalFilter && <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />}
            <table {...getTableProps()}>
                <thead>
                    {
                        headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {
                                    headerGroup.headers.map(column => (
                                        <th {...column.getHeaderProps(isSort && column.getSortByToggleProps())}>
                                            {column.render('Header')}
                                            <span>
                                                {column.isSorted ? (column.isSortedDesc ? <i class="fa fa-fw fa-sort-desc"></i> : <i class="fa fa-fw fa-sort-asc"></i>) : ''}
                                            </span>
                                            <div>{isColumnFilter && column.canFilter ? column.render('Filter') : null}</div>
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
            {
                pagination && <div style={{ ...paginationStyle }}>
                    {showPageNumber && <span style={{padding:"2px"}}>
                        Page{' '}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>{' '}
                    </span>}
                    {showPageNumber && showGotoPage &&<span> | </span>}
                    {showGotoPage && <span style={{padding:"2px"}}>
                        Go to page: {' '}
                        <input type='number' defaultValue={pageIndex + 1}
                            onChange={e => {
                                const pageNumber = e.target.value ? Number(e.target.value) - 1
                                    : 0
                                gotoPage(pageNumber)
                            }} style={{ width: '50px' }} />
                    </span>}
                    {showPageSize &&<span style={{padding:"2px"}}> Show <select
                        value={pageSize}
                        onChange={e => setPageSize(Number(e.target.value))}>
                        {
                            [10, 20, 50].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    {pageSize}
                                </option>
                            ))
                        }
                    </select></span>}
                    <span>
                        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<< '}</button>
                        <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous </button>
                        <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
                        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{' >>'}</button>
                    </span>
                </div>}
            <pre>
                <code>
                    {
                        JSON.stringify(
                            {
                                selectedRows: selectedFlatRows.map((row) => row.original)
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
