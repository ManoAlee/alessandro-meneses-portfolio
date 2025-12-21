import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { MainLayout } from "@/widgets/Layout";
import HomePage from "@/pages/Home";
import ExpertisePage from "@/pages/ExpertisePage";
import { Toaster } from "react-hot-toast";
import OpenSourcePage from "@/pages/OpenSource";
import ServicesPage from "@/pages/ServicesPage";
import NotFoundPage from "@/pages/NotFoundPage";
import ContactPage from "@/pages/ContactPage";
import ResumePage from "@/pages/ResumePage";

// Removed: const ContactPage = () => <div className="p-8">Contact Module Loading...</div>;

// Global navigation routes configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      
      // Dynamic Routes for Personas
      { path: "expertise", element: <ExpertisePage /> },
      { path: "expertise/:domainId", element: <ExpertisePage /> },
      
      { path: "opensource", element: <OpenSourcePage /> },
      { path: "services", element: <ServicesPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "resume", element: <ResumePage /> },
      
      // Catch-all
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
      <Toaster position="bottom-right" />
    </>
  );
}
