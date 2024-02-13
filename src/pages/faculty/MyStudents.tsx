import { useParams } from "react-router-dom";
import {
  useAddMarkMutation,
  useGetAllFacultyCoursesQuery,
} from "../../redux/features/faculty/facultyCourse.api";
import { Button, Modal, Table } from "antd";
import { useState } from "react";
import PHForm from "../../components/form/PHForm";
import PHInput from "../../components/form/PHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";

const MyStudents = () => {
  const { registerSemesterId, courseId } = useParams();

  const { data: facultyCoursesData } = useGetAllFacultyCoursesQuery([
    { name: "semesterRegistration", value: registerSemesterId },
    { name: "course", value: courseId },
  ]);

  const tableData = facultyCoursesData?.data?.map(
    ({ _id, student, semesterRegistration, offeredCourse }) => ({
      key: _id,
      name: student.fullName,
      roll: student.id,
      student: student._id,
      semesterRegistration: semesterRegistration._id,
      offeredCourse: offeredCourse._id,
    })
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Roll",
      dataIndex: "roll",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <div>
            <AddMarksModal studentInfo={item} />
          </div>
        );
      },
    },
  ];

  return <Table columns={columns} dataSource={tableData} />;
};

const AddMarksModal = ({ studentInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addMark] = useAddMarkMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const studentMark = {
      semesterRegistration: studentInfo.semesterRegistration,
      offeredCourse: studentInfo.offeredCourse,
      student: studentInfo.student,
      courseMarks: {
        classTest1: Number(data.classTest1),
        midTerm: Number(data.midTerm),
        classTest2: Number(data.classTest2),
        finalTerm: Number(data.finalTerm),
      },
    };

    const res = await addMark(studentMark);
    console.log(res);
  };

  return (
    <>
      <Button onClick={showModal}>Update Marks</Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <PHForm onSubmit={handleSubmit}>
          <PHInput type="text" name="classTest1" label="Class Test 1" />
          <PHInput type="text" name="classTest2" label="Class Test 2" />
          <PHInput type="text" name="midTerm" label="Mid Term" />
          <PHInput type="text" name="finalTerm" label="Final" />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Modal>
    </>
  );
};

export default MyStudents;
