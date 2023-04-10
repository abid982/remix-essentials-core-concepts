import { json, redirect } from '@remix-run/node';
import { useActionData, useLoaderData } from '@remix-run/react';
import NewNote, { links as newNoteLinks } from '~/components/NewNote';
// import newNotesStyles from '~/components/NewNote.css';

import NoteList, { links as noteListLinks } from '~/components/NoteList';

import { getStoredNotes, storeNotes } from '~/data/notes';

export default function NotesPage() {
  // In this component we now gets access to these notes to the data returned by the loader by using a special hook provided by Remix i.e the useLoaderData() hook
  // The loader data that gets access to the data returned by loader
  const notes = useLoaderData();

  // The data is anything and in our case it's an object with the message property
  // const data = useActionData();
  // console.log('Data returned by an action:');
  // console.log(data);

  console.log('Notes data:');
  console.log(notes);
  return (
    <main>
      {/* <h2>My Notes</h2> */}
      {/* These components can get access to the loader and action data of this route i.e /notes */}
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
}

// Backend code

export async function loader() {
  console.log('Loader!!!');
  // return null;

  const notes = await getStoredNotes();

  // Serialized data
  return notes;

  // return new Response(JSON.stringify(notes), {
  //   headers: { 'Content-Type': 'application/json' },
  // });

  // return json(notes);
}

export async function action({ request }) {
  // console.log('Data:');
  // console.log(data);

  const formData = await request.formData();
  console.log(formData);

  // Extract value by name by get method
  // const noteData = {
  //   title: formData.get('title'),
  //   content: formData.get('content'),
  // };

  // Shortcut
  const noteData = Object.fromEntries(formData);

  // Add validation...
  if (noteData.title.trim().length < 5) {
    // Show error message to the user
    // alert() You can't use browser APIs here
    // Return a different value
    // So actions like loaders can also return data not just redirect response
    // Success message
    // How do you get access that returned data?
    // Well for that there is another hook which you typically use and that is useActionData() hook
    return { message: 'Invalid title - must be atleast 5 characters long.' };
  }

  // Add notes data as a new note to existing notes

  // Get existing notes that might be stored before
  const existingNotes = await getStoredNotes();

  // Unique identifier
  noteData.id = new Date().toISOString();

  const updateNotes = existingNotes.concat(noteData);

  await storeNotes(updateNotes);

  // await new Promise((resolve, reject) => setTimeout(() => resolve(), 2000));

  // Redirect the user after doing something on the server
  // redirect response
  return redirect('/notes');
}

export function links() {
  return [...newNoteLinks(), ...noteListLinks()];
}

// export function links() {
//   return [{ rel: 'stylesheet', href: newNotesStyles }];
// }
