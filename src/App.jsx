import './App.css';
import '../src/style/Footer.css';
import '../src/style/OngoingOrder.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register1 from './screen/Register1';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './screen/Login';
import Forgotpassword from './screen/Forgotpassword';
import Success from './screen/Success';
import Notification from './screen/Notification';
import Homedealer from './Dealer/Homedealer';
import Todayscrap from './Dealer/Todayscrap';
import Dealerdetails from './Dealer/Dealerdetails';
import Scrapdetail from './Dealer/Scrapdetail';
import Completeorder from './Dealer/Completeorder';
import Completeorderdetail from './Dealer/Completeorderdetails';
import Feedback from './Dealer/Feedback';
import Applicationstatus from './Dealer/Applicationstatus';
import Dealerlogopage from './Dealer/Dealerlogopage';
import Dealeraccount from './Dealer/Drawer/Dealeraccount';
import Dealercustomer from './Dealer/Drawer/Dealercustomer';
import Dealerhelp from './Dealer/Drawer/Dealerhelp';
import Dealerorder from './Dealer/Drawer/Dealerorder';
import Dealerpayment from './Dealer/Drawer/Dealerpayment';
import Dealerorderview from './Dealer/Drawer/Dealerorderview';
import Homeuser from './User/Homeuser';
import Scrapselect from './User/Scrapselect';
import Bookdealer from './User/Bookdealer';
import Successful from './User/Successful';
import Userlogopage from './User/Userlogopage';
import Aboutus from './User/FooterScreen/Aboutus';
import Becomedealer from './User/FooterScreen/Becomedealer';
import BookingProtection from './User/FooterScreen/BookingProtection';
import Career from './User/FooterScreen/Career';
import Fulfillment from './User/FooterScreen/Fullfillment';
import Sellon from './User/FooterScreen/sellon';
import Useraccount from './User/Drawer/Useraccount';
import Usercustomer from './User/Drawer/Usercustomer';
import Userfaq from './User/Drawer/Userfaq';
import Userhelp from './User/Drawer/Userhelp';
import Yourbooking from './User/Drawer/Yourbooking';
import UpdateScrap from './Dealer/AdminUpdateScrap'
import InsertScrap from './Dealer/AdminInsertScrap'
import Analytics from './Dealer/Analytics';
import Usernotification from './User/Usernotification';
import Dealernotification from './Dealer/Dealernotification';
import Userlanguage from './User/Userlanguage';
import Dealerlanguage from './Dealer/Dealerlanguage';
import Usereditdetail from './User/Usereditdetail';
import Dealereditdetail from './Dealer/Dealereditdetail';
import Userqns from './User/Userqns';
import Dealerquery from './Dealer/Dealerquery';
import Dealerqns from './Dealer/Dealerqns';
import Dealerfaq from './Dealer/Dealerfaq';
import UserTerms from './User/UserTerms';
import DealerTerm from './Dealer/DealerTerm';
import RegisterUser from './screen/RegisterUser';
import Forgetpassworduser from './screen/Forgetpassworduser';
import PasswordConfirmation from './screen/PasswordConfirmation';
import OtpVerification from './screen/OtpVerification';
import Datadel from './component/Datadel';
import CompletedOrder from './User/CompletedOrder';
import OngoingOrder from './User/OngoingOrder';
import Logout from './screen/Logout';
import { AuthProvider } from './screen/AuthContext';
import ProtectedRoute from './screen/ProtectedRoute';
import UploadBankDetails from './User/Drawer/UploadBankDetails';
import Base64Testing from './Dealer/Base64Testing';
import Base64Testing2 from './Dealer/Base64Testing2';
import LocationTesting from './Dealer/locationTesting';
import NearbyUsers from './Dealer/nearbyUsers';
import PhoneAuth from './screen/PhoneAuth';
import Orders from './Dealer/Orders';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics as Ana } from "@vercel/analytics/react"
import Headerdealer from './component/Headerdealer';


