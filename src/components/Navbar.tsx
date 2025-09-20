import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        
        <Link to={"/"}><h1 className="text-xl font-bold text-blue-600">
          MiniShop
        </h1> </Link>
        <div className="flex ">
          <div>
          <Link className="hover:text-blue-600" to="/">Products</Link>
          </div>
          <div className="flex gap-4 ml-4">
          <Link className="hover:text-blue-600" to="/cart">Cart</Link>
          <Link className="hover:text-blue-600" to="/login">Login</Link>
          <Link className="hover:text-blue-600" to="/register">Register</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
