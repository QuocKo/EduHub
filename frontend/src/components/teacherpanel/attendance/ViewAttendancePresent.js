import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { GetPaginatedFilterPromise } from "../../GetOptions";

function ViewAttendancePresent({ gradeId, subjectId }) {
  const [attendance, setAttendance] = useState([]);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    const GetOptions = async () => {
      try {
        const got = await GetPaginatedFilterPromise(
          "attendance",
          `teacher=${user.username}&grade=${gradeId}&subject=${subjectId}`
        );
        let arrayOfIndividual = [];
        let totalAbsent = 0, totalPresent = 0;
        for (let i = 0; i < got.length; i++) {
          // Process each attendance record
          if (got[i].status === "PRESENT") {
            totalPresent += 1;
          } else {
            totalAbsent += 1;
          }
        }
        setAttendance(got);
      } catch (error) {
        console.log(error);
      }
    };
    GetOptions();
  }, [gradeId, subjectId, user.username]);

  return (
    <div>
      <div>
        <p>Total Present: {attendance.filter(record => record.status === "PRESENT").length}</p>
        <p>Total Absent: {attendance.filter(record => record.status === "ABSENT").length}</p>
      </div>
    </div>
  );
}

ViewAttendancePresent.propTypes = {
  gradeId: PropTypes.number.isRequired,
  subjectId: PropTypes.number.isRequired,
};

export default ViewAttendancePresent;
