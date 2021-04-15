import React from "react";
import { Space, Tag, Popconfirm, Image } from "antd";
import { DataTable, Icon } from "components";
import { formatToPTBR } from "util/date";

import fallbackImage from "assets/images/people-having-fun.png";

const STATUSES = {
  0: {
    name: "CheckCircleOutlined",
    color: "green",
  },
  1: {
    name: "ClockCircleOutlined",
    color: "orange",
  },
  2: {
    name: "MinusCircleOutlined",
    color: "grey",
  },
};
const OfferTable = ({ data, handleDelete, handleEdit }) => {
  return (
    <DataTable
      data={data}
      columns={[
        {
          render: (record) => {
            const image =
              record.images.length > 0 ? record.images[0] : { path: "error" };
            return (
              <Image
                height={70}
                width={70}
                src={image.path}
                fallback={fallbackImage}
                style={{
                  objectFit: "cover",
                }}
              />
            );
          },
        },
        {
          title: "Title",
          dataIndex: "title",
          key: "title",
        },
        {
          title: "SubTitle",
          dataIndex: "sub_title",
          key: "subtitle",
        },
        {
          key: "date",
          title: "Data",
          render: (record) => {
            return (
              <Space>
                <Tag icon={<Icon name="CalendarOutlined" />}>
                  {formatToPTBR(record.start_date)}
                </Tag>
                <Tag icon={<Icon name="CalendarOutlined" />}>
                  {formatToPTBR(record.end_date)}
                </Tag>
              </Space>
            );
          },
        },
        {
          key: "totalParticipants",
          title: "Total de Participantes",
          dataIndex: "totalParticipants",
          align: "center",
        },
        {
          key: "status",
          title: "Status",
          dataIndex: "status",
          align: "center",
          render(value) {
            return (
              <Icon name={STATUSES[value].name} color={STATUSES[value].color} />
            );
          },
        },
        {
          key: "actions",
          title: "Ações",
          width: 50,
          fixed: "right",
          render: (offer) => (
            <Space direction="horizontal">
              <Popconfirm
                title="Deseja realmente deletar esse?"
                onConfirm={handleDelete.bind(null, offer)}
              >
                <Icon
                  name="DeleteFilled"
                  style={{ cursor: "pointer" }}
                  size={20}
                />
              </Popconfirm>
            </Space>
          ),
        },
      ]}
    />
  );
};

export default OfferTable;
