import React, { useState, useEffect } from "react";
import InnerHeader from "./../../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import { useParams } from "react-router-dom";
import AssignmentStudentTable from "./AssignmentStudentTable";
import ChangeInput from "./../../common/Modal/ChangeInput";
import { useDispatch, useSelector } from "react-redux";
import {
  AssignmentGivenById,
  ChangeTeacherAssignment,
} from "./../../../redux/actions/teacher/teacheractions";
import Loading from "../../common/Loading";
import moment from "moment";

import AssignmentEditModal from "./AssignmentEditModal";
import { useForm, Controller } from "react-hook-form";
import { createMessage } from "../../../redux/actions/alertactions";
import axiosInstance from "../../../axios";
import { GetPaginatedFilterPromise } from "../../GetOptions";
import AssignmentPendingList from "./AssignmentPendingList";

function AssignmentDetail() {
  const [click, setClick] = useState(false);
  const [submitted, setSubmitted] = useState(true);
  const [remarkClick, setRemarkClick] = useState(false);
  const [assignmentSubmitted, setAssignment] = useState([]);
  const { id } = useParams();

  const { handleSubmit, control, register } = useForm();

  const dispatch = useDispatch();

  const { assignmentId } = useSelector((state) => state.teachers);

  useEffect(() => {
    dispatch(AssignmentGivenById(id));
  }, [dispatch, id]);

  useEffect(() => {
    const getOptions = async () => {
      const data = await GetPaginatedFilterPromise(
        "submittedassignments",
        `assignment=${id}`
      );
      setAssignment(data);
    };

    getOptions();
  }, [id]);

  const onSubmit = (data) => {
    if (!data.subject) {
      dispatch(createMessage({ classRequired: "Successfully" }));
    } else {
      console.log(data);
      const postdata = new FormData();
      postdata.append("date_due", data.dateDue);
      postdata.append("related_files", data.file);
      postdata.append("instructions", data.subject);
      postdata.append("time_due", data.timeDue);
      postdata.append("title", data.title);

      axiosInstance
        .get(
          `/grades/?classname=${data.class.value}&section=${data.section.value}`
        )
        .then(({ data: { results } }) => {
          postdata.append("for_grade", results[0].id);
          dispatch(ChangeTeacherAssignment(postdata, id));
        })
        .catch((err) => {
          if (err.response) console.log(err.response);
          else if (err.request) console.log(err.request);
          else console.log(err);
        });

      setClick(false);
    }
  };

  return assignmentId ? (
    <React.Fragment>
      {click && (
        <div className="modal">
          <div className={click ? "model-section visible" : "model-section"}>
            <div className="modal-content">
              <form onSubmit={handleSubmit(onSubmit)}>
                <span className="close" onClick={() => setClick(!click)}>
                  &times;
                </span>
                <div className="content">
                  <h2>Edit Student&apos;s Info</h2>
                  <div className="content-section">
                    <AssignmentEditModal
                      register={register}
                      data={assignmentId}
                      Controller={Controller}
                      control={control}
                    />
                  </div>
                  <button
                    className="btn-submit"
                    style={{ marginLeft: "40px", marginTop: "20px" }}>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {remarkClick && (
        <ChangeInput
          onSubmit={onSubmit}
          valueArray={[]}
          click={remarkClick}
          setClick={setRemarkClick}
          heading={"Grade this assignment"}
          isCustom2={true}
          placeholder={"Write Mark"}
          title="Mark"
        />
      )}
      <InnerHeader icon={<MdIcons.MdUploadFile />} name={`Assignments`} />
      <div className="main-content">
        <div className="card-section">
          <h2 className="assignment_id">
            {`Assignment : ${id > 9 ? id : "0" + id}`}
          </h2>
          <div className="content-section assignment_mid">
            <div className="grid_assignment">
              <div className="assignment_left">
                <div className="info">
                  <h4>Course</h4>
                  <div className="content">{assignmentId.subject}</div>
                </div>
                <div className="info">
                  <h4>Class</h4>
                  <div className="content">
                    {assignmentId.for_grade.class_name}
                  </div>
                </div>
                <div className="info">
                  <h4>Section</h4>
                  <div className="content">
                    {assignmentId.for_grade.section}
                  </div>
                </div>
                <div className="info">
                  <h4>Teacher</h4>
                  <div className="content">
                    {assignmentId.created_by.username}
                  </div>
                </div>
              </div>
              <div className="assignment_right">
                <div className="info">
                  <h4>Title</h4>
                  <div className="content">{assignmentId.title}</div>
                </div>
                <div className="info">
                  <h4>Date Due</h4>
                  <div className="content">{assignmentId.date_due}</div>
                </div>
                <div className="info">
                  <h4>Time Due</h4>
                  <div className="content">
                    {moment(assignmentId.time_due, "HH:mm").format("LT")}
                  </div>
                </div>
                <div className="info">
                  <h4>File</h4>
                  <div className="content">
                    {assignmentId.related_files ? (
                      <a
                        href={assignmentId.related_files}
                        style={{ textDecoration: "none" }}
                        className="btn-edit">
                        Preview File
                      </a>
                    ) : (
                      "No file Provided"
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="instruction_info">
              <h4>Instruction</h4>
              <div className="content">{assignmentId.instructions}</div>
            </div>
          </div>
        </div>
        <div className="card-section">
          <h2 className="heading">
            Student Performance
            <span style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                style={{ color: submitted ? "white" : "inherit" }}
                className={`btn-custom ${submitted ? "btn-active" : ""}`}
                onClick={() => {
                  setSubmitted(true);
                }}>
                Submitted
              </button>
              <button
                className={`btn-custom ${!submitted ? "btn-active" : ""}`}
                onClick={() => {
                  setSubmitted(false);
                }}>
                Pending
              </button>
            </span>
          </h2>
          <div className="content-section">
            {submitted ? (
              <AssignmentStudentTable
                remarkClick={remarkClick}
                setRemarkClick={setRemarkClick}
                data={assignmentSubmitted}
              />
            ) : (
              <AssignmentPendingList
                data={assignmentSubmitted}
                assignment={assignmentId}
              />
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  ) : (
    <Loading />
  );
}
export default AssignmentDetail;
