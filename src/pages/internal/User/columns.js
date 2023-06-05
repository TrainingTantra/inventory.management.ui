import StatusPill from "../../../utils/TableUtils/StatusPill";
//import AvatarCell from "../../../utils/TableUtils/AvatarCell";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
export const COLUMNS = [
  {
    Header: "ID",
    accessor: "id",
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
    Cell: (value) => {
      return (
        <>
          <div className="flex text-xl">
            <button onClick={() => handleUserEdit}>
              <AiOutlineEdit className="text-sky-600 mr-2" />
            </button>
            <button onClick={() => handleUserDelete}>
              <AiOutlineDelete className="text-red-600" />
            </button>
          </div>
        </>
      );
    },
  },
];
