import React from 'react';
import { Ingredient, IngredientType } from '../domain';

/**
 * Props for IngredientDetail component
 */
export interface IngredientDetailProps {
  /**
   * Ingredient to display
   */
  ingredient: Ingredient | null;
  /**
   * Whether component is loading
   */
  isLoading?: boolean;
  /**
   * Error message if any
   */
  error?: string | null;
  /**
   * Callback when edit is clicked
   */
  onEdit?: (ingredient: Ingredient) => void;
  /**
   * Callback when delete is clicked
   */
  onDelete?: (ingredient: Ingredient) => void;
  /**
   * Callback when favorite is toggled
   */
  onToggleFavorite?: (ingredient: Ingredient) => void;
  /**
   * Callback when back is clicked
   */
  onBack?: () => void;
}

/**
 * Ingredient detail component
 * Displays full ingredient information
 * From functional specs section 2.3-2.4
 *
 * Features:
 * - Display all ingredient fields
 * - Display type-specific properties
 * - Edit/delete/favorite actions
 * - Copy to clipboard for properties
 * - Usage statistics (how many recipes use this ingredient)
 */
const IngredientDetail: React.FC<IngredientDetailProps> = ({
  ingredient,
  isLoading = false,
  error = null,
  onEdit,
  onDelete,
  onToggleFavorite,
  onBack,
}) => {
  if (isLoading) {
    return (
      <div className="ingredient-detail-loading" role="status" aria-live="polite">
        {/* TODO: Render loading skeleton */}
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ingredient-detail-error" role="alert">
        {/* TODO: Render error message */}
        <p>{error}</p>
        {onBack && (
          <button onClick={onBack} className="back-button">
            Back
          </button>
        )}
      </div>
    );
  }

  if (!ingredient) {
    return (
      <div className="ingredient-detail-empty">
        {/* TODO: Render empty state */}
        <p>No ingredient selected</p>
        {onBack && (
          <button onClick={onBack} className="back-button">
            Back
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="ingredient-detail" role="main" aria-label={`Details for ${ingredient.naam}`}>
      {/* TODO: Render header with back button and actions */}
      <div className="ingredient-detail-header">
        {onBack && (
          <button onClick={onBack} className="back-button" aria-label="Go back">
            {/* TODO: Render back icon */}
            ← Back
          </button>
        )}
        <h1>{ingredient.naam}</h1>
        <div className="ingredient-detail-actions">
          {onToggleFavorite && (
            <button
              onClick={() => onToggleFavorite(ingredient)}
              className="favorite-button"
              aria-label={ingredient.favoriet ? 'Remove from favorites' : 'Add to favorites'}
            >
              {ingredient.favoriet ? '★' : '☆'}
            </button>
          )}
          {onEdit && (
            <button onClick={() => onEdit(ingredient)} className="edit-button" aria-label={`Edit ${ingredient.naam}`}>
              {/* TODO: Render edit icon */}
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(ingredient)}
              className="delete-button"
              aria-label={`Delete ${ingredient.naam}`}
            >
              {/* TODO: Render delete icon */}
              Delete
            </button>
          )}
        </div>
      </div>

      {/* TODO: Render basic information section */}
      <section className="ingredient-section" aria-labelledby="basic-info-heading">
        <h2 id="basic-info-heading">Basic Information</h2>
        <div className="ingredient-info-grid">
          {/* TODO: Render info blocks */}
          <div className="info-block">
            <span className="info-label">Type:</span>
            <span className="info-value">{ingredient.type}</span>
          </div>
          {ingredient.leverancier && (
            <div className="info-block">
              <span className="info-label">Supplier:</span>
              <span className="info-value">{ingredient.leverancier}</span>
            </div>
          )}
          <div className="info-block">
            <span className="info-label">Status:</span>
            <span className={`info-value status ${ingredient.actief ? 'active' : 'inactive'}`}>
              {ingredient.actief ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>

        {ingredient.beschrijving && (
          <div className="ingredient-description">
            <h3>Description</h3>
            <p>{ingredient.beschrijving}</p>
          </div>
        )}

        {ingredient.notities && (
          <div className="ingredient-notes">
            <h3>Notes</h3>
            <p>{ingredient.notities}</p>
          </div>
        )}
      </section>

      {/* TODO: Render type-specific properties section */}
      <section className="ingredient-section" aria-labelledby="properties-heading">
        <h2 id="properties-heading">Properties</h2>
        <div className="properties-grid">
          {/* TODO: Render all properties from eigenschappen object */}
          {/* Properties will vary based on ingredient type */}
          {/* Malt: EBC, Extract yield, Malt type */}
          {/* Hop: Alpha acid, Hop type, Harvest year */}
          {/* Yeast: Yeast type, Attenuation, Temperature, Alcohol tolerance */}
          {/* Sugar: Sugar type */}
          {Object.entries(ingredient.eigenschappen).map(([key, value]) => (
            <div key={key} className="property-item">
              <span className="property-name">{key}:</span>
              <span className="property-value">{String(value)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* TODO: Render metadata section */}
      <section className="ingredient-section" aria-labelledby="metadata-heading">
        <h2 id="metadata-heading">Metadata</h2>
        <div className="metadata-grid">
          <div className="metadata-item">
            <span className="metadata-label">Created:</span>
            <span className="metadata-value">{new Date(ingredient.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="metadata-item">
            <span className="metadata-label">Updated:</span>
            <span className="metadata-value">{new Date(ingredient.updatedAt).toLocaleDateString()}</span>
          </div>
          <div className="metadata-item">
            <span className="metadata-label">ID:</span>
            <span className="metadata-value font-mono">{ingredient.id}</span>
          </div>
        </div>
      </section>

      {/* TODO: Render usage section */}
      <section className="ingredient-section" aria-labelledby="usage-heading">
        <h2 id="usage-heading">Usage</h2>
        {/* TODO: Show count of recipes using this ingredient */}
        {/* TODO: Show count of brew sessions using this ingredient */}
        <div className="usage-stats">
          {/* Usage statistics will be loaded separately */}
        </div>
      </section>
    </div>
  );
};

export default IngredientDetail;
