import Link from 'next/link';

export default () =>
  <div>
    <img src='/static/nextjs.png'></img>
    <nav>
      <Link href="/about" prefetch>About</Link>
    </nav>
    <p>Welcome to next.js</p>
  </div>