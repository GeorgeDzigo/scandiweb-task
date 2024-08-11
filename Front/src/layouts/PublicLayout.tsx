// src/components/Layout.tsx
import { ReactNode } from 'react';
import Navbar from "../components/Navbar/Navbar";

interface LayoutProps {
  children: ReactNode;
}

function PublicLayout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}

export default PublicLayout
