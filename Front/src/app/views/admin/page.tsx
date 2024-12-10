import React from "react";
import ProtectedPage from "@/Components/ProtectedPage/ProtectedPage";
import AdminAddVehicle from "@/Components/Admin/Admin";
import FondoNav from "@/Components/FondoNav/FondoNav";

const AdminPage: React.FC = () => {
  return (
    <ProtectedPage>
      <FondoNav />
      <AdminAddVehicle />
    </ProtectedPage>
  );
};

export default AdminPage;
