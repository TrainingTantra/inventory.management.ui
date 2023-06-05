import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchusers } from "../../../store/slices/userSlice";
//import { COLUMNS } from "./columns";
import Table from "../../../components/Table/Table";
import {
  AiFillPlusCircle,
  AiOutlineEye,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";
import Modal from "../../../components/Modal";
import CreateUser from "./CreateUser";
//import StatusPill from "../../../utils/TableUtils/StatusPill";
//import AvatarCell from "../../../utils/TableUtils/AvatarCell";

const User = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchusers());
  }, []);

  const handleUserEdit = (value) => {
    console.log("Message from Edit", value);
  };
  const handleUserDelete = (value) => {
    console.log("Message from Delete", value);
  };
  const handleUserView = (value) => {
    console.log("Message from View", value);
  };

  const columnDefs = [
    {
      Header: "ID",
      accessor: "id",
      id: (value) => {
        return "id_" + value;
      },
    },
    {
      Header: "Name",
      accessor: "name",
      imgAccessor: "avatar",
      //Cell: AvatarCell,
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "User Name",
      accessor: "username",
      // Cell: (value) => {
      //   return <StatusPill value={value === 1 ? "Yes" : "No"} />;
      // },
    },
    {
      Header: "Actions",
      accessor: "id",
      id: (value) => {
        return "action_id_" + value;
      },
      Cell: (data) => {
        return (
          <>
            <div className="flex text-xl">
              <button onClick={() => handleUserView(data.value)}>
                <AiOutlineEye className="text-green-600 mr-2" />
              </button>
              <button onClick={() => handleUserEdit(data.value)}>
                <AiOutlineEdit className="text-sky-600 mr-2" />
              </button>
              <button onClick={() => handleUserDelete(data.value)}>
                <AiOutlineDelete className="text-red-600" />
              </button>
            </div>
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className="w-full min-h-screen bg-gray-100 text-gray-900">
        <main className="mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="">
            <h1 className="text-xl font-semibold">Users</h1>
          </div>
          <div className="mt-4">
            <div className="flex justify-end">
              <button
                data-modal-target="authentication-modal"
                data-modal-toggle="authentication-modal"
                className="flex justify-evenly items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
                onClick={() => setShowModal(true)}
              >
                <AiFillPlusCircle className="mr-2 text-sm" />
                <span className="text-sm">Add New User</span>
              </button>
              <Modal
                isVisible={showModal}
                onClose={() => setShowModal(false)}
                modalTitle="Create user"
              >
                {showModal && <CreateUser />}
              </Modal>
            </div>
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
