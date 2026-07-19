# BrouwApp Project Structure

## Overview

BrouwApp is a Progressive Web Application (PWA) for hobbybrewers to manage beer recipes and brewing sessions. The project follows Domain-Driven Design (DDD) principles with a modular architecture.

## Technology Stack

- **Frontend:** React 18 + TypeScript + Vite
- **State Management:** Zustand
- **Offline Storage:** IndexedDB
- **PWA:** Vite PWA Plugin, Service Workers
- **Styling:** CSS (to be implemented)
- **Routing:** React Router v6

## Directory Structure

```
src/
├── modules/                    # Main feature modules (Domain-Driven)
│   ├── ingredients/           # Ingredient library management
│   │   ├── domain/           # Domain models
│   │   ├── services/         # Business logic
│   │   ├── components/       # React components
│   │   └── index.ts
│   ├── brew-methods/         # Brewing method templates
│   │   ├── domain/
│   │   ├── services/
│   │   ├── components/
│   │   └── index.ts
│   ├── recipes/              # Recipe management
│   │   ├── domain/
│   │   ├── services/
│   │   ├── components/
│   │   └── index.ts
│   ├── sessions/             # Brew session execution
│   │   ├── domain/
│   │   ├── services/
│   │   ├── components/
│   │   └── index.ts
│   ├── calculations/         # Beer calculation formulas
│   │   ├── domain/
│   │   ├── services/
│   │   └── index.ts
│   ├── reports/              # Report generation
│   │   ├── domain/
│   │   ├── services/
│   │   ├── components/
│   │   └── index.ts
│   ├── ai/                   # AI assistant integration
│   │   ├── domain/
│   │   ├── services/
│   │   ├── components/
│   │   └── index.ts
│   ├── settings/             # User settings and preferences
│   │   ├── domain/
│   │   ├── services/
│   │   ├── components/
│   │   └── index.ts
│   ├── core/                 # Core authentication and utilities
│   │   ├── domain/
│   │   ├── services/
│   │   └── index.ts
│   ├── infra/                # Infrastructure layer
│   │   ├── storage/          # IndexedDB and Sync Queue
│   │   ├── api/              # API client
│   │   └── index.ts
│   ├── ui/                   # Shared UI components
│   │   ├── components/       # Reusable UI components
│   │   └── index.ts
│   └── index.ts
├── store/                     # Zustand store configuration
├── hooks/                     # Custom React hooks
├── utils/                     # Utility functions
├── services/
│   └── worker/              # Service Worker
├── types/                     # Global TypeScript definitions
├── App.tsx                    # Main App component
├── index.tsx                  # Entry point
└── index.css                  # Global styles

public/
├── manifest.json             # PWA manifest
├── icon-192x192.png          # App icons
├── icon-512x512.png
└── robots.txt

vite.config.ts               # Vite configuration
tsconfig.json                # TypeScript configuration
package.json                 # Dependencies and scripts
```

## Module Descriptions

### 1. **ingredients** - Ingredient Library
Manages the central ingredient database (mout, hop, gist, suiker, custom types).
- Domain: Ingredient types and properties
- Service: CRUD operations, search, filter, favorites
- Components: List, Form, Detail views

### 2. **brew-methods** - Brewing Method Templates
Stores reusable brewing workflows with process steps.
- Domain: BrewMethod, ProcessStap, ChecklistItem, MeetpuntDefinitie
- Service: CRUD for methods, duplicate, activate/deactivate
- Components: List, Form, ProcessStepEditor

### 3. **recipes** - Recipe Management
Manages beer recipes with versioning and status tracking.
- Domain: Recipe, RecipeVersion, RecipeIngredient, ExpectedResults
- Service: CRUD, versioning, duplication, status changes
- Components: List, Editor (4 sections), Detail

### 4. **sessions** - Brew Session Execution
Handles active brewing sessions with real-time data capture.
- Domain: BrewSession, ProcessStepExecution, MeasurementRegistration
- Service: Session lifecycle, measurements, status management
- Components: List, Starter, ActiveSessionView, ProcessStepExecutor

### 5. **calculations** - Beer Calculations
Pure functions for recipe calculations (OG, FG, ABV, IBU, EBC, efficiency).
- Domain: CalculationResult with metadata
- Service: Pure calculation functions with traceability

### 6. **reports** - Report Generation
Generates and exports recipe and session reports.
- Domain: RecipeReport, SessionReport, ComparisonReport
- Service: Report generation and export (PDF, CSV, JSON)
- Components: ReportViewer

### 7. **ai** - AI Assistant
Contextual AI advice and analysis for recipes and sessions.
- Domain: AIRequest, AIResponse, AIUseCase
- Service: Advice generation, context building, privacy filtering
- Components: AIPanel, AIAdviceWidget

### 8. **settings** - Settings & User Management
User preferences, notifications, AI settings, account management.
- Domain: UserProfile, PersonalSettings, AISettings, UserRights
- Service: Setting persistence, profile management
- Components: SettingsForm

### 9. **core** - Core Authentication
Central authentication and user management.
- Domain: User
- Service: Login, logout, register, token management

### 10. **infra** - Infrastructure
**Storage:** IndexedDB implementation and SyncQueue for offline-first sync
**API:** REST API client with authentication and offline queueing

### 11. **ui** - Shared UI Components
Reusable UI components:
- BaseLayout
- InformationBlock
- ActionBar
- SearchBar
- FilterPanel
- Table
- Checklist
- MeasurementCard
- NotesBlock
- ProgressBar
- Notification
- ConfirmationDialog

## Key Architectural Principles

1. **Domain-Driven Design:** Each module is organized around a domain concept
2. **Layered Architecture:** Domain → Service → Component separation
3. **Offline-First:** IndexedDB + SyncQueue for offline-to-online sync
4. **Type Safety:** Full TypeScript with strict mode enabled
5. **Modularity:** Each module can be developed and tested independently
6. **PWA:** Service Worker + manifest for installable web app

## Module Entry Points

Each module exports domain models, services, and components through `index.ts` for clean imports:

```typescript
import { Ingredient, IngredientService, IngredientList } from '@modules/ingredients';
```

## Next Steps

1. Implement domain models with complete type definitions
2. Implement service methods (start with API client)
3. Build React components (start with list and form views)
4. Connect IndexedDB for local storage
5. Implement SyncQueue for offline synchronization
6. Add Service Worker for PWA functionality
7. Integrate state management (Zustand)
8. Build custom hooks for module operations
9. Implement calculations as pure functions
10. Add AI service integration

## Development Commands

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Type checking
npm run type-check

# Linting
npm run lint
```

## Compliance

This structure aligns with:
- ✅ Functional Specs: All 10 modules + UI
- ✅ Technical Specs: React + TypeScript + Vite + IndexedDB + Sync Queue
- ✅ Architecture: Domain-driven modular design + offline-first PWA
