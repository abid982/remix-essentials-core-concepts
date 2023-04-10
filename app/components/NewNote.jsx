import styles from './NewNote.css';

function NewNote() {
  return (
    <form method="post" id="note-form">
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows="5" required />
      </p>
      <div className="form-actions">
        <button>Add Note</button>
      </div>
    </form>
  );
}

export default NewNote;

// Now the problem is Remix will not be looking for links function or any other Route specific components in files that are not Route files. Remix will ignore this links function
// This is pattern called surfacing links
// Solution:
// import NewNote, { links as newNoteLinks } from '~/components/NewNote';
// export function links() {
//   return [...newNoteLinks()];
// }

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}
