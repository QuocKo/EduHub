import React from "react";
import PropTypes from "prop-types"; // Import PropTypes

function InnerHeader({ icon, name }) {
  return (
    <div className="header">
      <div className="IconName">
        <div className="icon active-link">{icon}</div>
        <div className="open-menu active-link">{name}</div>
      </div>
      <div className="reference"></div>
    </div>
  );
}

// PropTypes validation
InnerHeader.propTypes = {
  icon: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
};

export default InnerHeader;
