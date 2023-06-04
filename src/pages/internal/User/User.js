import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchusers } from '../../../store/slices/userSlice';
//import Table from '../../../components/Table/Table.js'
import { COLUMNS } from './columns'
import BasicTable from './BasicTable';
import RowSelectionTable from './RowSelectionTable'

const User = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.user);
  useEffect(() => {
    dispatch(fetchusers());
  }, [])

  const columnDefs = COLUMNS
  return (
    <div className="p-7">
      <h1 className="text-2xl font-semibold">Users</h1>
      <div className='flex justify-center'>
        {users.loading && <div>Loading...</div>}
        {!users.loading && users.error ? <div>Error: {users.error}</div> : null}
        {/* {!users.loading && users.users.length>0 ? (
          <Table 
          columnDefs={columnDefs} 
          rowData={users?.users}
          
           />
        ) : null} */}
        {
          !users.loading && users.users.length > 0 ? (
            <BasicTable
              rowData={users?.users}
              columnDefs={columnDefs}
              isSort
              isGlobalFilter
              pagination
              showPageNumber={false}
              showGotoPage={false}
              showPageSize={false}
              />
            //<RowSelectionTable rowData={users?.users} columnDefs={columnDefs}/>
          ) : null
        }
      </div>
    </div>
  )
}

export default User