import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { HeaderInputField } from "../../common/InputField/HeaderInputField";

function ViewModal({
  title,
  value,
  disabled = true,
  name = "",
  register,
  type = "text",
  icon = "",
  file = false,
  isRequired = false,
}) {
  return (
    <div className="info">
      <div className="mid-content">
        <HeaderInputField title={title} icon={icon} isRequired={isRequired} />
        <div className="label-input">
          {register ? (
            file ? (
              <div className="image-component">
                <input
                  type={"file"}
                  className="input upload-image"
                  disabled={disabled}
                  defaultValue={value}
                  accept="image/*"
                  required={isRequired}
                  name={name}
                  {...register(name)}
                />
              </div>
            ) : (
              <input
                type={type}
                className="input"
                disabled={disabled}
                defaultValue={value}
                required={isRequired}
                name={name}
                {...register(name)}
              />
            )
          ) : (
            <div className="input">{value}</div>
          )}
        </div>
      </div>
    </div>
  );
}

// PropTypes validation
ViewModal.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  register: PropTypes.func,
  type: PropTypes.string,
  icon: PropTypes.node,
  file: PropTypes.bool,
  isRequired: PropTypes.bool,
};

export default ViewModal;
