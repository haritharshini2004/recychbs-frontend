import React from "react";
import { useLocation } from "react-router-dom";
import SortableTable from "../component/SortableTable"; // Import your SortableTable component
import Header from "../component/Header";

function CompletedOrder() {
  const location = useLocation();
  
  // Dummy data for testing
  const dummyData = {
    scrapItems: [
      {
        scrapType: 'Metal',
        scrapCondition: 'Good',
        collectedDate: '2023-10-01',
        amount: '100',
        weight: '50kg',
        status: 'Collected',
      },
      // {
      //   scrapType: 'Plastic',
      //   scrapCondition: 'Fair',
      //   collectedDate: '2023-10-02',
      //   amount: '50',
      //   weight: '20kg',
      //   status: 'Pending',
      // },
      {
        scrapType: 'Paper',
        scrapCondition: 'Excellent',
        collectedDate: '2023-10-03',
        amount: '30',
        weight: '15kg',
        status: 'Collected',
      },
    ],
  };

  // Define columns for the table
  const columns = React.useMemo(
    () => [
      { Header: 'S.No', accessor: 'serialNumber' },
      { Header: 'Scrap Type', accessor: 'scrapType' },
      { Header: 'Scrap Condition', accessor: 'scrapCondition' },
      { Header: 'Collected Date', accessor: 'collectedDate' },
      { Header: 'Amount', accessor: 'amount' },
      { Header: 'Weight', accessor: 'weight' },
      { Header: 'Status', accessor: 'status' },
    ],
    []
  );

  // Prepare data for the table from dummy data
  const data = React.useMemo(
    () =>
      dummyData.scrapItems.map((item, index) => ({
        serialNumber: index + 1,
        scrapType: item.scrapType || 'N/A',
        scrapCondition: item.scrapCondition || 'N/A',
        collectedDate: item.collectedDate || 'N/A',
        amount: item.amount || 'N/A',
        weight: item.weight || 'N/A',
        status: item.status || 'Details from admin',
      })),
    [dummyData] // Dependencies for useMemo
  );

  return (
    <>
      <Header />
      <div className="container-fluid topbottom-user">
        <div className="card-box">
          <h2>Completed Order Details</h2>
          <SortableTable columns={columns} data={data} />
        </div>
      </div>
    </>
  );
}

export default CompletedOrder;
