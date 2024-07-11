import React from "react";
import { Link, useLocation, useRouteMatch } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  const match = useRouteMatch();

  
  // Split the pathname into segments
  const pathSegments = location.pathname.split('/').filter(segment => segment !== '');

  return (
    <div className="breadcrumbs text-sm text-gray-800 mt-20 px-10 mb-5">
      <ul>
        <li className="hover:text-rose-500">
          <Link to='/'>Home</Link>
        </li>
        {pathSegments.map((segment, index) => {
          const url = `/${pathSegments.slice(0, index + 1).join('/')}`;
          const isLast = index === pathSegments.length - 1;

          return (
            <li key={segment} className={isLast ? '' : 'hover:text-rose-500'}>
              {isLast ? (
                <span>{segment}</span>
              ) : (
                <Link to={url}>{segment}</Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
