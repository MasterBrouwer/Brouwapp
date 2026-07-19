# Ingredients Module

## Overview

The Ingredients module manages the central ingredient library for BrouwApp. From the functional specs:

> "De ingrediëntenbibliotheek vormt de centrale kennisbron van de applicatie. Hierin worden alle herbruikbare ingrediënten met hun standaard eigenschappen beheerd."

## Architecture

Following Domain-Driven Design (DDD) principles, the module is organized into three layers:

### 1. Domain Layer (`domain/`)

Defines the core business models and types:

- **IngredientType**: Enum for ingredient types (MALT, HOP, YEAST, SUGAR, CUSTOM)
- **IngredientCategory**: Enum for organizing ingredients
- **Ingredient**: Main domain entity
- **Ingredient Properties**: Type-specific properties (MaltProperties, HopProperties, etc.)
- **IngredientSearchFilter**: Search/filter criteria
- **DTOs**: Data transfer objects for create/update operations

### 2. Service Layer (`services/`)

Implements business logic via `IngredientService`:

**Core Operations:**
- `getAll()` - Retrieve all user ingredients
- `getById(id)` - Get single ingredient
- `search(filter)` - Search with filtering
- `create(data)` - Create new ingredient
- `update(id, data)` - Update existing ingredient
- `delete(id)` - Delete ingredient

**Utility Operations:**
- `markFavorite(id)` - Add to favorites
- `unmarkFavorite(id)` - Remove from favorites
- `activate(id)` - Activate ingredient
- `deactivate(id)` - Deactivate ingredient
- `duplicate(id)` - Create copy of ingredient
- `getByType(type)` - Filter by type
- `getActive()` - Get active ingredients only
- `getFavorites()` - Get favorite ingredients
- `validateIngredient(data)` - Validate ingredient data

### 3. Component Layer (`components/`)

React components for UI interactions:

- **IngredientSearchBar**: Search input with filters
- **IngredientList**: Displays ingredients in list/table format
- **IngredientForm**: Create/edit ingredient form
- **IngredientDetail**: Full ingredient details view

## Data Model

### Ingredient Base Structure

```typescript
interface Ingredient {
  id: IngredientId;
  naam: string;
  type: IngredientType;
  leverancier?: string;
  beschrijving?: string;
  notities?: string;
  actief: boolean;
  favoriet: boolean;
  eigenschappen: AnyIngredientProperties;
  userId: string;
  category?: IngredientCategory;
  createdAt: Date;
  updatedAt: Date;
}
```

### Type-Specific Properties

#### Malt (IngredientType.MALT)
- `ebc`: European Brewery Convention color (0-600+)
- `extractOpbrengst`: Extract yield percentage
- `type`: Malt type (base, crystal, roasted, etc.)

#### Hop (IngredientType.HOP)
- `alfazuur`: Alpha acid percentage
- `type`: Hop type (bittering, aroma, dual-purpose)
- `oogstjaar`: Harvest year (optional)

#### Yeast (IngredientType.YEAST)
- `gistType`: Yeast type (ale, lager, hybrid)
- `vergistingsgraad`: Attenuation percentage
- `aanbevolenTemperatuur`: Recommended fermentation temperature (°C)
- `alcoholTolerantie`: Alcohol tolerance percentage

#### Sugar (IngredientType.SUGAR)
- `type`: Sugar type (table, honey, brown, etc.)

## Functional Specifications Alignment

From "Hoofdstuk 2 – Ingrediëntenbibliotheek":

### 2.3 General Data
**Required:**
- Naam ✓
- Type ✓

**Optional:**
- Leverancier/Fabrikant ✓
- Beschrijving ✓
- Notities ✓
- Actief/Inactief ✓
- Favoriet ✓

### 2.5 Library Management
User can:
- Ingrediënten aanmaken ✓ → `create()`
- Ingrediënten wijzigen ✓ → `update()`
- Ingrediënten verwijderen ✓ → `delete()`
- Ingrediënten activeren/deactiveren ✓ → `activate()`, `deactivate()`
- Ingrediënten als favoriet markeren ✓ → `markFavorite()`, `unmarkFavorite()`
- Ingrediënten zoeken ✓ → `search()`
- Ingrediënten filteren op type ✓ → `search(filter.type)`
- Ingrediënten sorteren ✓ → `search(filter.sortBy)`
- Ingrediënten dupliceren ✓ → `duplicate()`

## Component Features

### IngredientSearchBar
- Full-text search on ingredient name
- Filter by type (checkboxes)
- Filter by favorite status
- Filter by active status
- Debounced search
- Clear button
- Loading indicator

### IngredientList
- Display in table format
- Sorting by name, type, creation date
- Selection mode for bulk operations
- Favorite/unfavorite actions
- Edit/delete actions
- Status indicators (active/inactive)
- Pagination support
- Empty state
- Loading skeleton
- Error handling

### IngredientForm
- Create new ingredient
- Edit existing ingredient
- Basic fields (naam, type, leverancier, beschrijving, notities)
- Type-specific properties (dynamically shown based on type)
- Form validation
- Error/success messages
- Reset button

### IngredientDetail
- Display full ingredient information
- All type-specific properties
- Metadata (created, updated, ID)
- Usage statistics (recipes, brew sessions)
- Edit/delete/favorite actions
- Copy to clipboard
- Back navigation

## Integration Points

### Used By (From Functional Specs)
- Receptbeheer (Recipe Management)
- Berekeningen (Calculations)
- AI-assistent (AI Assistant)

### Related Modules
- Recipes: Uses ingredients in recipe definitions
- Sessions: Uses ingredients in brew sessions
- Calculations: Reads ingredient properties for calculations
- Reports: Includes ingredient information in reports

## Implementation Notes

### All Methods Are Skeletons
Every service method includes:
- Full TypeScript signatures
- JSDoc documentation
- TODO comments explaining implementation steps
- Error handling patterns
- Business logic requirements from specs

### No API Integration Yet
Service methods throw "Not implemented" errors. When implementing:

1. Connect to backend API endpoints:
   - GET /api/ingredients
   - GET /api/ingredients/:id
   - POST /api/ingredients
   - PUT /api/ingredients/:id
   - DELETE /api/ingredients/:id

2. Implement IndexedDB caching for offline support

3. Implement SyncQueue for offline operations

4. Add error handling with retry logic

### Component Props
All components use TypeScript interfaces for props:
- Type-safe props
- Optional callbacks
- Loading/error states
- Full JSDoc documentation

## Testing Strategy

When implementing, consider:

1. **Domain Tests**
   - Type validation
   - Property combinations

2. **Service Tests**
   - Mock API responses
   - Test filtering/sorting
   - Test error conditions

3. **Component Tests**
   - Render with different props
   - User interactions
   - Loading/error states
   - Accessibility

## Accessibility

Components include:
- ARIA labels and roles
- Semantic HTML
- Keyboard navigation
- Error messages linked to inputs
- Loading states announced

## Performance Considerations

- Debounced search (300ms default)
- Lazy loading for large lists
- Pagination support
- IndexedDB caching
- Memoization for component props

## Future Enhancements

Functional specs mention (out of scope v1.0):
- Voorraadbeheer (Inventory management)
- Kostenregistratie (Cost tracking)
- Communityfunctionaliteit (Community features)

These could extend the ingredient module with:
- Inventory tracking
- Purchase history
- Cost per unit
- Community ratings
- Shared ingredients
