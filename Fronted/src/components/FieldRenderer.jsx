import React from "react";
import "../styles/FieldRenderer.css";

const FieldRenderer = ({ field, value, onChange, error }) => {
  const { title, type, placeholder, data, required } = field;

  if (["text", "email", "number", "date"].includes(type)) {
    return (
      <div className="fieldrenderer-group">
        <label className="fieldrenderer-label">
          {title}
          {required && " *"}
        </label>
        <input
          className="fieldrenderer-input"
          type={type}
          placeholder={placeholder || `Enter ${title}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {error && <span className="fieldrenderer-error">{error}</span>}
      </div>
    );
  }

  if (type === "select" || type === "multiselect") {
    return (
      <div className="fieldrenderer-group">
        <label className="fieldrenderer-label">
          {title}
          {required && " *"}
        </label>
        <select
          className="fieldrenderer-select"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="" disabled>
            {type === "select" ? "Select the primary skill" : "Select technologies"}
          </option>
          {data?.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.title}
            </option>
          ))}
        </select>
        {error && <span className="fieldrenderer-error">{error}</span>}
      </div>
    );
  }

  if (type === "file") {
    return (
      <div className="fieldrenderer-group">
        <label className="fieldrenderer-label">
          {title}
          {required && " *"}
        </label>
        <input
          ref={(input) => {
            if (input && !value) {
              input.value = '';
            }
          }}
          className="fieldrenderer-input"
          type="file"
          accept=".png"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file && !file.name.toLowerCase().endsWith('.png')) {
              onChange('', field.error);
            } else {
              onChange(file?.name || '', '');
            }
          }}
        />
        {error && <span className="fieldrenderer-error">{error}</span>}
      </div>
    );
  }

  return null;
};

export default FieldRenderer;
