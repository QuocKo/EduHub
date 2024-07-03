import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { HeaderInputField } from "./HeaderInputField";

export const FileInput = ({
  name,
  title,
  icon,
  isRequired,
  isCustomInput,
  isImageFile,
  onChange,
}) => {
  return (
    <>
      <div className="mid-content">
        <HeaderInputField
          title={title}
          icon={icon}
          isRequired={isRequired}
          name={name}
        />

        <div className="label-input">
          {isImageFile ? (
            <input
              type="file"
              className={isCustomInput ? "input custom-input" : "input"}
              required={isRequired}
              onChange={onChange}
              name={name}
              accept="image/*"
            />
          ) : (
            <input
              type="file"
              className={isCustomInput ? "input custom-input" : "input"}
              required={isRequired}
              onChange={onChange}
              name={name}
            />
          )}
        </div>
      </div>
    </>
  );
};

// PropTypes validation
FileInput.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  isRequired: PropTypes.bool.isRequired,
  isCustomInput: PropTypes.bool,
  isImageFile: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};
