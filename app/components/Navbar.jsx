import Link from "next/link";
import DropdownMenu from "./DropdownMenu";

const Header = () => {
  return (
    <header className=" flex bg-stone-100 py-4 px-32">
      <div className="w-[250px] px-6">
        <h4 className="text-2xl font-bold text-blue-700">Express Blogg</h4>
      </div>
      <nav className="flex w-full justify-between">
        <ul className="flex  items-center gap-8">
          <li>
            <Link
              className="text-sm font-medium uppercase text-stone-500 hover:text-red-900"
              href="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className="text-sm font-medium uppercase text-stone-500 hover:text-red-900"
              href="/users"
            >
              Users
            </Link>
          </li>
        </ul>
        <div className="h-10 w-24 bg-blue-100">
          <DropdownMenu />
        </div>
      </nav>
    </header>
  );
};

export default Header;
