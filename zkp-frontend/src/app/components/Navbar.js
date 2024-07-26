// components/Navbar.js
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <div className="text-white font-bold text-xl">ZK-Proof App</div>
        <div className="flex space-x-8  font-semibold">
          <Link href="/">
            <span className="text-white hover:text-gray-300">Home</span>
          </Link>
          <Link href="/zk-snark">
            <span className="text-white hover:text-gray-300">ZK-Snark</span>
          </Link>
          {/* Add more links as needed */}
        </div>
      </div>
    </nav>
  );
}
