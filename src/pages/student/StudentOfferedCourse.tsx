import { Button, Col, Row } from "antd";
import {
  useEnrollCourseMutation,
  useGetAllOfferedCoursesQuery,
} from "../../redux/features/student/student-course-management.api";
import { FieldValues, SubmitHandler } from "react-hook-form";

type TCourse = {
  [index: string]: any;
};

const StudentOfferedCourse = () => {
  const { data: offeredCoursesData } = useGetAllOfferedCoursesQuery(undefined);
  const [enroll] = useEnrollCourseMutation();

  const singleObject = offeredCoursesData?.data?.reduce(
    (acc: TCourse, item) => {
      const key = item.course.title;

      acc[key] = acc[key] || { courseTitle: key, sections: [] };
      acc[key].sections.push({
        section: item.section,
        days: item.days,
        startTime: item.startTime,
        endTime: item.endTime,
        _id: item._id,
      });

      return acc;
    },
    {}
  );

  const modifiedData = Object.values(singleObject ? singleObject : {});

  const handleEnroll: SubmitHandler<FieldValues> = async (id) => {
    const enrollData = {
      offeredCourse: id,
    };

    const res = await enroll(enrollData);
    console.log(res);
  };

  if (!modifiedData.length) {
    return <p>No Available Courses</p>;
  }

  return (
    <Row gutter={[0, 20]}>
      {modifiedData.map((item) => {
        return (
          <Col span={24} style={{ border: "solid #d4d4d4 2px" }}>
            <div style={{ padding: "10px" }}>
              <h1>{item?.courseTitle}</h1>
            </div>
            <div>
              {item?.sections?.map((section) => {
                return (
                  <Row
                    justify={"space-between"}
                    align={"middle"}
                    style={{ borderTop: "solid #d4d4d4 2px", padding: "10px" }}
                  >
                    <Col span={5}>Section: {section.section}</Col>
                    <Col span={5}>
                      Section:{" "}
                      {section.days.map((day) => (
                        <span style={{ marginLeft: 5 }}>{day}</span>
                      ))}
                    </Col>
                    <Col span={5}>Start Time: {section.startTime}</Col>
                    <Col span={5}>End Time: {section.endTime}</Col>
                    <Button onClick={() => handleEnroll(section._id)}>
                      Enroll
                    </Button>
                  </Row>
                );
              })}
            </div>
          </Col>
        );
      })}
    </Row>
  );
};

export default StudentOfferedCourse;
