import React, { useEffect, useState } from "react";
import { MdOutlineTravelExplore } from "react-icons/md";
import { CiBellOn } from "react-icons/ci";
import { PiListThin } from "react-icons/pi";

function Navbar() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open]);

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpen((o) => !o);
  };

  return (
    <nav className="p-4 w-full shadow-md flex items-center justify-between bg-white sticky top-0 z-50">
      <button
        className="block md:hidden z-20"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={handleToggle}
      >
        <PiListThin className="text-3xl text-gray-700 cursor-pointer" />
      </button>
      <header className="flex items-center space-x-2">
        <MdOutlineTravelExplore className="text-2xl text-blue-400" />
        <h1 className="text-xl font-bold font-serif">Voyage</h1>
      </header>

      <ul
        id="mobile-menu"
        className={`fixed top-0 pt-15 left-0 h-full w-2/3 bg-white shadow-lg flex flex-col items-start p-6 space-y-6 transform transition-transform duration-300 ease-in-out
        ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:static md:flex md:flex-row md:space-y-0 md:space-x-6 md:p-0 md:shadow-none md:translate-x-0`}
      >
        <li tabIndex={0} className="cursor-pointer hover:text-blue-500">
          Home
        </li>
        <li tabIndex={0} className="cursor-pointer hover:text-blue-500">
          Featured deals
        </li>
        <li tabIndex={0} className="cursor-pointer hover:text-blue-500">
          Recently visited hotels
        </li>
        <li tabIndex={0} className="cursor-pointer hover:text-blue-500">
          Trending destinations
        </li>
      </ul>

      <article className="flex items-center space-x-4">
        <button className="h-10 w-10 bg-gray-50 rounded-full shadow hover:bg-gray-100 flex items-center justify-center">
          <CiBellOn className="text-2xl text-gray-600" aria-hidden="true" />
        </button>
        <img
          src="https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-avatar-placeholder-abstract-white-blue-green-png-image_3918476.jpg"
          alt="Profile"
          className="h-10 w-10 rounded-full object-cover"
        />
      </article>
    </nav>
  );
}

export default Navbar;
