# Jobs Scraper Client

Frontend client that consumes the [jobs-scraper-api](https://github.com/virgotagle/jobs-scraper-api) to display, filter, and manage job listings. Built with Next.js 15, Tailwind CSS, and TypeScript.

## Architecture

The application follows a pragmatic separation of concerns, designed for scalability and maintainability:

### Core Framework
- **Next.js 15 App Router**: Leveraging the latest Next.js features, including nested layouts and server components, located in `src/app/`.
- **TypeScript**: Strict type safety ensures reliability across the entire codebase.

### State Management & Data Flow
- **Custom Hooks**: specialized hooks like `useJobs` and `useFavorite` encapsulate data fetching logic and local state management.
- **Optimistic Updates**: The UI implements optimistic UI patterns (e.g., toggling favorites) to ensure the interface feels instant and responsive, handling rollbacks automatically on error.
- **Service Layer**: All HTTP communication is centralized in `src/services/`. The `api.ts` module acts as a facade over `fetch`, handling:
    - Base URL configuration
    - Automatic `X-API-Key` injection for authentication
    - Standardized error parsing and handling
- **Search Strategy**: Client-side debouncing (implemented in `useJobSearch`) minimizes unnecessary API calls during user input.

### Design System
- **Semantic Styling**: The project uses **Tailwind CSS** with a custom configuration (`tailwind.config.ts`) that defines semantic color tokens (e.g., `primary`, `background.paper`, `status.success`). This abstracts raw color values, making theming and dark mode support seamless and consistent.

### Testing Strategy
- **Mock Service Worker (MSW)**: Unit tests intercept network requests using MSW handlers (`src/__tests__/mocks/`), allowing reliable testing without a running backend.
- **Integration Testing**: Dedicated integration tests run against the live API (or can be configured to use mocks) to verify contract implementations.

## Directory Structure

```ascii
jobs-scraper-app/
├── public/                 # Static assets
├── src/
│   ├── __tests__/          # Vitest configurations and test files
│   │   ├── integration/    # Tests running against live/mocked API
│   │   └── mocks/          # MSW request handlers
│   ├── app/                # Next.js App Router pages and layouts
│   ├── components/         # Reusable UI components
│   ├── hooks/              # Custom React hooks (e.g., usage of services)
│   ├── services/           # API client layer (Http Client)
│   ├── styles/             # Global CSS and Tailwind directives
│   └── types/              # TypeScript interfaces for API responses
├── .env.local              # Local environment overrides
├── vitest.config.ts        # Unit test configuration
└── vitest.integration.config.ts # Integration test configuration
```

## Environment Variables

Configuration is handled via environment variables.

| Variable | Default (Fallback) | Description |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_API_URL` | `http://127.0.0.1:8000` | Base URL of the Python backend API. |
| `NEXT_PUBLIC_API_KEY` | `''` | API Key for authenticated endpoints. |

## Development

### Prerequisites

- Node.js (Latest LTS recommended)
- pnpm (Project uses `pnpm-lock.yaml`)
- Running instance of the `jobs-scraper-api` (for full functionality)

### Installation

```bash
pnpm install
```

### Running the App

Start the development server:

```bash
pnpm run dev
```

The application will be available at `http://localhost:3000`.

## Testing

**Unit Tests**
Runs tests using MSW to mock network requests. No backend required.

```bash
pnpm run test:unit
```

**Integration Tests**
Runs tests against the backend. Ensure `NEXT_PUBLIC_API_URL` points to a running instance.

```bash
pnpm run test:integration
```

## Continuous Integration

The project uses **GitHub Actions** for Continuous Integration. The pipeline is defined in `.github/workflows/ci.yml` and is triggered on pushes and pull requests to the `main` branch.

**Workflow Steps:**
1.  **Setup**: Configures Node.js 20 and pnpm 9.
2.  **Lint**: Runs `eslint` to check for code quality issues.
3.  **Test**: Executes unit tests via `vitest`.
4.  **Build**: Verifies the application builds successfully with `next build`.

## Gallery

<div align="center">
  <h3>Desktop Dashboard</h3>
  <img src="./public/app-screenshot.png" alt="Desktop Dashboard" width="800"/>
</div>

<br/>

<div align="center">
  <h3>Desktop Job Details</h3>
  <img src="./public/app-desktop-details.png" alt="Desktop Job Details" width="800"/>
</div>

<br/>

<h3 align="center">Mobile View</h3>
<div align="center" style="display: flex; justify-content: center; gap: 20px;">
  <img src="./public/app-mobile-home.png" alt="Mobile Home" height="600"/>
  <img src="./public/app-mobile-details.png" alt="Mobile Job Details" height="600"/>
</div>