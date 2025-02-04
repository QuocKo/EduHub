import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { HeaderInputField } from "./HeaderInputField";
import Select from "react-select";

function SelectInputField({
  title,
  icon,
  name,
  value,
  hasValue = false,
  options,
  onChangeHandler,
  refClear,
  isRequired = false,
}) {
  return (
    <React.Fragment>
      <div className="mid-content">
        <HeaderInputField
          title={title.toUpperCase()}
          icon={icon}
          isRequired={isRequired}
        />
        <div className="label-input">
          {hasValue ? (
            <Select
              menuPortalTarget={document.body}
              name={name}
              options={options}
              className="input-select custom-input"
              onChange={onChangeHandler}
              maxMenuHeight={200}
              ref={refClear}
              defaultValue={value}
              menuPlacement={"auto"}
              styles={{ menuPortal: (base) => ({ ...base, zIndex: 10002 }) }}
            />
          ) : (
            <Select
              menuPortalTarget={document.body}
              onChange={onChangeHandler}
              options={options}
              name={name}
              ref={refClear}
              className="input-select custom-input"
              maxMenuHeight={200}
              menuPlacement={"auto"}
              styles={{ menuPortal: (base) => ({ ...base, zIndex: 10002 }) }}
            />
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

// PropTypes validation
SelectInputField.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node,
  name: PropTypes.string.isRequired,
  value: PropTypes.object,
  hasValue: PropTypes.bool,
  options: PropTypes.array.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  refClear: PropTypes.oneOfType([
    PropTypes.func, 
    PropTypes.shape({ current: PropTypes.any })
  ]),
  isRequired: PropTypes.bool,
};

export default SelectInputField;
