# Jobs Scraper Client

Frontend client that consumes the [jobs-scraper-api](https://github.com/virgotagle/jobs-scraper-api) to display, filter, and manage job listings. Built with Next.js 15, Tailwind CSS, and TypeScript.

## Architecture

The application follows a pragmatic separation of concerns:

- **Service Layer**: All HTTP communication is centralized in `src/services/`. The `api.ts` module acts as a facade over `fetch`, handling base URLs, headers, and standardized error parsing. Components do not make API calls directly.
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

## Gallery

<div align="center">
  <h3>Desktop Dashboard</h3>
  <img src="public/app-screenshot.png" alt="Desktop Dashboard" width="800"/>
</div>

<br/>

<div align="center">
  <h3>Desktop Job Details</h3>
  <img src="public/app-desktop-details.png" alt="Desktop Job Details" width="800"/>
</div>

<br/>

<h3 align="center">Mobile View</h3>
<div align="center" style="display: flex; justify-content: center; gap: 20px;">
  <img src="public/app-mobile-home.png" alt="Mobile Home" height="600"/>
  <img src="public/app-mobile-details.png" alt="Mobile Job Details" height="600"/>
</div>