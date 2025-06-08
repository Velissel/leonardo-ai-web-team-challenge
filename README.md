This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Project Overview

This is a Next.js application developed as part of the "Leonardo AI, Web Team Challenge v3.5". It features user authentication, a paginated list display with item details, and theme customization (light/dark mode).

## Available Pages

The application includes the following pages:

-   **`/` (Homepage)**: The main landing page of the application. This page is publicly accessible.
-   **`/login` (Login Page)**: Allows users to authenticate. Users can enter a username and job title to log in. This page is publicly accessible.
-   **`/ani-list` (Anime List Page)**: Displays a paginated list of anime titles fetched from an external API. Users can click on a row to view more details in a drawer. This page is protected and requires authentication.

## Protected Routes and Authentication

Route protection is implemented using Next.js middleware (`middleware.ts`) in conjunction with Redux state persisted in browser cookies.

**Why Persist User Data in Cookies?**

Persisting user authentication state (specifically `username` and `jobTitle`) in cookies is a deliberate choice to support server-side operations:

-   **Server-Side Rendering (SSR)**: By having authentication details available in cookies, Next.js middleware can access this information on the server before rendering a page. This allows the server to make decisions about whether to grant access to a protected route or redirect the user, all before any client-side code runs.
-   **Server-Side Queries/Logic**: If protected routes need to fetch data or perform actions on the server based on the user's identity (though not explicitly implemented for `/ani-list` data fetching in the current setup, it's a common pattern), cookies make the user's authentication status readily available to server-side code, including API route handlers or `getServerSideProps` functions if they were used.

This approach ensures that authentication checks are performed server-side, enhancing security and enabling correct rendering of pages based on user status.

**Authentication Flow:**

1.  **Login**: Users log in via the `/login` page by providing a username and job title.
2.  **State Persistence**: Upon successful login, the user's `username` and `jobTitle` are stored in the Redux store. This part of the Redux state (the `user` slice) is persisted to browser cookies using `redux-persist` and `redux-persist-cookie-storage`.
3.  **Middleware Check**: The `middleware.ts` file intercepts requests to protected routes.
    -   It reads the persisted Redux state from the cookies. A helper function (`getPersistedStateFromCookies`) is used to robustly parse the cookie, dynamically finding the Redux state cookie using `reduxPersistIndex`, decoding cookie names, and extracting the nested `user` slice.
    -   A user is considered authenticated if both `username` AND `jobTitle` are present in the persisted state.
4.  **Access Control**:
    -   If an unauthenticated user attempts to access a protected route (e.g., `/ani-list`), the middleware redirects them to the `/login` page.
    -   Authenticated users are allowed access to protected routes.
    -   Public routes like `/` and `/login` remain accessible to all users, regardless of their authentication status.
5.  **Logout**: A "Logout" button (available in the site footer when logged in) clears the user's information from the Redux store (and thus from the cookies) and redirects the user to the homepage.

This system ensures that sensitive content on pages like `/ani-list` is only accessible to authenticated users, with authentication checks happening server-side.

## Further Considerations & Future Work

This section outlines some aspects that were simplified for the purpose of this challenge, given the time constraints, but would be important considerations for a production-ready application.

### Configuration Management

-   **Environment Variables**: Currently, some configuration values, such as the GraphQL API endpoint URI in `data/apollo-client.ts` (`https://countries.trevorblades.com`), are hardcoded. In a production environment, and even for better development practices, such values should be managed through environment variables (e.g., using a `.env` file and Next.js's built-in support for environment variables). This allows for easier configuration changes across different environments (development, staging, production) without modifying the codebase.

### Testing

-   **Automated Tests**: Due to the tight timeframe for this challenge (2+ hours), comprehensive automated tests (unit, integration, and end-to-end) have been omitted for simplicity. However, for a robust and maintainable application, a full suite of tests is crucial. This would typically involve:
    -   **Unit Tests**: For individual components, utility functions, and Redux reducers/actions (e.g., using Jest and React Testing Library).
    -   **Integration Tests**: To ensure different parts of the application work together correctly (e.g., testing the login flow, page navigation, or component interactions).
    -   **End-to-End Tests**: To simulate real user scenarios across the entire application (e.g., using tools like Cypress or Playwright).

Implementing these practices would significantly enhance the project's reliability, maintainability, and scalability.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
