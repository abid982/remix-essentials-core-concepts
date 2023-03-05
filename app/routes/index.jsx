import { Link } from '@remix-run/react';

export default function Index() {
  // return (
  //   // <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
  //   //   <h1>Welcome to Remix</h1>
  //   //   <ul>
  //   //     <li>
  //   //       <a
  //   //         target="_blank"
  //   //         href="https://remix.run/tutorials/blog"
  //   //         rel="noreferrer"
  //   //       >
  //   //         15m Quickstart Blog Tutorial
  //   //       </a>
  //   //     </li>
  //   //     <li>
  //   //       <a
  //   //         target="_blank"
  //   //         href="https://remix.run/tutorials/jokes"
  //   //         rel="noreferrer"
  //   //       >
  //   //         Deep Dive Jokes App Tutorial
  //   //       </a>
  //   //     </li>
  //   //     <li>
  //   //       <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
  //   //         Remix Docs
  //   //       </a>
  //   //     </li>
  //   //   </ul>
  //   // </div>
  //   <h1>Hello World</h1>
  // );

  return (
    // <>
    //   <h1>Demo Page</h1>
    //   <a href="/demo">Go to Demo Page</a>
    // </>

    <>
      <h1>Demo Page</h1>
      <Link to="/demo">Go to Demo Page</Link>
    </>
  );
}
