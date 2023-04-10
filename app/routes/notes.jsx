import NewNote, { links as newNoteLinks } from '~/components/NewNote';
// import newNotesStyles from '~/components/NewNote.css';

export default function NotesPage() {
  return (
    <main>
      {/* <h2>My Notes</h2> */}
      <NewNote />
    </main>
  );
}

export function links() {
  return [...newNoteLinks()];
}

// export function links() {
//   return [{ rel: 'stylesheet', href: newNotesStyles }];
// }
