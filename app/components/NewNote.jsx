import { Form, useActionData, useNavigation } from '@remix-run/react';

import styles from './NewNote.css';

function NewNote() {
  const data = useActionData();

  // This hook gives us navigation object
  // Enhance the User Interface
  const navigation = useNavigation();
  // This navigation object contains some useful data about ongoing request that might be happening behind the scenes
  // For example we get state whether we're submitting data
  // navigation.state === 'idle';
  // navigation.state === 'loading';
  // navigation.state === 'submitting';
  // We also get acces to submission to get more information about the latest form submission that was triggered like for example the path to which the request was sent, what the method was or which kind of data was submitted.
  // navigation.submission.
  const isSubmitting = navigation.state === 'submitting';
  console.log('Is submitting form:');
  console.log(isSubmitting);

  return (
    // It doesn't reload page and instead of triggering a new request that would actually fetch a new page
    // Form Component provided by Remix

    // *Note: The useActionData() and useLoaderData() cannot just be called this route components i.e /notes but in any component and they will get the action loader data of the closest loader or action that was called.
    <Form method="post" id="note-form">
      {data?.message && <p>{data.message}</p>}
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows="5" required />
      </p>
      <div className="form-actions">
        {/* Disable button while the data is submitted */}
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Note'}
        </button>
      </div>
    </Form>
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
