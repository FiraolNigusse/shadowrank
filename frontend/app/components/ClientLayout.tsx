"use client";

import { motion } from "framer-motion";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="pt-20"
    >
      {children}
    </motion.div>
  );
}
