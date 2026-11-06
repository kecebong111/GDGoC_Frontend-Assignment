# GDGoC UGM — Frontend Assignment

A website built for the GDGoC UGM 2026/2027 frontend recruitment assignment using Next.js, TypeScript, and Tailwind CSS.

It includes four pages from the provided Figma design: Home, About, Overview, and Contact. Community content is loaded from the provided REST API.

## Links

- Live website: https://gdgocfrontendaditya.vercel.app/
- Repository: https://github.com/kecebong111/GDGoC_Frontend-Assignment
- Video walkthrough: [Google Drive folder](VIDEO_FOLDER_URL)

## Tech stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- pnpm

Developed locally with Node.js 24 and pnpm 11.13.1.

## Getting started

```sh
git clone https://github.com/kecebong111/GDGoC_Frontend-Assignment.git
cd GDGoC_Frontend-Assignment
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:3000.

No API key or environment variables are needed. The API base URL is defined in `src/lib/api-response.ts`.

### Production

```sh
pnpm build
pnpm start
```

### Checks

```sh
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

## Pages and API integration

Base URL: https://gdgoc-ugm-api.vercel.app/api

| Page | Endpoints | Content |
| --- | --- | --- |
| Home | `/tracks`, `/faqs` | Learning tracks and FAQs |
| About | `/values`, `/roles` | Community values and contribution roles |
| Overview | `/tracks`, `/formats`, `/journey` | Learning tracks, formats, and journey steps |
| Contact | `/inquiry-categories` | Inquiry topic cards and dropdown options |

Home and Contact fetch data in the browser. About and Overview fetch on the server, with API sections streamed through React Suspense.

API responses are validated before rendering. Validation checks the response structure, required fields, duplicate IDs, and endpoint-specific fields. Fields such as `name` and `question` are mapped to `title` for use in the UI.

Artwork, editorial text, and the example outcomes table are defined locally.

### Fetching states

- **Loading:** skeletons and an accessible loading indicator.
- **Error:** an error message and a manual retry button.
- **Empty:** a message when the API returns an empty list.
- **Rendering error:** section-level client error boundaries and a route-level error boundary.

Requests have a 10-second timeout. Server fetches use `cache: "no-store"`. Failed requests show an error rather than mock content.

Client retries repeat the section request. Server retries refresh the current route.

### Contact form

Inquiry categories come from the API and stay synchronized between the topic cards and dropdown.

The form validates input but does not send messages because the provided API has no documented submission endpoint. Users can contact the community through the Instagram link instead.

## Additional features

### Saved tracks

Users can save tracks on the Overview page and switch between **All tracks** and **Saved tracks** without reloading or making another API request.

Only track IDs are saved in `localStorage`, using the key:

```text
gdgoc:saved-tracks:v1
```

Track content still comes from the API. The saved count includes only tracks available in the current response.

Saved tracks remain available after refresh in the same browser and origin. They are not synced across devices. Changes are synchronized between tabs, and a notice appears if browser storage is unavailable.

To try it:

1. Open Overview and save a track.
2. Select Saved tracks.
3. Refresh the page to check that the bookmark remains.
4. Unsave the last track to see the empty state.

### Track selection

“Explore this track” opens Overview with the selected track ID:

```text
/overview?track=development#tracks
```

The page scrolls to the tracks section and highlights the matching card with a blue outline and a “Selected track” label. Unknown IDs are ignored.

## Project structure

| Location | Purpose |
| --- | --- |
| `src/app/` | Routes, metadata, root layout, and page fallbacks |
| `src/components/layout/` | Header, navigation, and footer |
| `src/components/home/` | Home page and hero artwork |
| `src/components/about/` | About page and artwork |
| `src/components/overview/` | Overview page, track filtering, and saved-track hook |
| `src/components/contact/` | Contact form and inquiry selection |
| `src/components/ui/` | Shared components, fetching states, and retry controls |
| `src/lib/` | API fetching, response validation, and track utilities |

Route files handle metadata and render their page components. Fetching and response validation are kept separate from the page markup.

On Overview, the server fetches and validates tracks before passing the data and card content to `TracksBrowser`. This client component handles bookmarks, filtering, and selection highlighting. Cards are matched by track ID rather than array position.

## Testing

This repository does not include an automated test suite. Manual browser checks during development covered loading and error states, retry, saved-track filtering, persistence after refresh, empty states, and cross-tab synchronization.

## References

- UI: Figma design provided with the assignment.
- Data: GDGoC UGM REST API provided with the assignment.
