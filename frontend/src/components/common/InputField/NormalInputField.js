import React from "react";
import PropTypes from "prop-types"; // Import PropTypes

function NormalInputField({
  input,
  isCustomInput,
  placeholder,
  onChangeHandler,
  name,
  isRequired,
  isImageFile,
  disabled,
}) {
  const isFile = input === "file";

  return isFile && isImageFile ? (
    <>
      {console.log()}
      <input
        type={input}
        className={isCustomInput ? "input custom-input" : "input"}
        placeholder={placeholder}
        onChange={onChangeHandler}
        required={isRequired}
        name={name}
        disabled={disabled}
        accept="image/*"
      />
    </>
  ) : (
    <input
      type={input}
      className={isCustomInput ? "input custom-input" : "input"}
      placeholder={placeholder}
      onChange={onChangeHandler}
      required={isRequired}
      disabled={disabled}
      name={name}
    />
  );
}

// PropTypes validation
NormalInputField.propTypes = {
  input: PropTypes.string.isRequired,
  isCustomInput: PropTypes.bool,
  placeholder: PropTypes.string.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  isImageFile: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default NormalInputField;
