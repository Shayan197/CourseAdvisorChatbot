import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import SignUp from "./Components/Signup";
import EmailVerification from "./Components/EmailVerification";
import ResetPassword from "./Components/ResetPassword";
import OtpVerification from "./Components/OtpVerification";
import CourseDetails from "./Components/CourseDetails";
import Main from "./Components/Main";
import ProtectedRoute from "./Components/ProtectedRoute";
import NotFound from "./Components/NotFound";
import AdminDashboard from "./Components/AdminDashbord";
import AddRule from "./Components/AddRule";
import Supervisor from "./Components/Supervisor";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/emailverification" element={<EmailVerification />} />
        <Route path="/otpverification" element={<OtpVerification />} />
        <Route path="/resetpassword" element={<ResetPassword />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={<ProtectedRoute component={Dashboard} />}
        >
          <Route index element={<ProtectedRoute component={Main} />} />
          <Route
            path="allcourses"
            element={<ProtectedRoute component={CourseDetails} />}
          />
        </Route>
        <Route
          path="admindashboard"
          element={<ProtectedRoute component={AdminDashboard} />}
        />
        <Route
          path="supervisor"
          element={<ProtectedRoute component={Supervisor} />}
        />
        <Route
          path="admindashboard/addrule"
          element={<ProtectedRoute component={AddRule} />}
        />

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
