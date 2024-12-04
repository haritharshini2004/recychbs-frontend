import React from 'react';
import { useNavigate } from 'react-router-dom';
import Headerdealer from '../component/Headerdealer';
import SortableTable from '../component/SortableTable'; // Adjust the import path as needed

const CompleteOrder = () => {
  const navigate = useNavigate();

  // Dummy data for scrap orders
  const scrapData = [
    {
      scrapType: "Metal",
      scrapCondition: "Good",
      phoneno: "1234567890",
    },
    {
      scrapType: "Plastic",
      scrapCondition: "Fair",
      phoneno: "9876543210",
    },
    {
      scrapType: "Paper",
      scrapCondition: "Excellent",
      phoneno: "5551234567",
    },
    {
      scrapType: "Glass",
      scrapCondition: "Damaged",
      phoneno: "4445556666",
    },
    {
      scrapType: "Electronics",
      scrapCondition: "Working",
      phoneno: "3337778888",
    },
  ];

  // Define columns for the sortable table
  const columns = React.useMemo(
    () => [
      {
        Header: 'No',
        accessor: 'index', // We will handle this in the data preparation
      },
      {
        Header: 'Scrap Type',
        accessor: 'scrapType',
      },
      {
        Header: 'Scrap Condition',
        accessor: 'scrapCondition',
      },
      {
        Header: 'Phone Number',
        accessor: 'phoneno',
      },
      {
        Header: 'Details',
        accessor: 'details',
        Cell: ({ row }) => (
          <span
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => navigate("/Completeorderdetail", { state: { entry: row.original } })}>
            View
          </span>
        ),
      },
    ],
    [navigate]
  );

  // Prepare data for the sortable table, including index
  const data = React.useMemo(
    () =>
      scrapData.map((entry, index) => ({
        ...entry,
        index: index + 1, // Adding index to the entry
      })),
    [scrapData]
  );

  return (
    <>
      <Headerdealer />
      <div className="container-fluid topbottom">
        <div className="card-box">
          <h2>Complete Orders</h2>
          <SortableTable columns={columns} data={data} showSearch={true} showPagination={true} />
        </div>
      </div>
    </>
  );
};

export default CompleteOrder;
