import { json, redirect } from '@remix-run/node';
import { Link, useCatch, useActionData, useLoaderData } from '@remix-run/react';
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

  // Throw error and error boundary will be used
  // throw 'Error';

  // Whenever you throw response Remix recognizes this and renders a different component than the error boundary
  if (!notes || notes.length === 0) {
    // When you throw some text or a regular object then the ErrorBoundary will be used.
    // throw 'Error';

    // Whenever you throw a response generated with a json() helper function another component catchBoundary() function will be used.
    throw json(
      { message: 'Could not find any notes' },
      {
        status: 404,
        statusText: 'Not Found',
      }
    );
  }

  // Whenever you return then the default component page will be used.
  // Serialized data
  return notes;

  // return new Response(JSON.stringify(notes), {
  //   headers: { 'Content-Type': 'application/json' },
  // });

  // return json(notes);
}

export async function action({ request, params }) {
  // console.log('Data:');
  // console.log(data);\

  // The database could temporarily be unavailable so saving the data could fail and also in case of reading the data.

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

// It catches an responses. You can add it per route level or added it on the the root level
export function CatchBoundary() {
  // To get hold of error data we can use another special hook provided by Remix
  // It returns an object based on error response
  const catughtResponse = useCatch();
  // catughtResponse.data
  // catughtResponse.status
  // catughtResponse.statusText
  const message = catughtResponse.data?.message || 'Data not found';

  return (
    <main>
      <NewNote />
      <p className="info-message">{message}</p>
    </main>
  );
}

// Add a seprate error boundary
export function ErrorBoundary(error) {
  // The page content will be replaced by error. It will be injected in default skeleton in place of the Outlet
  return (
    <main className="error">
      {/* <Outlet /> */}
      <h1>An error related to your notes occured!</h1>
      <p>{error.message}</p>
      <p>
        Back to <Link to="/">home</Link>
      </p>
    </main>
  );
}
