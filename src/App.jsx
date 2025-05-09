import React from "react";
import MainLayout from "./Layout/MainLayout";
import Blogs from "./Pages/Blogs";
import Forum from "./Pages/Forum";
import { Route, Routes } from "react-router";
import Dashboard from "./Pages/Dashboard";
import MeineBlogs from "./Pages/MeineBlogs";
import DetailBlog from "./Pages/DetailBlog";
import DetailForum from "./Pages/DetailForum";
import AdminDashboard from "./Pages/AdminDashboard";
import TextEditor from "./Components/TextEditor";

Route;

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Forum />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/blog" element={<Blogs />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/meineblogs" element={<MeineBlogs />} />
          <Route path="/detailblog" element={<DetailBlog />} />
          <Route path="/detailforum" element={<DetailForum />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/texteditor" element={<TextEditor />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
