# GDGoC UGM frontend

Next.js App Router, TypeScript and Tailwind CSS. Node.js 24 and pnpm 11.13.1 are used locally.

## Run and check

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

Open http://localhost:3000. No API token or environment configuration is required. The public base URL is centralized in `src/lib/api-response.ts`:

`https://gdgoc-ugm-api.vercel.app/api`

## API consumption

| Page | Endpoints | Rendered content |
| --- | --- | --- |
| Home | GET `/tracks`, `/faqs` | Track cards and first three FAQs |
| Overview | GET `/tracks`, `/formats`, `/journey` | Tracks, learning formats and journey steps |
| About | GET `/values`, `/roles` | Community values and contribution roles |
| Contact | GET `/inquiry-categories` | Topic cards and select options |

Home and Contact fetch in the browser. Overview and About fetch on the Next.js server, so their upstream requests do not appear directly in browser Network tools. Server sections stream under Suspense and use `cache: "no-store"`; no successful static data is substituted after failure. Client requests have a 10-second abort timeout and discard results after unmount. Retries are user-triggered only.

Responses are validated before rendering: success/data envelope, IDs, duplicate IDs, endpoint-specific names/descriptions, track skills/destination, FAQ category and journey step. Editorial copy, artwork, layout and illustrative outcomes remain separate from API content. API wording is not rewritten to match screenshot copy.

## Fetching states

- Loading: accessible indicator and space-reserving skeleton; reserved heights are estimates, not a guarantee of zero layout shift for arbitrary API text.
- HTTP, network, timeout, JSON or schema failure: explicit error with manual retry.
- Successful empty array: explicit empty message.
- Rendering exceptions: local client error boundaries around API sections, plus the route error boundary for server-render failures. Server fetch failures are handled separately from render failures.
- Server retry refreshes the current route; client retry repeats that section request. No automatic retry loop.

Contact submission is not documented by the provided API. The form does not POST or claim success, and keeps the visible message-not-sent notice. No backend, proxy, email service or database was added.

## Verification and limits

This repository does not include an automated test suite. During development, Playwright was used to intercept Home requests and verify loading, empty data, HTTP 503, network failure, malformed data and manual retry, then restore the real API. Contact categories were checked with empty and actual responses.

Additional manual Playwright verification used temporary, local-only injections (removed afterwards):

- About: forced HTTP-503-equivalent fetch failure produced two section error messages; after removing the failure marker, clicking Try again restored values and roles with zero remaining section errors.
- Overview: the same failure produced three section error messages; retry restored tracks, formats and journey on the same route.
- Home render boundary: a deliberately throwing child in the tracks boundary produced exactly one section fallback. Hero, all three FAQ entries and footer remained present. Removing the trigger and clicking the boundary retry restored real tracks.

The server check injected a synthetic 503 Response in the fetch layer; it did not interrupt the remote service or prove real transport-level server failure behavior. These scenarios were exercised interactively. No injection switches, failure markers or debug components remain in application source.

## Saved tracks (Overview only)

Each track has an independent Save track / Saved button. All tracks and Saved tracks switch locally without reloading or requesting API data again. The count includes only saved IDs present in the current validated response. Missing IDs stay stored but never create fake cards. API empty responses are handled before the bookmark component, separately from an empty saved selection.

Try saving a track at `/overview`, switch to Saved tracks, reload, and unsave the last displayed card. Back to All tracks restores the list. Only IDs are persisted under `gdgoc:saved-tracks:v1`; no content or personal information is stored. Persistence applies to this browser and origin, not an account or other devices. The selected All/Saved view itself is not persisted.

`useSavedTracks` reads browser storage after hydration before enabling controls, never writes the initial empty state, validates and deduplicates JSON IDs, and synchronizes storage events between tabs. Read/write failure or corrupt JSON falls back to in-memory choices with a notice; those choices do not survive reload. Concurrent writes are last-writer-wins, not transactional synchronization.

The server keeps fetching/validating tracks through RemoteContent. Its render callback sends sorted, serializable track data and `{ id, content: ReactNode }` card slots to TracksBrowser; no render function crosses the client boundary. Cards are indexed by ID, independently of slot-array order. Artwork and card content remain server-rendered. Local filtering preserves the track-data order.

Development browser checks covered save/unsave, reload persistence, saved empty state, last-card removal, return to all tracks, corrupt storage, denied storage read, keyboard Enter, two-tab synchronization and a 390px overflow check. Different-order ReactNode composition, full browser-restart persistence, isolated quota/write failure, complete keyboard traversal and a pixel-diff comparison were not tested in-browser.

The original artwork/font comparison and a full accessibility audit remain separate work.
