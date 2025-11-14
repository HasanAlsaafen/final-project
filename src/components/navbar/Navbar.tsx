import React, { ReactElement, useContext, useEffect, useState } from "react";
import { PiListThin } from "react-icons/pi";
import { AuthContext } from "../../contexts/AuthContext";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
interface NavProps {
  Header: ReactElement;
  List: string[];
  Account?: boolean;
}
function Navbar({ Header, List, Account = true }: NavProps) {
  const { logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [accountClicked, setAccountClicked] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

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
    <nav
      className={`p-4 w-full shadow-md flex items-center justify-between bg-white sticky top-0 z-50`}
    >
      {List.length ? (
        <button
          className="block md:hidden z-20"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={handleToggle}
        >
          <PiListThin className="text-3xl text-gray-700 cursor-pointer" />
        </button>
      ) : null}

      {Header}
      {List.length ? (
        <ul
          id="mobile-menu"
          className={`fixed top-0 pt-15 left-0 h-full w-2/3 bg-white shadow-lg flex flex-col items-start p-6 space-y-6 transform transition-transform duration-300 ease-in-out
        ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:static md:flex md:flex-row md:space-y-0 md:space-x-6 md:p-0 md:shadow-none md:translate-x-0`}
        >
          {List.map((item, index) => (
            <li
              tabIndex={0}
              className="cursor-pointer hover:text-blue-500"
              key={index}
            >
              {item}
            </li>
          ))}
        </ul>
      ) : null}

      <article className="flex items-center space-x-4">
        {Account && (
          <div className="relative">
            <img
              src="https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-avatar-placeholder-abstract-white-blue-green-png-image_3918476.jpg"
              alt="Profile"
              className="h-10 w-10 rounded-full object-cover"
              onClick={() => setAccountClicked((aC) => !aC)}
            />
          </div>
        )}
        {accountClicked && (
          <div className="absolute top-12 right-0 bg-white border border-gray-200 rounded shadow-md w-48">
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={handleOpen}
            >
              Log out
            </button>
          </div>
        )}
      </article>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 bg-white border border-gray-300 rounded-lg p-6 shadow-lg">
            <h2 id="modal-modal-title" className="text-lg font-semibold mb-4">
              Confirm Logout
            </h2>
            <p
              id="modal-modal-description"
              className="text-sm text-gray-600 mb-6"
            >
              Are you sure you want to log out?
            </p>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={logout}
              >
                Yes, log out
              </button>
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 ml-2"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </nav>
  );
}

export default Navbar;
