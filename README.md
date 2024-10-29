# LeanLinking coding challenge

### Setup

This repo requires [`yarn`](https://classic.yarnpkg.com/lang/en/docs/instal) and `Node` to run

Setup and run in dev mode
```zsh
yarn
yarn dev
```

### Tech
* Boilerplate setup using vite template `react-swc-ts` 
* CSS reset using [`sanitize.css`](https://github.com/csstools/sanitize.css)
* Styling using CSS Modules
* [Feather Icons](https://feathericons.com/) installed with `react-feather`
* Scroll lock for modals with [`usehooks-ts`](https://usehooks-ts.com/react-hook/use-scroll-lock)

### Challenge requirements 
- [x] Relevant data is shown to the user.
- [ ] Issue Trend chart should visualize issue data in a meaningful way.
- [x] Open, Closed and Average Resolution Time metrics should indicate if trend is going up or down.
- [x] Issue list should list items with relevant data in columns.
- [x] It should be possible to close an issue, and the UI should reflect the changes.
- [x] Clicking on a row in the issue list should open a modal that displays further information on the issue item.

### Notes
* Focus on a modular setup and separation of concern.
* Focus on best practices and performance.
* No chart was implemented due to time constrain.
* Data is imported directly into the app, which is less than ideal. Setting up a simple CRUD API backend would be the next step.
* Handling the list data could also be refactored into a list provider (global state).
* Next step for the React app would be to add a router to rendering and data fetching. TanStack router could be used for a client side SPA solution. Next.js could be used for a more powerful solution, but also introduces a more complex setup which might not be needed.
* Data types are a bit of a mess - ideally types should be generated from and API and imported into the project. Using an ORM for data type safety would be beneficial.
* Some refactor would be beneficial to clean up `IssueList.tsx`
* Double checking rendering performance would be good (check that unnecessary rerenders are avoided)

