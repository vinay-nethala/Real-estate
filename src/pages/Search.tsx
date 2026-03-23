import { Navigate } from 'react-router-dom';

export default function SearchPage() {
  // Advanced search redirects to properties with filters visible
  return <Navigate to="/properties" replace />;
}
