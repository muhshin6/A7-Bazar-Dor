"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastProvider() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      style={{ zIndex: 99999 }}
      toastStyle={{ zIndex: 99999 }}
      hideProgressBar={false}
      newestOnTop
    />
  );
}