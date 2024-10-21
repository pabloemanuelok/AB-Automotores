import React from "react";
import ProtectedPage from "@/Components/ProtectedPage/ProtectedPage";
import AdminAddVehicle from "@/Components/Admin/Admin";
import FondoNav from "@/Components/FondoNav/FondoNav";

const AdminPage: React.FC = () => {
  return (
    <ProtectedPage>
      <FondoNav imageUrl="https://static.wixstatic.com/media/0816f9_a3c45a711ee34c6f81f78db3160997d4~mv2.png" />
      <AdminAddVehicle />
    </ProtectedPage>
  );
};

export default AdminPage;
