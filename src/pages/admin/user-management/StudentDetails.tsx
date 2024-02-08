import { useParams } from "react-router-dom";
import { useGetSingleStudentQuery } from "../../../redux/features/admin/userManagement.api";

const StudentDetails = () => {
  const { studentId } = useParams();
  const { data } = useGetSingleStudentQuery(studentId);
  console.log(data);
  return (
    <div>
      <h1>This is Student Details of {studentId}</h1>
    </div>
  );
};

export default StudentDetails;
