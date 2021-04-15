import React from "react";
import { Form, Input } from "antd";

const { TextArea } = Input;

export default ({ model, form }) => {
  return (
    <>
      <Form.Item
        label="Titulo"
        name="title"
        rules={[{ required: true, message: "Por favor! Insira um titulo" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
            message: "Insira um sub titulo",
            type: "string",
          },
        ]}
        label="Sub titulo"
        name="subTitle"
      >
        <Input />
      </Form.Item>
      <Form.Item label="Descrição" name="description">
        <TextArea rows={4} />
      </Form.Item>
    </>
  );
};
