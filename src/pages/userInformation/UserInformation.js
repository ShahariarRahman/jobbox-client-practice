import React from "react";
import { useSelector } from "react-redux";
import CandidateDashboard from "../candidateDashboard/CandidateDashboard";
import EmployerDashboard from "../employeeDashboard/EmployerDashboard";

const UserInformation = () => {
  const {
    user: { role },
  } = useSelector((state) => state.auth);

  if (role === "candidate") {
    return <CandidateDashboard />;
  }
  if (role === "employer") {
    return <EmployerDashboard />;
  }
};

export default UserInformation;
