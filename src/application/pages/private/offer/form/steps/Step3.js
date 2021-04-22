import React, { useState, useEffect, useCallback } from "react";
import { Form, Select, DatePicker } from "antd";
import { loadPromotionTags } from "services/offer";
import { MapLocation } from 'components'
const { RangePicker } = DatePicker;
const { Option } = Select;

export default ({ model, form }) => {
  const [tagOptions, setTagOptions] = useState([]);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    (async () => {
      const _tagsOptions = await loadPromotionTags();
      setTagOptions(_tagsOptions);
    })();
  }, []);

  const handleChangePosition = useCallback((latLng) => {
    form.setFieldsValue({ position_lat: latLng.lat, position_lng: latLng.lng })
  }, [form])

  const disabledDate = (current) => {
    if (!dates || dates.length === 0) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], "days") > 7;
    const tooEarly = dates[1] && dates[1].diff(current, "days") > 7;
    return tooEarly || tooLate;
  };

  return (
    <>
      <Form.Item
        name="tags"
        label="Tags"
        rules={[
          {
            required: true,
            message: "Selecione pelo menos uma tag da promoção!",
            type: "array",
          },
        ]}
      >
        <Select mode="multiple" placeholder="Red">
          {tagOptions.map((tag) => (
            <Option key={`tag-${tag.id}`} value={tag.id}>
              {tag.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Período de validade"
        name="period"
        rules={[
          {
            required: true,
            message: "Por favor! Insira o período de validade.",
          },
        ]}
      >
        <RangePicker
          disabled={[!!model.id, !!model.id]}
          style={{ width: "100%" }}
          disabledDate={disabledDate}
          placeholder={["Início", "Fim"]}
          onCalendarChange={(value) => {
            setDates(value);
          }}
        />
      </Form.Item>

      <Form.Item name='position_lat' hidden />
      <Form.Item name='position_lng' hidden />
      <Form.Item
        label="Onde vai ser publicado essa promoção?"
      >
        <MapLocation onFoundLocation={handleChangePosition} />
      </Form.Item>
    </>
  );
};
