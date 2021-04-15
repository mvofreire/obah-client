import React, { useCallback } from "react";
import { Form } from "antd";
import { FileUpload } from "components";

export default ({ model, form }) => {
  const handleChange = useCallback(
    (fileList) => {
      if (fileList.length > 0) {
        form.setFieldsValue({ images: fileList });
      }
    },
    [form]
  );

  return (
    <>
      <Form.Item label="Images" name="images">
        <FileUpload onChange={handleChange} />
      </Form.Item>
    </>
  );
};
