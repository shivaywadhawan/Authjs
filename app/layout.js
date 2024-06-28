import AuthProvider from "./(components)/AuthProvider.js";
import Nav from "./(components)/Nav";
import "./globals.css";

export const metadata = {
  title: "Auth",
  description: "Apply Authorisation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className="bg-gray-100">
          <Nav />
          <div className="m-2">{children}</div>
        </body>
      </AuthProvider>
    </html>
  );
}
