# GDGoC UGM — Frontend Assignment

Frontend implementation for the GDGoC UGM 2026/2027 recruitment assignment, built with Next.js, TypeScript, and Tailwind CSS.

The project implements four pages from the provided Figma design: Home, About, Overview, and Contact. Community content is fetched from the provided REST API.

## Links

- Live website: https://gdgocfrontendaditya.vercel.app
- Repository: https://github.com/kecebong111/GDGoC_Frontend-Assignment
- Video walkthrough: [Google Drive folder](VIDEO_FOLDER_URL)

## Tech stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- pnpm

Local development uses Node.js 24 and pnpm 11.13.1.

## Getting started

Clone the repository and install dependencies:

```sh
git clone https://github.com/kecebong111/GDGoC_Frontend-Assignment.git
cd GDGoC_Frontend-Assignment
pnpm install --frozen-lockfile
```

Start the development server:

```sh
pnpm dev
```

Open http://localhost:3000.

No API key or environment variables are required. The API base URL is defined in `src/lib/api-response.ts`.

### Production

```sh
pnpm build
pnpm start
```

### Checks

```sh
pnpm lint
pnpm exec tsc --noEmit
pnpm test
```

## Pages and API integration

Base URL: https://gdgoc-ugm-api.vercel.app/api

| Page | Endpoints | Content |
| --- | --- | --- |
| Home | `/tracks`, `/faqs` | Learning tracks and FAQ entries |
| About | `/values`, `/roles` | Community values and contribution roles |
| Overview | `/tracks`, `/formats`, `/journey` | Learning tracks, formats, and journey steps |
| Contact | `/inquiry-categories` | Inquiry topic cards and dropdown options |

Home and Contact fetch data in the browser. About and Overview fetch on the server and stream their API sections through React Suspense.

Responses are validated before rendering. The parser checks the response envelope, required fields, duplicate IDs, and endpoint-specific fields. It also normalizes API fields such as `name` and `question` into the internal `title` field.

Editorial text, artwork, and the example outcomes table are defined locally.

### Loading and failures

API sections handle:

- **Loading:** skeletons and an accessible loading indicator.
- **Request failure:** an error message with a manual retry button.
- **Empty response:** a message explaining that no content is available.
- **Rendering failure:** section-level client error boundaries, with a route error boundary for unhandled page errors.

Requests have a 10-second timeout. Server fetches use `cache: "no-store"`. Failed requests do not fall back to mock content.

Client retries repeat the section request. Server retries refresh the current route.

## Additional features

### Saved tracks

Users can bookmark tracks on the Overview page and switch between **All tracks** and **Saved tracks** without reloading or making another API request.

Only track IDs are stored in `localStorage`, under:

```text
gdgoc:saved-tracks:v1
```

Track content continues to come from the API. The saved count includes only IDs found in the current response.

The storage logic handles malformed data, duplicate IDs, and unavailable storage. If persistence fails, users can still change their selections while the component remains mounted. Changes are also synchronized between tabs on the same origin.

To try it:

1. Open Overview and save a track.
2. Switch to Saved tracks.
3. Refresh the page and check that the bookmark remains.
4. Unsave the last track to see the empty state.

Bookmarks are specific to the browser and origin. They do not sync across devices, and the All/Saved filter itself is not persisted.

### Track selection links

“Explore this track” opens Overview with the track ID in the URL:

```text
/overview?track=development#tracks
```

The page scrolls to the tracks section and marks the matching card with a blue outline and a “Selected track” label. Unknown IDs are ignored.

## Code organization

| Location | Responsibility |
| --- | --- |
| `src/app/` | Routes, metadata, root layout, and route-level fallbacks |
| `src/components/layout/` | Header, navigation, and footer |
| `src/components/home/` | Home page and hero artwork |
| `src/components/about/` | About page and artwork |
| `src/components/overview/` | Overview page, track interactions, and saved-track hook |
| `src/components/contact/` | Contact form and inquiry selection |
| `src/components/ui/` | Shared UI, API section handling, and retry controls |
| `src/lib/` | API fetching, response validation, and track utilities |
| `tests/` | Automated tests for parsers and track utilities |

Route files delegate page content to separate components. Shared fetching and validation logic stays outside page markup.

For Overview, the server fetches and validates tracks before passing data and card content to the client-side `TracksBrowser`. That component manages filtering, bookmarks, and selection highlighting. Card content is matched by track ID rather than array position.

## Testing

Automated tests cover:

- Valid, empty, and malformed API responses.
- Duplicate IDs and invalid track destinations.
- Saved-ID parsing and deduplication.
- Save/unsave behavior without mutating the original array.
- Filtering order and unavailable saved IDs.
- Card matching independently of array order.
- Track-link encoding and selection validation.

Manual browser checks have covered API loading and failure states, retry, bookmark persistence after refresh, saved-track filtering, empty states, and cross-tab synchronization.

Browser checks were performed interactively; they are not included as automated end-to-end tests. A full accessibility audit and pixel-by-pixel comparison against Figma have not been completed.

## Limitations

- The provided API does not document a contact submission endpoint. The form validates input but does not send messages or claim successful delivery. Instagram is provided as an alternative contact channel.
- Saved tracks use browser storage rather than an account. Clearing site data removes bookmarks.
- If storage is unavailable, temporary selections are lost after reload or when the component unmounts.
- Simultaneous bookmark changes across tabs use last-writer-wins behavior.

## Design and data sources

The interface is based on the Figma design supplied with the assignment. Dynamic community content uses the provided GDGoC UGM API.
