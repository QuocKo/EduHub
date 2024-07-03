import React, { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import * as MdIcons from "react-icons/md";
import * as FiIcons from "react-icons/fi";
import { HeaderInputField } from "./HeaderInputField";

function PasswordInputField({
  name,
  title,
  isRequired = true,
  placeholder = "Enter Password",
  onChangeHandler,
  disabled = false,
  id_name,
  hasHeader = true,
}) {
  const [showPass, setShowPass] = useState(true);
  return (
    <React.Fragment>
      <div className="mid-content">
        {hasHeader && (
          <HeaderInputField
            title={title}
            icon={<MdIcons.MdPassword className="mid-icon" />}
            isRequired={isRequired}
          />
        )}
        <div className="label-input">
          <div className="input-icon-container">
            <input
              type={showPass ? "password" : "text"}
              className={"input"}
              placeholder={placeholder}
              id={id_name}
              onChange={onChangeHandler}
              required={isRequired}
              disabled={disabled}
              name={name}
            />
            <button
              className="fa eye-button"
              onClick={(e) => {
                e.preventDefault();
                setShowPass(!showPass);
              }}>
              {showPass ? <FiIcons.FiEye /> : <FiIcons.FiEyeOff />}
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

// PropTypes validation
PasswordInputField.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  isRequired: PropTypes.bool,
  placeholder: PropTypes.string,
  onChangeHandler: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  id_name: PropTypes.string,
  hasHeader: PropTypes.bool,
};

export default PasswordInputField;
