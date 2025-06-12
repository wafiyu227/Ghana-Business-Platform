import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

// Pages
import BusinessForm from './src/components/business/BusinessForm'
import  Home  from "./src/pages/Home/Home";


const AppRoutes = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/register-business" element={<BusinessForm />} />
        <Route path="/" element={<Home />} />
      </>
    )
  );
  return <RouterProvider router={router} />;
};

export default AppRoutes;
