import {
  Button,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { useState } from "react";
import { useGetAllStudentsQuery } from "../../../redux/features/admin/userManagement.api";
import { TQueryParam, TStudent } from "../../../types";
import { Link } from "react-router-dom";

export type TTableData = Pick<
  TStudent,
  "fulName" | "id" | "email" | "contactNo"
>;

const StudentData = () => {
  const [query, setQuery] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);

  const {
    data: studentData,
    isFetching,
    isLoading,
  } = useGetAllStudentsQuery([
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...query,
  ]);

  const metaData = studentData?.meta;

  const tableData = studentData?.data?.map(
    ({ _id, fulName, id, email, contactNo }) => ({
      key: _id,
      fulName,
      id,
      email,
      contactNo,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "fulName",
    },
    {
      title: "Roll No.",
      dataIndex: "id",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Contact No.",
      dataIndex: "contactNo",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <Space>
            <Link to={`/admin/student-data/${item?.key}`}>
              <Button>Details</Button>
            </Link>
            <Link to={`/admin/student-update/${item?.key}`}>
              <Button>Update</Button>
            </Link>
            <Link to={`/admin/student-data/${item?.key}`}>
              <Button>Block</Button>
            </Link>
          </Space>
        );
      },
      width: "1%",
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    const queryParams: TQueryParam[] = [];

    if (extra.action === "filter") {
      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );
    }

    if (extra.action === "filter") {
      filters.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
      );
    }
    setQuery(queryParams);
  };

  if (isLoading) {
    return <p>Loading....</p>;
  }

  return (
    <>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        pagination={false}
        onChange={onChange}
      />
      <Pagination
        current={page}
        onChange={(value) => setPage(value)}
        pageSize={metaData?.limit}
        total={metaData?.total}
      />
    </>
  );
};

export default StudentData;
