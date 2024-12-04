import { useNavigate } from "react-router-dom";
import Headerdealer from "../../component/Headerdealer";
import SortableTable from "../../component/SortableTable"; // Adjust the import path if necessary

function Dealerorder() {
  const order = [
    { id: 1, name: "order 1", amount: "amt", status: "view" },
    { id: 2, name: "order 2", amount: "amt", status: "view" },
    { id: 3, name: "order 3", amount: "amt", status: "view" },
  ];

  const navigate = useNavigate();

  // Define columns for the sortable table
  const columns = [
    {
      Header: "Order ID",
      accessor: "id", // accessor is the "key" in the data
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Amount",
      accessor: "amount",
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ row }) => (
        <span
          onClick={() => navigate("/Dealerorderview", { state: { item: row.original } })}
          style={{ cursor: "pointer", color: "blue" }}
        >
          {row.original.status}
        </span>
      ),
    },
  ];

  return (
    <>
      <Headerdealer />
      <div className="container-fluid topbottom">
        <div className="card-box">
        <h2>Your Orders</h2>
          <SortableTable columns={columns} data={order} />
        </div>
      </div>
    </>
  );
}

export default Dealerorder;
