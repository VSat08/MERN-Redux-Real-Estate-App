import React from "react";
import { motion } from "framer-motion";

export const Modal = ({ children }) => {
  const modalVariants = {
    open: { opacity: 1, y: 0, rotateY: "0deg" },
    closed: { opacity: 0, y: "100%", rotateY: "-45deg" },
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
      <motion.div
        initial="closed"
        animate="open"
        exit="closed"
        variants={modalVariants}
        className="bg-white rounded-2xl p-8 shadow-2xl shadow-black/10 w-10/12 sm:w-3/4 md:w-3/4 lg:w-5/12 "
      >
        {children}
      </motion.div>
    </div>
  );
};
