import { Sidebar, Dropdown } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { HiArrowSmRight } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { signOutSuccess } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function DashSidebar1() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/user/signout", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handlenavigate = () => {
    navigate("sign-in");
  };

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          <Link to="/">
            <Sidebar.Item as="div">PK Photography</Sidebar.Item>
          </Link>
          <Link to="https://pkphotography.in">
            <Sidebar.Item as="div">Gallery</Sidebar.Item>
          </Link>

          {/* Services Dropdown with Updated Links */}
          <Dropdown label="Services" arrowIcon={true}>
            <Dropdown.Item>
              <Link
                to="https://pkphotography.in/corporate-headshots/"
                target="_blank"
                rel="noopener noreferrer"
              >
                HeadShots
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link
                to="https://pkphotography.in/portrait-gallery/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Portrait
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link
                to="https://pkphotography.in/gallery/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Wedding & Events
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link
                to="https://pkphotography.in/portfolio-gallery/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Portfolio
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link
                to="https://pkphotography.in/interior-design/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Interior
              </Link>
            </Dropdown.Item>
          </Dropdown>

          <Link to="https://pkphotography.in">
            <Sidebar.Item as="div">About Us</Sidebar.Item>
          </Link>
          <Link to="https://pkphotography.in">
            <Sidebar.Item as="div">Contact Us</Sidebar.Item>
          </Link>
          <Link to="https://pkphotography.in">
            <Sidebar.Item as="div">Careers</Sidebar.Item>
          </Link>

          {currentUser ? (
            <Sidebar.Item
              icon={HiArrowSmRight}
              className="cursor-pointer"
              onClick={handleSignOut}
            >
              Sign Out
            </Sidebar.Item>
          ) : (
            <Sidebar.Item
              icon={HiArrowSmRight}
              className="cursor-pointer"
              onClick={handlenavigate}
            >
              Sign In
            </Sidebar.Item>
          )}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
