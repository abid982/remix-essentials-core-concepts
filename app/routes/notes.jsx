import { redirect } from '@remix-run/node';
import NewNote, { links as newNoteLinks } from '~/components/NewNote';
// import newNotesStyles from '~/components/NewNote.css';

import { getStoredNotes, storeNotes } from '~/data/notes';

export default function NotesPage() {
  return (
    <main>
      {/* <h2>My Notes</h2> */}
      <NewNote />
    </main>
  );
}

// Backend code
export async function action({ request }) {
  // console.log('Data:');
  // console.log(data);

  const formData = await request.formData();
  console.log(formData);

  // Extract value by name by get method
  // const notesData = {
  //   title: formData.get('title'),
  //   content: formData.get('content'),
  // };

  // Shortcut
  const notesData = Object.fromEntries(formData);

  // Add validation...

  // Add notes data as a new note to existing notes

  // Get existing notes that might be stored before
  const existingNotes = await getStoredNotes();

  // Unique identifier
  notesData.id = new Date().toISOString();

  const updateNotes = existingNotes.concat(notesData);

  await storeNotes(updateNotes);

  // Redirect the user after doing something on the server
  // redirect response
  return redirect('/');
}

export function links() {
  return [...newNoteLinks()];
}

// export function links() {
//   return [{ rel: 'stylesheet', href: newNotesStyles }];
// }
