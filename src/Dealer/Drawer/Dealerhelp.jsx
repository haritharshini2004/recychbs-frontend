import { useNavigate } from "react-router-dom";
import Headerdealer from "../../component/Headerdealer";

function Dealerhelp() {
  const navigate = useNavigate();

  return (
    <>
      <Headerdealer />
      <div className="container-fluid topbottom">
        <h1>Dealer Help</h1>
        <p>If you have any questions or need assistance, you're in the right place!</p>

        <h2>Frequently Asked Questions</h2>
        <ul>
          <li>
            <strong>How do I update my dealer profile?</strong>
            <p>You can update your profile in the settings section of your dashboard.</p>
          </li>
          <li>
            <strong>What should I do if I encounter a technical issue?</strong>
            <p>Please contact our support team through the contact form or call us at 1-800-123-4567.</p>
          </li>
          <li>
            <strong>How can I access training resources?</strong>
            <p>Training materials are available in the resources section of your account.</p>
          </li>
        </ul>

        <h2>Contact Us</h2>
        <p>If you need further assistance, please reach out to our support team:</p>
        <p>Email: support@dealerhelp.com</p>
        <p>Phone: 1-800-123-4567</p>

        <h2>Additional Resources</h2>
        <ul>
          <li>
            <a href="/tutorials" onClick={() => navigate("/tutorials")}>Dealer Tutorials</a>
          </li>
          <li>
            <a href="/faq" onClick={() => navigate("/faq")}>Full FAQ</a>
          </li>
          <li>
            <a href="/community" onClick={() => navigate("/community")}>Dealer Community Forum</a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Dealerhelp;
