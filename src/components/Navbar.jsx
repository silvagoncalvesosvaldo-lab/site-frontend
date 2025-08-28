import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 flex gap-4">
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/verificar">Verificar</Link>
      <Link to="/admin">Admin</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/uitest">UI Test</Link>
    </nav>
  );
}
