import { useNavigate } from "react-router-dom";
import Header from "../../component/Header";

function Yourbooking() {
  const booking = [
    {
      id: 1,
      name: "Booking 1",
      amount: "amt",
      status: "status",
    },
    {
      id: 2,
      name: "Booking 2",
      amount: "amt",
      status: "status",
    },
    {
      id: 3,
      name: "Booking 3",
      amount: "amt",
      status: "status",
    },
  ];

  const navigate = useNavigate();

  return (
   <>
   <Header/>
    <div className="container-fluid topbottom-user">
      <div className="card-box">
        <table className="table">
          <thead>
            <tr>
              <th>BOOKING ID:</th>
              <th>DATE:</th>
              <th>AMOUNT:</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {booking.map((item,id) => (
              <tr key={id}>
                <th scope="row">{item.id}</th>
                <td
                >
                  {item.name}
                </td>
                <td>{item.amount}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
   </>
  );
}

export default Yourbooking;
