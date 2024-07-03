import React from "react";
import PropTypes from "prop-types";
import SelectInputField from "../common/InputField/SelectInputField";
import ViewModal from "../common/Modal/ViewModal";

function TeacherEditModal({ register, data, Controller, control }) {
  return (
    <React.Fragment>
      <div className={"allinputfield"}>
        <ViewModal
          title={"FirstName"}
          register={register}
          disabled={false}
          name={"teacherFirstName"}
          value={data.first_name}
        />
        <ViewModal
          title={"MiddleName"}
          register={register}
          disabled={false}
          name={"teacherMiddleName"}
          value={data.middle_name}
        />
        <ViewModal
          title={"LastName"}
          register={register}
          disabled={false}
          name={"teacherLastName"}
          value={data.last_name}
        />
        <Controller
          name="gender"
          control={control}
          defaultValue={{
            label: data.gender,
            value: data.gender,
          }}
          render={({ field }) => (
            <SelectInputField
              title={"Gender"}
              name="gender"
              hasValue={true}
              onChangeHandler={field.onChange}
              value={{
                label: data.gender,
                value: data.gender,
              }}
              options={[
                { label: "Male", value: "Male" },
                { label: "Female", value: "Female" },
                { label: "Other", value: "Other" },
              ]}
            />
          )}
        />
        <ViewModal
          title={"Date of Birth"}
          register={register}
          disabled={false}
          name={"teacherDOB"}
          value={data.DOB}
          type={"date"}
        />
        <ViewModal
          title={"Phone"}
          register={register}
          disabled={false}
          name={"teacherPhone"}
          value={data.contact_no}
          type={"number"}
        />
        <ViewModal
          title={"TRN"}
          register={register}
          disabled={false}
          name={"teacherTRN"}
          value={data.TRN}
          type={"text"}
        />
        <ViewModal
          title={"Address"}
          register={register}
          disabled={false}
          name={"teacherAddress"}
          value={data.address}
        />
      </div>
    </React.Fragment>
  );
}

TeacherEditModal.propTypes = {
  register: PropTypes.func.isRequired,
  data: PropTypes.shape({
    first_name: PropTypes.string,
    middle_name: PropTypes.string,
    last_name: PropTypes.string,
    gender: PropTypes.string,
    DOB: PropTypes.string,
    contact_no: PropTypes.string,
    TRN: PropTypes.string,
    address: PropTypes.string,
  }).isRequired,
  Controller: PropTypes.elementType.isRequired,
  control: PropTypes.object.isRequired,
};

export default TeacherEditModal;
