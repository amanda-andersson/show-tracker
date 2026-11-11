# Previously On...

Previously On... is a personal TV show diary where you can keep track of shows you want to watch, are currently watching, gave up on or have already finished.

I built this project with React and TypeScript as part of my Frontend Developer education at Medieinstitutet.

## Features

- Add, edit and delete TV shows
- View details about each show
- Filter shows by watching status
- Rate shows from 1 to 5 stars
- Keep track of watched seasons
- Add notes about shows
- Save the selected status filter when refreshing the page

## Built with

- React
- TypeScript
- Vite
- React Router
- CSS
- Shelf API

## Getting Started

To run the project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/amanda-andersson/show-tracker.git
   ```

2. Open the project folder:

   ```bash
   cd show-tracker
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

## Custom Hooks

I use two custom hooks in this project:

- **useShows** – Fetches TV shows from the API and handles loading and errors.
- **useLocalStorage** – Saves the selected status filter so it stays the same after refreshing the page.

I used these hooks to keep some of the logic separate from the components and make the code easier to follow.

## Reflection

I also tried moving the fetch logic for adding, editing and deleting shows into custom hooks, but ran into problems getting everything to work correctly. I decided to go back to the previous solution because it worked reliably.

## Links

- **GitHub:** https://github.com/amanda-andersson/show-tracker
- **Live Demo:** https://show-tracker-wheat.vercel.app/

## Author

Amanda Andersson (@amanda-andersson)

## Grade

Aiming for **VG**, although not all fetch logic is handled by custom hooks.
