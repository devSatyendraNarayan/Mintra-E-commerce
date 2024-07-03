import { Link } from "react-router-dom";

const SidebarLink = ({ to, children }) => (
  <Link to={to} className="hover:font-semibold hover:text-rose-500 block text-md">
    {children}
  </Link>
);

export default SidebarLink;
