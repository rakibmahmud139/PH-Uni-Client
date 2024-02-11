export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekdays = ["sat", "sun", "mon", "tue", "wed", "thu", "fri"];

export const genders = ["male", "female", "others"];

export const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const semesterStatus = ["UPCOMING", "ONGOING", "ENDED"];

export const monthOptions = monthNames.map((item) => ({
  value: item,
  label: item,
}));

export const gendersOptions = genders.map((item) => ({
  value: item,
  label: item,
}));

export const bloodGroupsOptions = bloodGroups.map((item) => ({
  value: item,
  label: item,
}));

export const semesterStatusOptions = semesterStatus.map((item) => ({
  value: item,
  label: item,
}));

export const weekDaysOptions = weekdays.map((item) => ({
  value: item,
  label: item,
}));
