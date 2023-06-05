import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchusers } from "../../../store/slices/userSlice";
import { COLUMNS } from "./columns";
import Table from "../../../components/Table/Table";

const User = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(fetchusers());
  }, []);

  const columnDefs = COLUMNS;
  return (
    <>
      <div className="w-full min-h-screen bg-gray-100 text-gray-900">
        <main className="mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="">
            <h1 className="text-xl font-semibold">Users</h1>
          </div>
          <div className="mt-4">
            {users.loading && <div>Loading...</div>}
            {!users.loading && users.error ? (
              <div>Error: {users.error}</div>
            ) : null}
            {!users.loading && users.users.length > 0 ? (
              <Table
                rowData={users?.users}
                columnDefs={columnDefs}
                isSort
                isGlobalFilter
                pagination
                showPageNumber={true}
                showGotoPage={true}
                showPageSize={true}
              />
            ) : null}
          </div>
        </main>
      </div>
    </>
  );
};

export default User;
