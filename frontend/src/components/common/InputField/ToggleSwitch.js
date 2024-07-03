import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import "./../../common/css/ToggleOption.css";

const ToggleSwitch = ({ id, name, onChangeHandler, optionLabels }) => {
  return (
    <div className={"toggle-switch"}>
      <input
        type="checkbox"
        name={name}
        className="toggle-switch-checkbox"
        id={id}
        onChange={(e) => {
          onChangeHandler(id, e.target.checked);
        }}
      />
      {id ? (
        <label className="toggle-switch-label" htmlFor={id}>
          <span
            className={"toggle-switch-inner"}
            data-true={optionLabels[0]}
            data-false={optionLabels[1]}
          />
          <span className={"toggle-switch-switch"} />
        </label>
      ) : null}
    </div>
  );
};

// PropTypes validation
ToggleSwitch.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  optionLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ToggleSwitch;
