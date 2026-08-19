import React from "react";
import ProtectedPage from "@/Components/ProtectedPage/ProtectedPage";
import MisTareas from "@/Components/Tareas/MisTareas";

const TareasPage: React.FC = () => {
  return (
    <ProtectedPage allowedRoles={["empleado"]}>
      <MisTareas />
    </ProtectedPage>
  );
};

export default TareasPage;
