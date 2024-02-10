import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import { useGetAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";
import { useState } from "react";
import { SubmitHandler, FieldValues } from "react-hook-form";

const OfferCourse = () => {
  const [id, setId] = useState("");
  const { data: academicFacultyData } = useGetAcademicFacultiesQuery(undefined);

  const academicFacultyOptions = academicFacultyData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHSelectWithWatch
            onValueChange={setId}
            label="Academic Faculty"
            name="academicFaculty"
            options={academicFacultyOptions}
          />
          <PHInput disabled={!id} type="text" label="Test" name="test" />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default OfferCourse;
