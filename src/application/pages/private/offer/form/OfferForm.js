import React, { useState, useEffect, useCallback } from "react";
import { Row, Form, Modal, Col, Button, Steps } from "antd";
import { Icon } from "components";
import moment from "moment";

import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";

const { Step } = Steps;

const steps = [
  {
    title: "Dados da Promoção",
    content: Step1,
  },
  {
    title: "Imagens",
    content: Step2,
  },
  {
    title: "Configuração",
    content: Step3,
  },
];

const OfferCreate = ({
  handleCreate,
  handleUpdate,
  handleClose,
  model = {},
}) => {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);
  const [values, setValues] = useState({});
  const [form] = Form.useForm();

  const Content = steps[step].content;
  const isLastStep = step === steps.length - 1;

  const onFinish = useCallback(
    (_values) => {
      const { period, ...rest } = _values;
      const [start, end] = period;

      const _model = {
        ...rest,
        startDate: start.toDate(),
        endDate: end.toDate(),
      };

      if (!!model.id) {
        !!handleUpdate && handleUpdate(model.id, _model);
      } else {
        !!handleCreate && handleCreate(_model);
      }
      setStep(0);
      setValues({});
      form.resetFields();
      hideModal();
    },
    [model, form]
  );

  useEffect(() => {
    if (model.id) {
      form.setFieldsValue({
        title: model.title,
        sub_title: model.sub_title,
        images: model.images.map((item) => item.path),
        period: [moment(model.start_date), moment(model.end_date)],
      });
      showModal();
    }
  }, [model]);

  const showModal = () => setVisible(true);
  const hideModal = () => {
    form.resetFields();
    handleClose();
    setVisible(false);
  };

  const updateValues = (formValues) => {
    return new Promise((resolve) => {
      setValues((oldValues) => {
        const _nextValues = { ...oldValues, ...formValues };
        resolve(_nextValues);
        return _nextValues;
      });
    });
  };

  const handleOnOk = useCallback(async () => {
    const formValues = await form.validateFields();
    const _values = await updateValues(formValues);

    if (isLastStep) {
      onFinish(_values);
    } else {
      setStep(step + 1);
    }
  }, [step]);

  return (
    <>
      <Row type="flex" style={{ marginBottom: 20 }} justify="end">
        <Col xs>
          <Button
            size="large"
            type="primary"
            icon={<Icon name="TagsOutlined" />}
            onClick={showModal}
          >
            Criar Promoção
          </Button>
        </Col>
      </Row>
      <Modal
        title="Criar Nova Promoção"
        okText={isLastStep ? "Salvar" : "Próximo"}
        cancelText="Fechar"
        visible={visible}
        width={965}
        onOk={handleOnOk}
        onCancel={hideModal}
      >
        <Steps current={step}>
          {steps.map((item, i) => (
            <Step
              key={`step-${i}`}
              title={item.title}
              onClick={() => setStep(i)}
            />
          ))}
        </Steps>
        <Form form={form} layout="vertical" initialValues={values}>
          <Content model={model} form={form} />
        </Form>
      </Modal>
    </>
  );
};

export default OfferCreate;
