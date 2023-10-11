import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/careers">Careers</Link>
    </div>
  );
};
