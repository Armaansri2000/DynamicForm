import React from "react";
import FieldRenderer from "./FieldRenderer";
import "../styles/CardRenderer.css";

const CardRenderer = ({ field, values, onChange, errors }) => {
  return (
    <div className="cardrenderer-section">
      <h4>{field.title}</h4>
      <div className="cardrenderer-grid">
        {field.data?.map((subField) => (
          <FieldRenderer
            key={subField.name}
            field={subField}
            value={values[subField.name] || (subField.type === "multiselect" ? [] : "")}
            onChange={(val) => onChange(subField.name, val)}
            error={errors[subField.name]} // ✅ inline error for nested fields
          />
        ))}
      </div>
    </div>
  );
};

export default CardRenderer;
