import React, { useState, useEffect } from 'react';
import { Ingredient, IngredientType, CreateIngredientDTO, UpdateIngredientDTO, MaltProperties, HopProperties, YeastProperties, SugarProperties } from '../domain';

/**
 * Props for IngredientForm component
 */
export interface IngredientFormProps {
  /**
   * Ingredient to edit (undefined for create)
   */
  ingredient?: Ingredient;
  /**
   * Callback when form is submitted
   */
  onSubmit: (data: CreateIngredientDTO | UpdateIngredientDTO) => void | Promise<void>;
  /**
   * Callback when form is cancelled
   */
  onCancel?: () => void;
  /**
   * Whether form is in loading state
   */
  isLoading?: boolean;
  /**
   * Error message if any
   */
  error?: string | null;
  /**
   * Success message if any
   */
  success?: string | null;
}

/**
 * Ingredient form component
 * Handles create and edit of ingredients
 * From functional specs section 2.5: "Ingrediënten aanmaken", "Ingrediënten wijzigen"
 *
 * Features:
 * - Create new ingredient
 * - Edit existing ingredient
 * - Type-specific properties (Malt, Hop, Yeast, Sugar, Custom)
 * - Validation
 * - Error/success messages
 */
const IngredientForm: React.FC<IngredientFormProps> = ({
  ingredient,
  onSubmit,
  onCancel,
  isLoading = false,
  error = null,
  success = null,
}) => {
  // TODO: Initialize form state from ingredient or defaults
  const [formData, setFormData] = useState<CreateIngredientDTO | UpdateIngredientDTO>(() => {
    if (ingredient) {
      return {
        naam: ingredient.naam,
        type: ingredient.type,
        leverancier: ingredient.leverancier,
        beschrijving: ingredient.beschrijving,
        notities: ingredient.notities,
        eigenschappen: ingredient.eigenschappen,
      };
    }
    return {
      naam: '',
      type: IngredientType.CUSTOM,
      eigenschappen: {},
    };
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // TODO: Implement field change handler
  const handleFieldChange = (field: keyof (CreateIngredientDTO | UpdateIngredientDTO), value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear validation error for this field
    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // TODO: Implement property change handler
  const handlePropertyChange = (property: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      eigenschappen: {
        ...prev.eigenschappen,
        [property]: value,
      },
    }));
  };

  // TODO: Implement form validation
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.naam || formData.naam.trim() === '') {
      errors.naam = 'Name is required';
    }
    if (!formData.type) {
      errors.type = 'Type is required';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // TODO: Implement form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await onSubmit(formData);
    } catch (err) {
      // Error handling done via props
    }
  };

  // TODO: Implement form reset
  const handleReset = () => {
    if (ingredient) {
      setFormData({
        naam: ingredient.naam,
        type: ingredient.type,
        leverancier: ingredient.leverancier,
        beschrijving: ingredient.beschrijving,
        notities: ingredient.notities,
        eigenschappen: ingredient.eigenschappen,
      });
    } else {
      setFormData({
        naam: '',
        type: IngredientType.CUSTOM,
        eigenschappen: {},
      });
    }
    setValidationErrors({});
  };

  return (
    <form className="ingredient-form" onSubmit={handleSubmit} noValidate>
      {/* TODO: Render form title */}
      <h2>{ingredient ? 'Edit Ingredient' : 'Create Ingredient'}</h2>

      {/* TODO: Render error message */}
      {error && (
        <div className="form-error" role="alert">
          {error}
        </div>
      )}

      {/* TODO: Render success message */}
      {success && (
        <div className="form-success" role="status">
          {success}
        </div>
      )}

      {/* TODO: Render form sections */}
      <fieldset className="form-section" disabled={isLoading}>
        <legend>Basic Information</legend>

        {/* TODO: Render naam field */}
        <div className="form-group">
          <label htmlFor="naam" className="form-label">
            Name *
          </label>
          <input
            id="naam"
            type="text"
            value={formData.naam || ''}
            onChange={(e) => handleFieldChange('naam', e.target.value)}
            className={`form-input ${validationErrors.naam ? 'error' : ''}`}
            aria-invalid={!!validationErrors.naam}
            aria-describedby={validationErrors.naam ? 'naam-error' : undefined}
            placeholder="Enter ingredient name"
          />
          {validationErrors.naam && (
            <span id="naam-error" className="form-error-message">
              {validationErrors.naam}
            </span>
          )}
        </div>

        {/* TODO: Render type field */}
        <div className="form-group">
          <label htmlFor="type" className="form-label">
            Type *
          </label>
          <select
            id="type"
            value={formData.type || ''}
            onChange={(e) => handleFieldChange('type', e.target.value as IngredientType)}
            className={`form-select ${validationErrors.type ? 'error' : ''}`}
            aria-invalid={!!validationErrors.type}
            aria-describedby={validationErrors.type ? 'type-error' : undefined}
          >
            <option value="">Select type</option>
            {Object.values(IngredientType).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {validationErrors.type && (
            <span id="type-error" className="form-error-message">
              {validationErrors.type}
            </span>
          )}
        </div>

        {/* TODO: Render supplier field */}
        <div className="form-group">
          <label htmlFor="leverancier" className="form-label">
            Supplier
          </label>
          <input
            id="leverancier"
            type="text"
            value={formData.leverancier || ''}
            onChange={(e) => handleFieldChange('leverancier', e.target.value)}
            className="form-input"
            placeholder="Enter supplier name"
          />
        </div>

        {/* TODO: Render description field */}
        <div className="form-group">
          <label htmlFor="beschrijving" className="form-label">
            Description
          </label>
          <textarea
            id="beschrijving"
            value={formData.beschrijving || ''}
            onChange={(e) => handleFieldChange('beschrijving', e.target.value)}
            className="form-textarea"
            placeholder="Enter ingredient description"
            rows={3}
          />
        </div>

        {/* TODO: Render notes field */}
        <div className="form-group">
          <label htmlFor="notities" className="form-label">
            Notes
          </label>
          <textarea
            id="notities"
            value={formData.notities || ''}
            onChange={(e) => handleFieldChange('notities', e.target.value)}
            className="form-textarea"
            placeholder="Enter notes"
            rows={3}
          />
        </div>
      </fieldset>

      {/* TODO: Render type-specific properties */}
      <fieldset className="form-section" disabled={isLoading}>
        <legend>Type-Specific Properties</legend>
        {/* Properties will vary based on selected type */}
        {/* TODO: Render Malt properties if type === MALT */}
        {/* - EBC, Extract yield, Malt type */}
        {/* TODO: Render Hop properties if type === HOP */}
        {/* - Alpha acid, Hop type, Harvest year */}
        {/* TODO: Render Yeast properties if type === YEAST */}
        {/* - Yeast type, Attenuation, Temperature, Alcohol tolerance */}
        {/* TODO: Render Sugar properties if type === SUGAR */}
        {/* - Sugar type */}
      </fieldset>

      {/* TODO: Render form actions */}
      <div className="form-actions">
        <button type="submit" disabled={isLoading} className="form-submit-button">
          {isLoading ? 'Saving...' : ingredient ? 'Update Ingredient' : 'Create Ingredient'}
        </button>
        <button type="button" onClick={handleReset} disabled={isLoading} className="form-reset-button">
          Reset
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} disabled={isLoading} className="form-cancel-button">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default IngredientForm;
