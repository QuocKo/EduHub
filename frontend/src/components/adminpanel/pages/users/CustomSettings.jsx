import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { HeaderInputField } from "./../../../common/InputField/HeaderInputField";

function CustomSettingsInput({
  title,
  icon,
  required,
  type,
  placeholder,
  name,
  register,
  value,
}) {
  return (
    <React.Fragment>
      <div className="inputfield">
        <HeaderInputField
          title={title}
          icon={icon}
          isRequired={required}
          className="headerinputfield"
        />
        <div className="">
          <input
            type={type}
            className="input"
            placeholder={placeholder}
            {...register(name)}
            required
            name={name}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

// PropTypes validation
CustomSettingsInput.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  required: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default CustomSettingsInput;
