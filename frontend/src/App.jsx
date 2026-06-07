import React, { Suspense, lazy, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from "./authSlice";

// Lazy loaded page components
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Homepage = lazy(() => import("./pages/Homepage"));
const Admin = lazy(() => import("./pages/Admin"));
const ProblemPage = lazy(() => import("./pages/ProblemPage"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
const AdminUpdate = lazy(() => import("./pages/AdminUpdate"));
const AdminPanel = lazy(() => import("./components/AdminPanel"));
const AdminVideo = lazy(() => import("./components/AdminVideo"));
const AdminDelete = lazy(() => import("./components/AdminDelete"));
const AdminUpload = lazy(() => import("./components/AdminUpload"));

const PageLoader = () => (
  <div className="min-h-screen flex flex-col justify-center items-center bg-[#050505] text-neutral-100 gap-3">
    <span className="loading loading-spinner loading-lg text-indigo-500"></span>
    <span className="text-xs text-neutral-500 font-medium font-sans">Forging workspace...</span>
  </div>
);

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  // check initial authentication
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  
  if (loading) {
    return <PageLoader />;
  }

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Homepage /> : <Navigate to="/signup" />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <Signup />} />
        <Route path="/profile" element={isAuthenticated ? <UserProfile /> : <Navigate to="/login" />} />
        <Route path="/admin" element={isAuthenticated && user?.role === 'admin' ? <Admin /> : <Navigate to="/" />} />
        <Route path="/admin/create" element={isAuthenticated && user?.role === 'admin' ? <AdminPanel /> : <Navigate to="/" />} />
        <Route path="/admin/update" element={isAuthenticated && user?.role === 'admin' ? <AdminUpdate /> : <Navigate to="/" />} />
        <Route path="/admin/delete" element={isAuthenticated && user?.role === 'admin' ? <AdminDelete /> : <Navigate to="/" />} />
        <Route path="/admin/video" element={isAuthenticated && user?.role === 'admin' ? <AdminVideo /> : <Navigate to="/" />} />
        <Route path="/admin/upload/:problemId" element={isAuthenticated && user?.role === 'admin' ? <AdminUpload /> : <Navigate to="/" />} />
        <Route path="/problem/:problemId" element={isAuthenticated ? <ProblemPage /> : <Navigate to="/login" />} />
      </Routes>
    </Suspense>
  );
}

export default App;