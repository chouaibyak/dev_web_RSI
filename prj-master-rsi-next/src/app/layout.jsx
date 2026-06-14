import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LayoutContent from "@/components/LayoutContent";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />

            <LayoutContent>
                {children}
            </LayoutContent>

            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
