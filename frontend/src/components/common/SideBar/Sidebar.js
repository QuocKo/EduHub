import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { Link } from "react-router-dom";
import MenuItem from "./MenuItem";

function Sidebar({ show, title, menues, name }) {
  return (
    <>
      <div className={show ? "visible-sidemenu active" : "visible-sidemenu"}>
        <div className="title">
          <Link
            to={`/${name}/dashboard`}
            style={{ textDecoration: "none", color: "#fff" }}>
            {title}
          </Link>
        </div>
        <div className="sidemenu">
          <ul className="sidebar-ul">
            {menues.map((values, index) => {
              if (values.hasSubMenu) {
                return (
                  <MenuItem
                    name={values.name}
                    submenus={values.submenus}
                    key={index}
                    icons={values.icon}
                    hasSubMenus={values.hasSubMenu}
                    toLink={values.to}
                  />
                );
              } else {
                return (
                  <MenuItem
                    name={values.name}
                    key={index}
                    icons={values.icon}
                    hasSubMenus={values.hasSubMenu}
                    toLink={values.to}
                  />
                );
              }
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

// Define prop types
Sidebar.propTypes = {
  show: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  menues: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      hasSubMenu: PropTypes.bool.isRequired,
      submenus: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          to: PropTypes.string.isRequired,
        })
      ),
      icon: PropTypes.node.isRequired,
      to: PropTypes.string.isRequired,
    })
  ).isRequired,
  name: PropTypes.string.isRequired,
};

export default Sidebar;
