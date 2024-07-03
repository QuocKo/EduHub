import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ViewModal from "./../../../common/Modal/ViewModal";
import SelectInputField from "./../../../common/InputField/SelectInputField";
import TextAreaInput from "./../../../common/InputField/TextAreaInput";
import * as MdIcons from "react-icons/md";
import { HeaderInputField } from "../../../common/InputField/HeaderInputField";
import { GetPaginatedGradePromise } from "./../../../GetOptions";
import { UniqueArray } from "../../../common/ReverseArray";

function ChangeSubjectModal({ register, data, Controller, control }) {
  const [selectSectionRef, setSectionRef] = useState(null);

  const refClearSection = (ref) => setSectionRef(ref);

  const [grade, setGrade] = useState([]);
  const [section, setSection] = useState([]);

  useEffect(() => {
    const GetOptions = async () => {
      try {
        const got = await GetPaginatedGradePromise();
        setGrade(got);
      } catch (error) {
        console.log(error);
      }
    };
    GetOptions();
  }, []);

  const uniqueGrade = UniqueArray(grade, "class_name");

  const getSection = (selectedData) => {
    if (selectedData) {
      const sectionOptions = grade.filter(
        (value) => value.class_name === selectedData.value
      );

      return sectionOptions.map((value) => ({
        label: value.section,
        value: value.section,
      }));
    }
  };

  const classOptions = uniqueGrade.map((value) => ({
    label: value,
    value: value,
  }));

  const handleSection = (selectedData) => {
    if (selectedData) {
      const sectionLabel = getSection(selectedData);
      setSection(sectionLabel);
    }
  };

  return (
    <React.Fragment>
      <div>
        <div className={"allinputfield"}>
          <ViewModal
            title={"Subject Name"}
            register={register}
            disabled={false}
            name={"subjectName"}
            value={data.subject_name}
          />
          <ViewModal
            title={"Subject Code"}
            register={register}
            disabled={false}
            name={"subjectCode"}
            value={data.subject_code}
          />
          <Controller
            name="subjectClass"
            control={control}
            defaultValue={{
              label: data.grade.class_name,
              value: data.grade.class_name,
            }}
            render={({ field }) => (
              <SelectInputField
                title={"Class"}
                name="subjectClass"
                hasValue={true}
                onChangeHandler={(selectedData) => {
                  selectSectionRef.clearValue();
                  handleSection(selectedData);
                  field.onChange(selectedData);
                }}
                value={{
                  label: data.grade.class_name,
                  value: data.grade.class_name,
                }}
                options={classOptions}
              />
            )}
          />

          <Controller
            name="subjectSection"
            control={control}
            defaultValue={{
              label: data.grade.section,
              value: data.grade.section,
            }}
            render={({ field }) => (
              <SelectInputField
                title={"Section"}
                name="subjectSection"
                refClear={refClearSection}
                hasValue={true}
                onChangeHandler={field.onChange}
                value={{
                  label: data.grade.section,
                  value: data.grade.section,
                }}
                options={section}
              />
            )}
          />
        </div>
        <Controller
          name="description"
          control={control}
          defaultValue={data.description}
          render={({ field }) => (
            <div className="mid-content">
              <HeaderInputField
                title={"Description".toUpperCase()}
                icon={<MdIcons.MdTextFields className="mid-icon" />}
              />
              <div className="label-input">
                <TextAreaInput
                  name={"description"}
                  hasValue={true}
                  placeholder={"Enter Subject Description"}
                  onChangeHandler={field.onChange}
                  isRequired={false}
                  value={data.description}
                />
              </div>
            </div>
          )}
        />
      </div>
    </React.Fragment>
  );
}

ChangeSubjectModal.propTypes = {
  register: PropTypes.func.isRequired,
  data: PropTypes.shape({
    subject_name: PropTypes.string.isRequired,
    subject_code: PropTypes.string.isRequired,
    grade: PropTypes.shape({
      class_name: PropTypes.string.isRequired,
      section: PropTypes.string.isRequired,
    }).isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  Controller: PropTypes.func.isRequired,
  control: PropTypes.object.isRequired,
};

export default ChangeSubjectModal;
