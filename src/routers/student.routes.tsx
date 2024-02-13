import MySchedule from "../pages/student/MySchedule";
import StudentDashboard from "../pages/student/StudentDashboard";
import StudentOfferedCourse from "../pages/student/StudentOfferedCourse";

export const studentPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <StudentDashboard />,
  },
  {
    name: "Offered Course",
    path: "sOfferedCourse",
    element: <StudentOfferedCourse />,
  },
  {
    name: "My Schedule",
    path: "schedule",
    element: <MySchedule />,
  },
];
