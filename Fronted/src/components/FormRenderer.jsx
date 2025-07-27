import React, { useState, useEffect } from "react";
import FieldRenderer from "./FieldRenderer";
import CardRenderer from "./CardRenderer";
import "../styles/FormRenderer.css";

const FormRenderer = () => {
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});
  const [schema, setSchema] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  // Fetch schema from backend
  useEffect(() => {
    fetch('http://localhost:5000/api/form-schema')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setSchema(data);
        setLoading(false);
        setFetchError(null);
      })
      .catch(error => {
        console.error('Error fetching form schema:', error);
        setLoading(false);
        setFetchError('Failed to fetch data from backend. Please make sure the backend server is running.');
      });
  }, []);

  const handleChange = (name, value) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateSingleField = (field, value) => {
    const { required, title, type, validator, error, min, max } = field;

    if (required && (!value || (Array.isArray(value) && value.length === 0))) {
      return `${title} is required`;
    }

    if (type === "email" && value) {
      const emailRegex =
        validator ? new RegExp(validator) : /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return error || "Enter a valid email address";
      }
    }

    if (type === "text" && value && validator) {
      const regex = new RegExp(validator);
      if (!regex.test(value)) {
        return error || `Invalid ${title}`;
      }
    }

    if (type === "number" && value !== "") {
      const num = Number(value);
      if (isNaN(num)) return `${title} must be a number`;

      if (required && value === "") return `${title} is required`;
      if (min !== undefined && num < min) return `${title} must be >= ${min}`;
      if (max !== undefined && num > max) return `${title} must be <= ${max}`;
    }

    return "";
  };

  const validateForm = () => {
    const newErrors = {};

    schema.forEach((field) => {
      if (field.type === "card") {
        field.data.forEach((subField) => {
          const val = formValues[subField.name];
          const err = validateSingleField(subField, val);
          if (err) newErrors[subField.name] = err;
        });
      } else {
        const val = formValues[field.name];
        const err = validateSingleField(field, val);
        if (err) newErrors[field.name] = err;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      alert("✅ Form submitted successfully!");
      console.log("Form Data:", formValues);
      setFormValues({});
      setErrors({});
    }
  };

  if (loading) {
    return (
      <div className="formrenderer-loading">
        Loading form...
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="formrenderer-error">
        <h3>⚠️ Error</h3>
        <p>{fetchError}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="formrenderer-retry-btn"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!schema || schema.length === 0) {
    return (
      <div className="formrenderer-error">
        <h3>⚠️ Error</h3>
        <p>No form schema available.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="formrenderer-container">
      <div className="formrenderer-section-title">User Information</div>

      <div className="formrenderer-grid-two">
        {schema
          .filter((f) =>
            ["text", "email", "number", "select", "multiselect", "file"].includes(f.type)
          )
          .map((field) => (
            <FieldRenderer
              key={field.name}
              field={field}
              value={formValues[field.name] || (field.type === "multiselect" ? [] : "")}
              onChange={(val) => handleChange(field.name, val)}
              error={errors[field.name]}
            />
          ))}
      </div>

      {schema
        .filter((f) => f.type === "card")
        .map((cardField) => (
          <CardRenderer
            key={cardField.name}
            field={cardField}
            values={formValues}
            onChange={handleChange}
            errors={errors}
          />
        ))}

      <button type="submit" className="formrenderer-submit-btn">
        Submit
      </button>
    </form>
  );
};

export default FormRenderer;
