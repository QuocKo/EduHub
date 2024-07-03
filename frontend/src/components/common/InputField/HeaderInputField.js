import React from "react";
import PropTypes from "prop-types"; // Import PropTypes

export function HeaderInputField({ title, icon, isRequired }) {
  return (
    <div className="label-title">
      {icon}
      <label className="mid-title">{title}</label>
      {isRequired && <span className="required"> *</span>}
    </div>
  );
}

// PropTypes validation
HeaderInputField.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  isRequired: PropTypes.bool.isRequired,
};
