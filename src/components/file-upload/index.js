import React, { useState, useRef, useCallback, useEffect } from "react";
import useStyles from "./styles";
import { Row, Col, Image, Button, Space } from "antd";

const toBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve({
        file,
        path: reader.result,
      });
    };
    reader.onerror = (error) => reject(error);
  });
};

export const FileUpload = ({
  id,
  limit = 5,
  onChange,
  multiple = true,
  value,
  ...rest
}) => {
  const [imageList, setImageList] = useState([]);
  const classes = useStyles();
  const fileInputRef = useRef(null);

  useEffect(() => {
    const _data = imageList
      .filter((item) => !!item.file)
      .map((item) => item.file);
    if (_data.length > 0) {
      onChange(_data);
    }
  }, [imageList]);

  useEffect(() => {
    if (!!value && value.length > 0) {
      const files = value.map((path) => ({ path }));
    }
  }, [value]);

  const handleOpenSelector = () => {
    fileInputRef.current.click();
  };

  const normalizeFiles = useCallback(
    async (files) => {
      const promises = [];
      files.forEach((file) => {
        promises.push(toBase64(file));
      });
      const data = await Promise.all(promises);
      return data;
    },
    [imageList]
  );

  const handleOnChange = useCallback(
    async (event) => {
      event.stopPropagation();
      event.preventDefault();
      var files = event.target.files;
      const listFiles = Array.from(files).map((file) => file);
      const result = await normalizeFiles(listFiles);
      setImageList(imageList.concat(result));
    },
    [imageList]
  );

  const removeImage = useCallback(
    (index, e) => {
      e.stopPropagation();
      e.preventDefault();
      const _image = imageList.filter((image, i) => index != i);
      setImageList(_image);
    },
    [imageList]
  );

  return (
    <div className={classes.root}>
      <Space size={30} align="center">
        <Button onClick={handleOpenSelector} type="dashed">
          Selecionar Arquivos
        </Button>
      </Space>
      <input
        className={classes.hiddenInput}
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleOnChange}
        multiple={multiple}
      />
      <Image.PreviewGroup>
        <Row gutter={[16, 16]}>
          {imageList.map(({ path }, i) => (
            <Col span={3} key={`image-${i}`}>
              <Image
                src={path}
                height={100}
                width={100}
                style={{ objectFit: "cover" }}
              />
              <span
                className={classes.remove}
                onClick={removeImage.bind(null, i)}
              >
                X
              </span>
            </Col>
          ))}
        </Row>
      </Image.PreviewGroup>
    </div>
  );
};
