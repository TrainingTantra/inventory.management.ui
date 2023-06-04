
export const COLUMNS = [
    {
        Header: 'ID',
        accessor: 'id'
    },
    {
        Header: 'UserId',
        accessor: 'userId',
        hidden:true
    },
    {
        Header: "Title",
        accessor: "title",
    },
    {
        Header: "Completed",
        accessor: "completed",
        Cell:({value})=>{
            return value?'Yes':'No'
        }
    }
]