import { useGetMyEnrollCoursesQuery } from "../../redux/features/student/student-course-management.api";

const MySchedule = () => {
  const { data } = useGetMyEnrollCoursesQuery(undefined);

  console.log(data);
  return (
    <div>
      {data?.data?.map((item) => {
        return (
          <div key={item._id}>
            <div>{item.course.title}</div>
            <div>{item.offeredCourse.section}</div>
            <div>
              {item.offeredCourse.days.map((day) => (
                <span> {day} </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MySchedule;