function App() {

  return (
    <>
    <SpeedInsights/>
    <Ana/> 
      <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Register1' element={<Register1 />} />
          <Route path='/RegisterUser' element={<RegisterUser />} />
          <Route path='/Success' element={<Success />} />
          <Route path='/OtpVerification' element={<OtpVerification />} />
          <Route path='/password-reset' element={<Forgotpassword />} />
          <Route path='/Forgetpassworduser' element={<Forgetpassworduser />} />
          <Route path="/reset/:uid/:token" element={<PasswordConfirmation />} />
          <Route path='/Notification' element={<Notification />} />
          <Route path='/Datadel' element={<Datadel />} />
          <Route path='/Applicationstatus' element={<Applicationstatus />} />
          <Route path='/PhoneAuth' element={<PhoneAuth />} />

          {/* ----------------------///DEALER////---------------------------- */}
          <Route path='/Homedealer' element={
            <ProtectedRoute requiredRole="DEALER">
              <Homedealer />
            </ProtectedRoute>
          } />
          <Route path='/Todayscrap' element={
            <ProtectedRoute requiredRole="DEALER">
              <Todayscrap />
             </ProtectedRoute>
          } />
          <Route path='/Dealerdetails' element={
            <ProtectedRoute requiredRole="DEALER">
              <Dealerdetails />
            </ProtectedRoute>
          } />
          <Route path='/Scrapdetail' element={
            <ProtectedRoute requiredRole="DEALER">
              <Scrapdetail />
            </ProtectedRoute>
          } />
          <Route path='/Completeorder' element={
            <ProtectedRoute requiredRole="DEALER">
              <Completeorder />
            </ProtectedRoute>
          } />
          <Route path='/Orders' element={
            <ProtectedRoute requiredRole="DEALER">
              <Orders />
            </ProtectedRoute>
          } />
          <Route path='/Completeorderdetail' element={
            <ProtectedRoute requiredRole="DEALER">
              <Completeorderdetail />
            </ProtectedRoute>
          } />
          <Route path='/Analytic' element={
            <ProtectedRoute requiredRole="DEALER">
              <Analytics />
            </ProtectedRoute>
          } />
          <Route path='/Feedback' element={
            <ProtectedRoute requiredRole="DEALER">
              <Feedback />
            </ProtectedRoute>
          } />
          <Route path='/Applicationstatus' element={
            <ProtectedRoute requiredRole="DEALER">
              <Applicationstatus />
            </ProtectedRoute>
          } />
          <Route path='/Dealerlogopage' element={
            <ProtectedRoute requiredRole="DEALER">
              <Dealerlogopage />
            </ProtectedRoute>
          } />
          <Route path='/Dealernotification' element={
            <ProtectedRoute requiredRole="DEALER">
              <Dealernotification />
            </ProtectedRoute>
          } />
          <Route path='/Dealerlanguage' element={
            <ProtectedRoute requiredRole="DEALER">
              <Dealerlanguage />
            </ProtectedRoute>
          } />
          <Route path='/Dealereditdetail' element={
            <ProtectedRoute requiredRole="DEALER">
              <Dealereditdetail />
            </ProtectedRoute>
          } />
          <Route path='/Dealerquery' element={
            <ProtectedRoute requiredRole="DEALER">
              <Dealerquery />
            </ProtectedRoute>
          } />
          <Route path='/Dealerqns' element={
            <ProtectedRoute requiredRole="DEALER">
              <Dealerqns />
            </ProtectedRoute>
          } />
          <Route path='/Dealerfaq' element={
            <ProtectedRoute requiredRole="DEALER">
              <Dealerfaq />
            </ProtectedRoute>
          } />
          <Route path='/DealerTerm' element={
            <ProtectedRoute requiredRole="DEALER">
              <DealerTerm />
            </ProtectedRoute>
          } />

          {/* ----------drawer dealer------ */}
          <Route path='/Dealeraccount' element={
            <ProtectedRoute requiredRole="DEALER">
              <Dealeraccount />
            </ProtectedRoute>
          } />
          <Route path='/Dealercustomer' element={
            <ProtectedRoute requiredRole="DEALER">
              <Dealercustomer />
            </ProtectedRoute>
          } />
          <Route path='/Dealerhelp' element={
            <ProtectedRoute requiredRole="DEALER">
              <Dealerhelp />
            </ProtectedRoute>
          } />
          <Route path='/Dealerorder' element={
            <ProtectedRoute requiredRole="DEALER">
              <Dealerorder />
            </ProtectedRoute>
          } />
          <Route path='/Dealerpayment' element={
            <ProtectedRoute requiredRole="DEALER">
              <Dealerpayment />
            </ProtectedRoute>
          } />
          <Route path='/Dealerorderview' element={
            <ProtectedRoute requiredRole="DEALER">
              <Dealerorderview />
            </ProtectedRoute>
          } />
          <Route path='/UpdateScrap' element={
            <ProtectedRoute requiredRole="DEALER">
              <UpdateScrap />
            </ProtectedRoute>
          } />
          <Route path='/InsertScrap' element={
            <ProtectedRoute requiredRole="DEALER">
              <InsertScrap />
            </ProtectedRoute>
          } />
          <Route path='/Logout' element={
            <ProtectedRoute requiredRole="DEALER">
              <Logout />
            </ProtectedRoute>
          } />
           <Route path='/UploadBankDetails' element={<UploadBankDetails />} />
           <Route path='/Base64Testing' element={<Base64Testing />} />
           <Route path='/Base64Testing2' element={<Base64Testing2 />} />
           <Route path='/locationTesting' element={<LocationTesting />} />
           <Route path='/nearbyUsers' element={<NearbyUsers />} />

          {/* ----------------------///USER////---------------------------- */}
          {/* <Route path='/Homeuser' element={
            <ProtectedRoute requiredRole="USER">
              <Homeuser />
            </ProtectedRoute>
          } /> */}
              <Route path='/Homeuser' element={<Homeuser />} />
          <Route path='/Scrapselect' element={
            <ProtectedRoute requiredRole="USER">
              <Scrapselect />
            </ProtectedRoute>
          } />
          <Route path='/Bookdealer' element={
            <ProtectedRoute requiredRole="USER">
              <Bookdealer />
            </ProtectedRoute>
          } />
          <Route path='/Successful' element={
            <ProtectedRoute requiredRole="USER">
              <Successful />
            </ProtectedRoute>
          } />
          <Route path='/Userlogopage' element={
            <ProtectedRoute requiredRole="USER">
              <Userlogopage />
            </ProtectedRoute>
          } />
          <Route path='/Usernotification' element={
            <ProtectedRoute requiredRole="USER">
              <Usernotification />
            </ProtectedRoute>
          } />
          <Route path='/Userlanguage' element={
            <ProtectedRoute requiredRole="USER">
              <Userlanguage />
            </ProtectedRoute>
          } />
          <Route path='/Usereditdetail' element={
            <ProtectedRoute requiredRole="USER">
              <Usereditdetail />
            </ProtectedRoute>
          } />
          <Route path='/Userqns' element={
            <ProtectedRoute requiredRole="USER">
              <Userqns />
            </ProtectedRoute>
          } />
          {/* <Route path='/UserTerms' element={
            <ProtectedRoute requiredRole="USER">
              <UserTerms />
            </ProtectedRoute>
          } /> */}
          <Route path='/UserTerms' element={<UserTerms />} />
          <Route path='/CompletedOrder' element={
            <ProtectedRoute requiredRole="USER">
              <CompletedOrder />
            </ProtectedRoute>
          } />
          <Route path='/OngoingOrder' element={
            // <ProtectedRoute requiredRole="USER">
              <OngoingOrder />
            // </ProtectedRoute>
          } />

          {/* --------footer----- */}
          <Route path='/Aboutus' element={<Aboutus />} />
          <Route path='/Becomedealer' element={<Becomedealer />} />
          <Route path='/BookingProtection' element={<BookingProtection />} />
          <Route path='/Career' element={<Career />} />
          <Route path='/Fulfillment' element={<Fulfillment />} />
          <Route path='/Sellon' element={<Sellon />} />

          {/* ----------drawer user------ */}
          <Route path='/Useraccount' element={
            // <ProtectedRoute requiredRole="USER">
              <Useraccount />
            // </ProtectedRoute>
          } />
          <Route path='/Usercustomer' element={
            // <ProtectedRoute requiredRole="USER">
              <Usercustomer />
            // </ProtectedRoute>
          } />
          <Route path='/Userfaq' element={
            // <ProtectedRoute requiredRole="USER">
              <Userfaq />
            // </ProtectedRoute>
          } />
          <Route path='/Userhelp' element={
            // <ProtectedRoute requiredRole="USER">
              <Userhelp />
            // </ProtectedRoute>
          } />
          <Route path='/Yourbooking' element={
            // <ProtectedRoute requiredRole="USER">
              <Yourbooking />
            // </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </>
  )
}

export default App
