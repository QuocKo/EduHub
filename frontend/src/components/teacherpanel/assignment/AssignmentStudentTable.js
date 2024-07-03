import React, { useMemo } from "react";
import PropTypes from "prop-types";
import TableContainer from "./../../common/Table/TableContainer";
import moment from "moment";

const AssignmentStudentTable = ({ remarkClick, setRemarkClick, data }) => {
  const columns = useMemo(
    () => [
      {
        Header: "SN",
        Cell: ({ row }) => {
          return row.index + 1;
        },
      },
      {
        Header: "Photo",
        accessor: (d) => {
          return (
            <div className="profilephoto">
              <img src={d.student.profile_image} alt="profile" />
            </div>
          );
        },
        SearchAble: false,
      },
      {
        Header: "Student Name",
        accessor: "student.username",
        SearchAble: true,
      },
      {
        Header: "Email",
        accessor: "student.email",
        SearchAble: true,
      },

      {
        Header: "Submitted Date",
        accessor: (d) => {
          return d.created_at.slice(0, 10);
        },
        SearchAble: false,
      },
      {
        Header: "Submitted Time",
        accessor: (d) => {
          const time = moment(d.created_at.slice(11, 19), "HH:mm").format("LT");
          return time;
        },
        SearchAble: false,
      },
      {
        Header: "File",
        SearchAble: false,
        Cell: ({ row }) => {
          return (
            <a
              href={row.original.submitted_files}
              target="_blank"
              className="btn-primary btn-custom"
              style={{ textDecoration: "none" }}
              rel="noopener noreferrer">
              View
            </a>
          );
        },
      },
      {
        Header: "Mark",
        SearchAble: false,
        className: "col_remark",
        Cell: ({ row }) => {
          return (
            <button
              className="btn-custom btn-danger"
              style={{ backgroundColor: "teal" }}
              onClick={() => setRemarkClick(!remarkClick)}>
              Remark
            </button>
          );
        },
      },
    ],
    [remarkClick, setRemarkClick]
  );

  return (
    <div style={{ margin: "20px 30px", marginBottom: 50 }}>
      <TableContainer columns={columns} data={data} />
    </div>
  );
};

AssignmentStudentTable.propTypes = {
  remarkClick: PropTypes.bool.isRequired,
  setRemarkClick: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      student: PropTypes.shape({
        profile_image: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
      }).isRequired,
      created_at: PropTypes.string.isRequired,
      submitted_files: PropTypes.string.isRequired,
    })
  ).isRequired,
  row: PropTypes.shape({
    original: PropTypes.shape({
      submitted_files: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default AssignmentStudentTable;
