import { Link, useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';

import { getStoredNotes } from '~/data/notes';

import styles from '~/styles/note-details.css';

// /notes123
// /abc

export default function NoteDetailsPage() {
  const note = useLoaderData();
  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/notes">Back to all Notes</Link>
        </nav>
        <h1>{note.title}</h1>
      </header>
      <p id="note-details-content">{note.content}</p>
    </main>
  );
}

// To load the data for note details page we bring back another function which we saw before already the loader function because that't the function you need to load data for a component on backend.
// Remix will execute it automatically when we try to load this page
// Fetch right note from backend
// data
// request
// params
export async function loader({ params }) {
  const notes = await getStoredNotes();
  const noteId = params.noteId;

  // Find note based on id to the id that's part of the url
  const selectedNote = notes.find((note) => note.id === noteId);
  console.log('Selected note:');
  console.log(selectedNote);

  //   if (!selectedNote) {
  //     throw json(
  //       { message: 'Could not find note for id ' + noteId },
  //       { status: '404' }
  //     );
  //   }

  if (!selectedNote) {
    throw json(
      { message: 'Could not find note for id' + noteId },
      {
        status: 404,
        statusText: 'Not Found',
      }
    );
  }

  console.log('Selected note:');
  console.log(selectedNote);

  return selectedNote;
}

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

// Data returned by loader
// Title of a specific title
export const meta = ({ data }) => ({
  title: data.title,
  description: 'Manage your notes with ease',
});
