import React, { useState, useRef, useCallback, useEffect } from "react";
import useStyles from "./styles";

export const FileUpload = ({ limit = 5, list = [], onChange }) => {
  const [imageList, setImageList] = useState(list);
  const classes = useStyles();
  const fileInputRef = useRef(null);

  useEffect(() => {
    onChange(imageList);
  }, [imageList]);

  const handleOpenSelector = () => {
    fileInputRef.current.click();
  };

  const handleOnChange = useCallback(
    (event) => {
      event.stopPropagation();
      event.preventDefault();
      var files = event.target.files;
      const listFiles = Array.from(files).map((file) => file);
      setImageList(imageList.concat(listFiles));
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
    <div className={classes.root} onClick={handleOpenSelector}>
      file upload
      <input
        className={classes.hiddenInput}
        ref={fileInputRef}
        type="file"
        onChange={handleOnChange}
        multiple
      />
      {imageList.map((image, i) => (
        <div key={`image-${i}`}>
          <span className={classes.image}>{image.name} </span>
          <span className={classes.remove} onClick={removeImage.bind(null, i)}>
            X
          </span>
        </div>
      ))}
    </div>
  );
};
