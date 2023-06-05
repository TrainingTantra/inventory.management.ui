import StatusPill from "../../../utils/TableUtils/StatusPill";
//import AvatarCell from "../../../utils/TableUtils/AvatarCell";
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
    Cell: (value) => {
      return <StatusPill value={value === 1 ? "Yes" : "No"} />;
    },
  },
];
