import React, { useMemo } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
  useRowSelect,
} from "react-table";
import GlobalFilter from "./GlobalFilter";
import ColumnFilter from "./ColumnFilter";
import { Checkbox } from "./Checkbox";
import {
  SortIcon,
  SortDownIcon,
  SortUpIcon,
} from "../../utils/TableUtils/Icons";
import {
  BiChevronsLeft,
  BiChevronLeft,
  BiChevronRight,
  BiChevronsRight,
} from "react-icons/bi";
import { Button, PageButton } from "../../utils/Button";

const Table = (props) => {
  const {
    rowData,
    columnDefs,
    isGlobalFilter,
    isColumnFilter,
    isSort,
    pagination,
    showPageNumber = true,
    showPageSize = true,
    selectRows = false,
  } = { ...props };
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
      Filter: ColumnFilter,
    };
  }, []);

  const initialState = {
    hiddenColumns: columnDefs
      ?.filter((column) => column?.hidden === true)
      .map((c) => {
        return c.accessor;
      }),
  };

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
    selectedFlatRows,
  } = useTable(
    {
      columns: columnDefs,
      data: rowData,
      defaultColumn,
      initialState,
    },
    ...filters,
    useRowSelect,
    (hooks) => {
      selectRows &&
        hooks.visibleColumns.push((columns) => {
          return [
            {
              id: "selection",
              Header: ({ getToggleAllRowsSelectedProps }) => (
                <Checkbox {...getToggleAllRowsSelectedProps()} />
              ),
              Cell: ({ row }) => (
                <Checkbox {...row.getToggleRowSelectedProps()} />
              ),
            },
            ...columns,
          ];
        });
    }
  );
  const { globalFilter, pageIndex, pageSize } = state;
  const firstPageRows = rows.slice(0, 10);
  return (
    <>
      <div className="flex gap-x-2">
        {isGlobalFilter && (
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        )}
      </div>
      <div className="mt-2 flex flex-col">
        <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table
                {...getTableProps()}
                className="min-w-full divide-y divide-gray-200"
              >
                <thead className="bg-gray-50">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          scope="col"
                          className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          {...column.getHeaderProps(
                            isSort && column.getSortByToggleProps()
                          )}
                        >
                          <div className="flex items-center justify-between">
                            {<span>{column.render("Header")}</span>}
                            <span>
                              {column.isSorted ? (
                                column.isSortedDesc ? (
                                  <SortDownIcon className="w-4 h-4 text-gray-400" />
                                ) : (
                                  <SortUpIcon className="w-4 h-4 text-gray-400" />
                                )
                              ) : (
                                <SortIcon className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100" />
                              )}
                            </span>
                          </div>
                          <div>
                            {isColumnFilter && column.canFilter
                              ? column.render("Filter")
                              : null}
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody
                  {...getTableBodyProps()}
                  className="bg-white divide-y divide-gray-200"
                >
                  {firstPageRows.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <td
                              {...cell.getCellProps()}
                              className="px-6 py-4 whitespace-nowrap"
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {pagination && (
        <div className="py-3 flex items-center justify-between">
          <div className="flex-1 flex justify-between sm:hidden">
            <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
              Previous
            </Button>
            <Button onClick={() => nextPage()} disabled={!canNextPage}>
              Next
            </Button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div className="flex gap-x-2">
              {showPageNumber && (
                <span className="text-sm text-gray-700">
                  Page <span className="font-medium">{pageIndex + 1}</span> of{" "}
                  <span className="font-medium">{pageOptions.length}</span>
                </span>
              )}
              {showPageSize && (
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                  }}
                >
                  {[5, 10, 20].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      Show {pageSize}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <PageButton
                  className="rounded-l-md"
                  onClick={() => gotoPage(0)}
                  disabled={!canPreviousPage}
                >
                  <span className="sr-only">First</span>
                  <BiChevronsLeft className="h-5 w-5" aria-hidden="true" />
                </PageButton>
                <PageButton
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                >
                  <span className="sr-only">Previous</span>
                  <BiChevronLeft className="h-5 w-5" aria-hidden="true" />
                </PageButton>
                <PageButton onClick={() => nextPage()} disabled={!canNextPage}>
                  <span className="sr-only">Next</span>
                  <BiChevronRight className="h-5 w-5" aria-hidden="true" />
                </PageButton>
                <PageButton
                  className="rounded-r-md"
                  onClick={() => gotoPage(pageCount - 1)}
                  disabled={!canNextPage}
                >
                  <span className="sr-only">Last</span>
                  <BiChevronsRight className="h-5 w-5" aria-hidden="true" />
                </PageButton>
              </nav>
            </div>
          </div>
        </div>
      )}
      {/* <pre>
        <code>
          {JSON.stringify(
            {
              selectedRows: selectedFlatRows.map((row) => row.original),
            },
            null,
            2
          )}
        </code>
      </pre> */}
    </>
  );
};

export default Table;
