import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { HeaderInputField } from "./HeaderInputField";

function TextInput({
  title,
  icon,
  disabled = false,
  name,
  value,
  hasValue = false,
}) {
  return (
    <React.Fragment>
      <div className="mid-content">
        <HeaderInputField title={title.toUpperCase()} icon={icon} />
        <div className="label-input">
          {hasValue ? (
            <input
              type="text"
              className="input"
              disabled={disabled}
              name={name}
              value={value}
            />
          ) : (
            <input
              type="text"
              className="input"
              disabled={disabled}
              name={name}
            />
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

// PropTypes validation
TextInput.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  hasValue: PropTypes.bool,
};

export default TextInput;
