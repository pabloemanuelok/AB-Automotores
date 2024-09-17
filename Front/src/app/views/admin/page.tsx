import React from "react";
import ProtectedPage from "@/Components/ProtectedPage/ProtectedPage";
import AdminAddVehicle from "@/Components/Admin/Admin";

const AdminPage: React.FC = () => {
  return (
    <ProtectedPage>
      <AdminAddVehicle />
    </ProtectedPage>
  );
};

export default AdminPage;
