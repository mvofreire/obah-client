import React, { Fragment, useCallback } from "react";
import { SectionContentAdminHeader, FileUpload } from "components";
import { useAppContext } from "contexts/app";
import { updateClient } from "services/client";
export default () => {
  const { identity } = useAppContext();
  const { session } = identity;

  const handleOnChange = useCallback(async (files) => {
    try {
      if (files.length > 0) {
        await updateClient({ logo: files[0] });
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Fragment>
      <SectionContentAdminHeader title={session.name} />
      Atualizar Logo
      <FileUpload multiple={false} onChange={handleOnChange} />
    </Fragment>
  );
};
