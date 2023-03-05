import { Link } from '@remix-run/react';

import homeStyles from '~/styles/home.css';

export default function Index() {
  return (
    <main id="content">
      <h1>A better way of keeping track of your notes</h1>
      <p>Try our early beta and never loose track of your notes again!</p>
      <p id="cta">
        <Link to="/notes">Try Now!</Link>
      </p>
    </main>
  );
}

export function links() {
  // Page Specific Styling
  // Now we define some links that only apply CSS to this page and Remix will automatically create the link tag and inject them in the head section when this page is loaded
  return [{ rel: 'stylesheet', href: homeStyles }];
}
