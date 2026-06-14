import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside style={{ width: '250px', backgroundColor: 'white', borderRight: '2px solid black', minHeight: '400px' }}>
      <ul style={{ listStyle: 'none', padding: '20px' }}>
        <li style={{ marginBottom: '20px' }}>
          <Link href="/about" style={{ color: 'red', fontWeight: 'bold', textDecoration: 'none' }}>About me</Link>
        </li>
        <li>
          <Link href="/projets" style={{ color: 'blue', fontWeight: 'bold', textDecoration: 'none' }}>Mes projets</Link>
        </li>
      </ul>
    </aside>
  );
}