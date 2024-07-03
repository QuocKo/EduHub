import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import Select from "react-select";
import TextAreaInput from "./TextAreaInput";
import NormalInputField from "./NormalInputField";
import { HeaderInputField } from "./HeaderInputField";
import AsyncSelect from "react-select/async";

function InputField({
  title,
  icon,
  input,
  placeholder,
  options,
  onChangeHandler,
  isRequired,
  name,
  isCustomInput,
  isTextArea,
  refClear,
  isImageFile,
  disabled = false,
}) {
  const isDropdown = input === "dropdown";

  return (
    <div className="mid-content">
      {/* //Heading File  */}
      <HeaderInputField
        title={title}
        icon={icon}
        isRequired={isRequired}
        name={name}
      />

      {/* Input Field  */}
      <div className="label-input">
        {!isDropdown ? (
          isTextArea ? (
            <TextAreaInput
              name={name}
              placeholder={placeholder}
              isCustomInput={isCustomInput}
              onChangeHandler={onChangeHandler}
              isRequired={isRequired}
              disabled={disabled}
            />
          ) : (
            <NormalInputField
              input={input}
              placeholder={placeholder}
              onChangeHandler={onChangeHandler}
              name={name}
              isCustomInput={isCustomInput}
              isRequired={isRequired}
              isImageFile={isImageFile}
              disabled={disabled}
            />
          )
        ) : (
          <Select
            menuPortalTarget={document.body}
            ref={refClear}
            options={options}
            className="input-select custom-input"
            onChange={onChangeHandler}
            maxMenuHeight={200}
            isDisabled={disabled}
            menuPlacement={"auto"}
            styles={{ menuPortal: (base) => ({ ...base, zIndex: 10002 }) }}
          />
        )}
        {/* <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => <span className='errors'>{message}</span>}
        /> */}
      </div>
    </div>
  );
}

// PropTypes validation
InputField.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  input: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  options: PropTypes.array,
  onChangeHandler: PropTypes.func.isRequired,
  isRequired: PropTypes.bool,
  name: PropTypes.string.isRequired,
  isCustomInput: PropTypes.bool,
  isTextArea: PropTypes.bool,
  refClear: PropTypes.oneOfType([
    PropTypes.func, 
    PropTypes.shape({ current: PropTypes.any })
  ]),
  isImageFile: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default InputField;
