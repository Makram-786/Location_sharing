// src/layout/MainLayout.jsx
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* This renders child routes */}
      </main>
    </>
  );
};

export default MainLayout;
