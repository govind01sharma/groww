import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
      <div className="offcanvas-md offcanvas-end bg-body-tertiary" tabIndex={-1} id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="sidebarMenuLabel">Company name</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2 active" aria-current="page" href="#">
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="#">
                Orders
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="#">
                Products
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="#">
                Customers
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="#">
                Reports
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="#">
                Integrations
              </a>
            </li>
          </ul>

          <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
            <span>Saved reports</span>
            <a className="link-secondary" href="#" aria-label="Add a new report">
              +
            </a>
          </h6>
          <ul className="nav flex-column mb-auto">
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="#">
                Current month
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="#">
                Last quarter
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="#">
                Social engagement
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="#">
                Year-end sale
              </a>
            </li>
          </ul>

          <hr className="my-3" />

          <ul className="nav flex-column mb-auto">
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="#">
                Settings
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="#">
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;