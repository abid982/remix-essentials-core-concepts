import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

import MainNavigation from './components/MainNavigation';

// import styles from './styles/main.css';
// Note: The ~ symbol always looking for your app folder
import styles from '~/styles/main.css';

export const meta = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function catchBoundary() {}

// Show your own error page
// Export a new Remix function ErrorBoundary() and its actually a component which we're exporting here
// Remix will be looking for this
// Remix will display it if error occurs anywhere in your application
// The ErrorBoundary will be rendered by Remix instead of the App component (if an error is thrown anywhere in your app)
// This special component will always get error props
// Remix will create this component whenever an error occurs
// This is the default JavaScript Error Constructor Object so we have a message property
// You can add it in any route file
// If you add in root file then this will handle all errors that occur anywhere
export function ErrorBoundary({ error }) {
  console.log('Error:');
  console.log(error);

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <title>An error occured!</title>
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <main className="error">
          {/* <Outlet /> */}
          <h1>An error occured!</h1>
          <p>{error.message}</p>
          <p>
            Back to <Link to="/">home</Link>
          </p>
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}
