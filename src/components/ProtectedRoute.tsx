import { Navigate } from 'react-router-dom';
import type { JSX } from 'react/jsx-dev-runtime';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  // untuk cek apakah token JWT ada di brankas browser
  const token = localStorage.getItem('token');

  if (!token) {
    // jika tidak ada token, langsung balik ke login secara paksa
    return <Navigate to="/login" replace />;
  }

  // namun jika aada token, izinin dia ngakses halaman tujuannya
  return children;
};

export default ProtectedRoute;