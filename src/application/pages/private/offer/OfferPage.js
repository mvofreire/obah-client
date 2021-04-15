import React, { useEffect, useState } from "react";
import { SectionContentAdminHeader, Loading } from "components";
import { message } from "antd";
import {
  loadMyOffers,
  createOffer,
  removeOffer,
  updateOffer,
} from "services/offer";

import OfferForm from "./form/OfferForm";
import OfferTable from "./OfferTable";

const OfferPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [offers, setOffers] = useState([]);
  const [editModel, setEditModel] = useState({});

  useEffect(() => {
    loadOffers();
  }, []);

  const loadOffers = async () => {
    try {
      setIsLoading(true);
      const data = await loadMyOffers();
      setOffers(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (offer) => {
    setIsLoading(true);
    await createOffer(offer);
    loadOffers();
  };

  const handleUpdate = async (id, model) => {
    setIsLoading(true);
    await updateOffer(id, model);
    loadOffers();
  };

  const handleDelete = async (offer) => {
    try {
      await removeOffer(offer.id);
      loadOffers();
    } catch (e) {
      console.log(e);
      message.info("Tente novamente mais tarde");
    }
  };

  const handleEdit = (offer) => {
    setEditModel(offer);
  };

  return (
    <div>
      <SectionContentAdminHeader title="Minhas Promoções" />
      <OfferForm
        handleCreate={handleCreate}
        handleClose={() => setEditModel({})}
        handleUpdate={handleUpdate}
        model={editModel}
      />
      <Loading show={isLoading}>
        <OfferTable
          data={offers}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </Loading>
    </div>
  );
};

export default OfferPage;
