import React, { useState, useCallback } from 'react';
import { Ingredient, IngredientType, IngredientSearchResult } from '../domain';
import { IngredientService } from '../services';

/**
 * Props for IngredientList component
 */
export interface IngredientListProps {
  /**
   * List of ingredients to display
   */
  ingredients: Ingredient[];
  /**
   * Whether list is loading
   */
  isLoading?: boolean;
  /**
   * Error message if any
   */
  error?: string | null;
  /**
   * Callback when ingredient is selected
   */
  onSelectIngredient?: (ingredient: Ingredient) => void;
  /**
   * Callback when delete is clicked
   */
  onDeleteIngredient?: (ingredient: Ingredient) => void;
  /**
   * Callback when edit is clicked
   */
  onEditIngredient?: (ingredient: Ingredient) => void;
  /**
   * Callback when favorite is toggled
   */
  onToggleFavorite?: (ingredient: Ingredient) => void;
  /**
   * Whether list is in selection mode
   */
  selectionMode?: boolean;
  /**
   * Selected ingredient IDs in selection mode
   */
  selectedIds?: string[];
  /**
   * Callback for selection changes
   */
  onSelectionChange?: (selectedIds: string[]) => void;
}

/**
 * Ingredient list component
 * Displays ingredients in a list or table format
 * From functional specs section 2.5: "Ingrediëntenbibliotheek beheren"
 *
 * Features:
 * - Display ingredients with name, type, supplier
 * - Favorite/unfavorite actions
 * - Edit/delete actions
 * - Selection mode for bulk operations
 * - Sorting (by name, type, creation date)
 * - Status indicators (active/inactive)
 */
const IngredientList: React.FC<IngredientListProps> = ({
  ingredients,
  isLoading = false,
  error = null,
  onSelectIngredient,
  onDeleteIngredient,
  onEditIngredient,
  onToggleFavorite,
  selectionMode = false,
  selectedIds = [],
  onSelectionChange,
}) => {
  const [sortBy, setSortBy] = useState<'naam' | 'type' | 'createdAt'>('naam');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // TODO: Implement sorting
  const handleSort = useCallback(
    (column: 'naam' | 'type' | 'createdAt') => {
      if (sortBy === column) {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
      } else {
        setSortBy(column);
        setSortOrder('asc');
      }
    },
    [sortBy, sortOrder]
  );

  // TODO: Implement selection toggle
  const handleSelectIngredient = useCallback(
    (ingredientId: string, selected: boolean) => {
      if (!onSelectionChange) return;
      const newSelected = selected ? [...selectedIds, ingredientId] : selectedIds.filter((id) => id !== ingredientId);
      onSelectionChange(newSelected);
    },
    [selectedIds, onSelectionChange]
  );

  // TODO: Implement select all
  const handleSelectAll = useCallback(
    (selected: boolean) => {
      if (!onSelectionChange) return;
      const newSelected = selected ? ingredients.map((ing) => ing.id) : [];
      onSelectionChange(newSelected);
    },
    [ingredients, onSelectionChange]
  );

  if (error) {
    return (
      <div className="ingredient-list-error" role="alert">
        {/* TODO: Render error message */}
        <p>{error}</p>
        {/* TODO: Render retry button */}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="ingredient-list-loading" role="status" aria-live="polite">
        {/* TODO: Render loading skeleton */}
      </div>
    );
  }

  if (ingredients.length === 0) {
    return (
      <div className="ingredient-list-empty">
        {/* TODO: Render empty state */}
        <p>No ingredients found</p>
        {/* TODO: Render add ingredient button */}
      </div>
    );
  }

  return (
    <div className="ingredient-list" role="grid" aria-label="Ingredients list">
      {/* TODO: Render list header with sorting */}
      <div className="ingredient-list-header">
        {selectionMode && (
          <div className="list-column checkbox-column">
            <input
              type="checkbox"
              checked={selectedIds.length === ingredients.length && ingredients.length > 0}
              onChange={(e) => handleSelectAll(e.target.checked)}
              aria-label="Select all ingredients"
            />
          </div>
        )}
        <div className="list-column naam-column">
          <button
            onClick={() => handleSort('naam')}
            className="sort-button"
            aria-sort={sortBy === 'naam' ? (sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'}
          >
            Name
            {/* TODO: Render sort indicator icon */}
          </button>
        </div>
        <div className="list-column type-column">
          <button
            onClick={() => handleSort('type')}
            className="sort-button"
            aria-sort={sortBy === 'type' ? (sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'}
          >
            Type
            {/* TODO: Render sort indicator icon */}
          </button>
        </div>
        <div className="list-column supplier-column">Supplier</div>
        <div className="list-column status-column">Status</div>
        <div className="list-column actions-column">Actions</div>
      </div>

      {/* TODO: Render ingredient list items */}
      <div className="ingredient-list-items">
        {ingredients.map((ingredient) => (
          <div key={ingredient.id} className="ingredient-list-item" role="row">
            {selectionMode && (
              <div className="list-column checkbox-column">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(ingredient.id)}
                  onChange={(e) => handleSelectIngredient(ingredient.id, e.target.checked)}
                  aria-label={`Select ${ingredient.naam}`}
                />
              </div>
            )}
            <div
              className="list-column naam-column"
              onClick={() => onSelectIngredient?.(ingredient)}
              role="button"
              tabIndex={0}
            >
              {ingredient.naam}
              {ingredient.favoriet && <span className="favorite-indicator">★</span>}
            </div>
            <div className="list-column type-column">{ingredient.type}</div>
            <div className="list-column supplier-column">{ingredient.leverancier || '-'}</div>
            <div className="list-column status-column">
              {/* TODO: Render status badge */}
              <span className={`status-badge ${ingredient.actief ? 'active' : 'inactive'}`}>
                {ingredient.actief ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="list-column actions-column">
              {/* TODO: Render action buttons */}
              <button
                onClick={() => onToggleFavorite?.(ingredient)}
                className="action-button favorite-button"
                aria-label={ingredient.favoriet ? 'Remove from favorites' : 'Add to favorites'}
              >
                {ingredient.favoriet ? '★' : '☆'}
              </button>
              <button
                onClick={() => onEditIngredient?.(ingredient)}
                className="action-button edit-button"
                aria-label={`Edit ${ingredient.naam}`}
              >
                {/* TODO: Render edit icon */}
                Edit
              </button>
              <button
                onClick={() => onDeleteIngredient?.(ingredient)}
                className="action-button delete-button"
                aria-label={`Delete ${ingredient.naam}`}
              >
                {/* TODO: Render delete icon */}
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* TODO: Render pagination if needed */}
    </div>
  );
};

export default IngredientList;
