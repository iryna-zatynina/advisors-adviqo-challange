// @ts-nocheck
import React from "react";
import "./Filters.scss";
import { LANGUAGES, STATUSES } from "../../shared/variables";
import { Select, Button, Form } from "antd";
import { IFilter } from "../../interfaces/interfaces";

interface FiLtersProps {
  filters: IFilter[];
  setFilters: (x: IFilter) => void;
}
const Filters = ({ filters, setFilters }: FiLtersProps): JSX.Element => {
  const { Option } = Select;
  const [form] = Form.useForm();

  const onSelectChange = (key: string, value: string) => {
    const newFilter = {
      [key]: value,
    };

    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilter,
    }));
  };

  const onReset = () => {
    form.resetFields();
    setFilters({});
  };

  return (
    <div className="Filters">
      <span>Filter by:</span>
      <Form form={form} className="form">
        <Form.Item name="language">
          <Select
            placeholder="Language"
            className="select"
            onChange={(v) => onSelectChange("language", v)}
          >
            {LANGUAGES.map((item, i) => (
              <Option key={i} value={item}>
                {item}
              </Option>
            ))}
          </Select>

          </Form.Item>
          <Form.Item name="status">
          <Select
            placeholder="Status"
            className="select"
            onChange={(v) => onSelectChange("status", v)}
            allowClear
          >
            {STATUSES.map((item, i) => (
              <Option key={i} value={item}>
                {item}
              </Option>
            ))}
          </Select>
          </Form.Item>
          <Form.Item>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Filters;
