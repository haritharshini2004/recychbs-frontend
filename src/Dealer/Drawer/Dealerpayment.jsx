import { useNavigate } from "react-router-dom";
import Headerdealer from "../../component/Headerdealer";
import SortableTable from "../../component/SortableTable"; // Import the sortable table component

function Dealerpayment() {
  const navigate = useNavigate();

  // Sample payment data
  const payments = [
    { id: 1, orderId: "Order-1", orderName: "Order 1", amount: 100, paymentStatus: "Paid" },
    { id: 2, orderId: "Order-2", orderName: "Order 2", amount: 150, paymentStatus: "Pending" },
    { id: 3, orderId: "Order-3", orderName: "Order 3", amount: 200, paymentStatus: "Paid" },
  ];

  // Define columns for the sortable table
  const columns = [
    {
      Header: "Payment ID",
      accessor: "id",
    },
    {
      Header: "Order ID",
      accessor: "orderId",
    },
    {
      Header: "Order Name",
      accessor: "orderName",
    },
    {
      Header: "Amount",
      accessor: "amount",
    },
    {
      Header: "Payment Status",
      accessor: "paymentStatus",
      Cell: ({ row }) => (
        <span style={{ color: row.original.paymentStatus === "Paid" ? "green" : "orange" }}>
          {row.original.paymentStatus}
        </span>
      ),
    },
  ];

  return (
    <>
      <Headerdealer />
      <div className="container-fluid topbottom">
        <h3 style={{ margin: '20px 0' }}>Payment Details</h3>
        <SortableTable columns={columns} data={payments} />
      </div>
    </>
  );
}

export default Dealerpayment;
