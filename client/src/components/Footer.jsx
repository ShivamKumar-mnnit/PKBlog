import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsGithub,
  BsDribbble,
} from "react-icons/bs";
import logo from '../images/logo.webp';

export default function FooterCom() {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                PK Photography
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                {/* Phone Label and Number */}
                <div>
                  <span className="font-bold">Phone:</span> <span className="font-normal">+91 8888766 739</span>
                </div>
                <div>
                  <span className="font-bold">Email:</span> <span className="font-normal">prabhakar@photography.com</span>
                </div>

                <Footer.Link href="#">
                  <img
                    src={logo}
                    alt="Logo"
                    className="w-24 h-12 object-contain" // Adjust logo size here
                  />
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title="Services" />
              <Footer.LinkGroup col className="space-y-1">
                <Footer.Link
                  href="https://pkphotography.in/corporate-headshots/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold" // Apply boldness to service links
                >
                  HeadShots
                </Footer.Link>
                <Footer.Link
                  href="https://pkphotography.in/portrait-gallery/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold"
                >
                  Portrait
                </Footer.Link>
                <Footer.Link
                  href="https://pkphotography.in/gallery/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold"
                >
                  Wedding & Events
                </Footer.Link>
                <Footer.Link
                  href="https://pkphotography.in/portfolio-gallery/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold"
                >
                  Portfolio
                </Footer.Link>
                <Footer.Link
                  href="https://pkphotography.in/interior-design/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold"
                >
                  Interior
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col className="space-y-1">
                <Footer.Link
                  href="https://pkphotography.in/book-session/"
                  className="font-semibold" // Apply boldness to legal links
                >
                  Bookings
                </Footer.Link>
                <Footer.Link
                  href="https://pkphotography.in/privacy-policy/"
                  className="font-semibold"
                >
                  Privacy Policy
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="PK Photography"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon href="#" icon={BsGithub} />
            <Footer.Icon href="#" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
