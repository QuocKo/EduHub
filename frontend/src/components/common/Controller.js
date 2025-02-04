import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import InputField from "./InputField/InputField";
import { FileInput } from "./InputField/FileInput";

function CustomController({
  title,
  icon,
  ValueArray,
  control,
  refClear,
  Controller,
  isCustom,
  isCustom2 = false,
  hasFile = false,
  fileName,
  fileTitle,
  fileIcon,
  fileRequired = false,
}) {
  const className = `content-section ${isCustom ? "" : "allinputfield"} ${
    isCustom2 ? "custom-content" : ""
  }`;
  return (
    <div className={!isCustom ? "card-section" : "card-section custom-width"}>
      <div className="heading">
        <span className="title-icon">
          {icon}
          {/* Custom */}
        </span>
        <span className="title">{title}</span> {/* Custom */}
      </div>

      <div className={className}>
        {ValueArray.map((value, index) => {
          return (
            <Controller
              name={value.name}
              control={control}
              key={index}
              rules={{
                required: {
                  value: value.isRequired,
                  message: `${value.title} is required`,
                },
              }}
              defaultValue=""
              render={({ field }) => (
                <InputField
                  title={value.title.toUpperCase()}
                  input={value.input}
                  icon={value.icon}
                  placeholder={value?.placeholder}
                  name={value.name}
                  onChangeHandler={field.onChange}
                  isCustomInput={value.isCustomField}
                  isTextArea={value?.isTextarea}
                  isRequired={value.isRequired}
                  isImageFile={value?.isImageFile}
                  options={value?.options}
                  refClear={refClear}
                />
              )}
            />
          );
        })}
        {hasFile && (
          <Controller
            name={fileName}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FileInput
                name={fileName}
                title={fileTitle}
                icon={fileIcon}
                isRequired={fileRequired}
                isImageFile={true}
                onChange={(event) =>
                  field.onChange(event.target.files[0])
                }
              />
            )}
          />
        )}
      </div>
    </div>
  );
}

// PropTypes validation
CustomController.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  ValueArray: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      input: PropTypes.string,
      icon: PropTypes.node,
      placeholder: PropTypes.string,
      isRequired: PropTypes.bool,
      isCustomField: PropTypes.bool,
      isTextarea: PropTypes.bool,
      isImageFile: PropTypes.bool,
      options: PropTypes.arrayOf(PropTypes.object),
    })
  ).isRequired,
  control: PropTypes.object.isRequired,
  refClear: PropTypes.func,
  Controller: PropTypes.func.isRequired,
  isCustom: PropTypes.bool.isRequired,
  isCustom2: PropTypes.bool,
  hasFile: PropTypes.bool,
  fileName: PropTypes.string,
  fileTitle: PropTypes.string,
  fileIcon: PropTypes.node,
  fileRequired: PropTypes.bool,
};

// PropTypes validation for field and field.onChange
CustomController.propTypes = {
  field: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
  }),
};

export default CustomController;
