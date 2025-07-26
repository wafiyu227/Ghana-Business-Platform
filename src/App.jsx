import React from "react";
import AppRoutes from "../Routes";
import { Toaster } from "react-hot-toast"; // ✅ Add this

const App = () => {
  return (
    <>
      <AppRoutes />
      <Toaster position="top-right" reverseOrder={false} /> {/* ✅ Add this */}
    </>
  );
};

export default App;
