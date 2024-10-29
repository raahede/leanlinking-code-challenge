# LeanLinking coding challenge

#### Setup

This repo requires [`yarn`](https://classic.yarnpkg.com/lang/en/docs/instal) and `Node` to run

Setup and run in dev mode
```zsh
yarn
yarn dev
```

### Requirements 
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
* Some refactor would be beneficial to clean up `IssueList.tsx`
* Double checking rendering performance would be good (check that unnecessary rerenders are avoided)

