import { Suspense, lazy } from "react";
import AuthLayout from "layouts/AuthLayout";
import DashboardLayout from "layouts/DashboardLayout";
import ProtectedRoute from "./isAuth/ProtectedRoute";
import { Routes, Navigate, Route } from "react-router-dom";
import { Box } from "@mui/material";
import { RevolvingDot } from "react-loader-spinner";

const Company = lazy(() => import("pages/auth/Company"));
const Completed = lazy(() => import("pages/auth/Completed"));
const ForgotPassword = lazy(() => import("pages/auth/ForgotPassword"));
const NewPassword = lazy(() => import("pages/auth/NewPassword"));
const PasswordReset = lazy(() => import("pages/auth/PasswordReset"));
const SignIn = lazy(() => import("pages/auth/SignIn"));
const SignUp = lazy(() => import("pages/auth/SignUp"));

const CampaignAnalytics = lazy(
  () => import("pages/dashboard/CampaignAnalytics")
);
const Campaigns = lazy(() => import("pages/dashboard/Campaigns"));
const Dashboard = lazy(() => import("pages/dashboard/Dashboard"));
const Logout = lazy(() => import("pages/dashboard/Logout"));
const NewCampaign = lazy(() => import("pages/dashboard/NewCampaign"));
const Notifications = lazy(() => import("pages/dashboard/Notifications"));
const Plans = lazy(() => import("pages/dashboard/Plans"));
const Profile = lazy(() => import("pages/dashboard/Profile"));
const CampaignPreview = lazy(() => import("pages/dashboard/CampaignPreview"));

const AppRoutes = () => {
  const dashboardRoutes = [
    { path: "dashboard", element: <Dashboard /> },
    { path: "campaigns", element: <Campaigns /> },
    {
      path: "campaigns/:id",
      element: <CampaignAnalytics />,
      title: "Campaign Analytics",
    },
    { path: "campaign/plan", element: <Plans /> },
    { path: "campaigns/new", element: <NewCampaign />, title: "New Campaign" },
    { path: "campaigns/preview", element: <CampaignPreview /> },
    { path: "profile", element: <Profile /> },
    { path: "notifications", element: <Notifications /> },
    { path: "logout", element: <Logout /> },
    { path: "plans", element: <Plans /> },
  ];

  return (
    <Suspense
      fallback={
        <Box
          alignItems='center'
          height='100vh'
          justifyContent='center'
          display='flex'
        >
          <RevolvingDot color='#aa00cc' width='10px' />
        </Box>
      }
    >
      <Routes>
        <Route path='/auth' element={<AuthLayout />}>
          <Route path='sign-in' element={<SignIn />} />
          <Route path='sign-up' element={<SignUp />} />
          <Route path='about-company' element={<Company />} />
          <Route path='completed' element={<Completed />} />
          <Route path='new-password' element={<NewPassword />} />
          <Route path='password-reset' element={<PasswordReset />} />
          <Route path='forgot-password' element={<ForgotPassword />} />
        </Route>

        <Route path='/' element={<ProtectedRoute />}>
          <Route index element={<Navigate to='dashboard' />} />
          {dashboardRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <DashboardLayout title={route.title || route.path}>
                  {route.element}
                </DashboardLayout>
              }
            />
          ))}
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
