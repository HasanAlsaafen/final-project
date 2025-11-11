import React from "react";
import { MdOutlineTravelExplore } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { AiOutlineCopyrightCircle } from "react-icons/ai";

function Footer() {
  return (
    <footer className="bg-gray-100 flex flex-col md:flex-col justify-evenly p-5 gap-5">
      <section className="bg-gray-100 flex flex-col md:flex-row justify-evenly p-5 gap-5">
        <article className="flex flex-col">
          <div className="flex gap-2">
            {" "}
            <MdOutlineTravelExplore className="text-2xl text-blue-400" />
            <h5 className="text-xl font-bold font-playfair">Voyage</h5>{" "}
          </div>
          <p className="font-playfair text-gray-400">
            Curating unforgettable luxury travel experiences.
          </p>
        </article>
        <article className="flex flex-col">
          <h5 className="text-xl font-bold font-playfair">Company</h5>
          <ul className="list-none mt-2">
            {" "}
            <li>About us</li>
            <li>Career</li>
            <li>Press</li>
          </ul>
        </article>
        <article className="flex flex-col">
          <h5 className="text-xl font-bold font-playfair">Support</h5>
          <ul className="list-none mt-2">
            {" "}
            <li>Contact us</li>
            <li>FAQ</li>
            <li>Help center</li>
          </ul>
        </article>
        <article className="flex flex-col">
          <h5 className="text-xl font-bold font-playfair ">Follow us</h5>
          <ul className="list-none flex gap-1 justify-evenly items-center mt-2 text-gray-500 text-xl">
            {" "}
            <li>
              <FaFacebookF />
            </li>
            <li>
              <IoLogoInstagram />
            </li>
            <li>
              <FaXTwitter />
            </li>
          </ul>
        </article>
      </section>
      <div
        role="separator"
        className=" w-8/12 h-px bg-gray-400 left-2/12 relative opacity-60"
      ></div>
      <div className="flex justify-center items-center text-gray-400   gap-2 ">
        <span> {new Date().getFullYear()}</span>{" "}
        <p className="flex items-center gap-1 ">
          <AiOutlineCopyrightCircle />
          All rights are saved
        </p>
      </div>
    </footer>
  );
}

export default Footer;
