'use client';
import { useAuth } from "@/context/AuthContext";
import Sidebar from "./Sidebar";

export default function LayoutContent({ children }) {
  const { user } = useAuth();

  return (
    <div style={{ display: 'flex', flex: 1 }}>
      {/* N'affiche la sidebar que si l'utilisateur est connecté */}
      {/* Si user existe (ou est vrai), alors affiche <Sidebar /> */}
      {user && <Sidebar />}
      
      <main style={{ flex: 1, padding: '20px', backgroundColor: '#f9fafb' }}>
        {children}
      </main>
    </div>
  );
}