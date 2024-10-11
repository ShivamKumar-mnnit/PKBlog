import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiAnnotation,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiUser,
} from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { signOutSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

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
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">

          <Link to="/">
            <Sidebar.Item
              active={tab === "profile"}
              // icon={HiUser}
              as="div"
              onClick={window.scrollTo(0, 0)}
            >
              PK Photography
            </Sidebar.Item>
          </Link>
          <Link to="https://pkphotography.in">
            <Sidebar.Item
              active={tab === "profile"}
              as="div"
            >
              Gallery
            </Sidebar.Item>
          </Link>
          <Link to="https://pkphotography.in">
            <Sidebar.Item
              active={tab === "profile"}
              as="div"
            >
              Services
            </Sidebar.Item>
          </Link>
          <Link to="https://pkphotography.in">
            <Sidebar.Item
              active={tab === "profile"}
              as="div"
            >
              About Us
            </Sidebar.Item>
          </Link>
          <Link to="https://pkphotography.in">
            <Sidebar.Item
              active={tab === "profile"}
              as="div"
            >
              Contact us
            </Sidebar.Item>
          </Link>
          <Link to="https://pkphotography.in">
            <Sidebar.Item
              active={tab === "profile"}
              as="div"
            >
              Careers
            </Sidebar.Item>
          </Link>



          {/* <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={currentUser.isAdmin ? "Admin" : "User"}
              labelColor="dark"
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link> */}
          
            {/* <Link to="/dashboard?tab=posts">
              <Sidebar.Item
                active={tab === "posts"}
                icon={HiDocumentText}
                as="div"
              >
                Posts
              </Sidebar.Item>
            </Link> */}
          
          {/* {currentUser.isAdmin && (
            <>
              <Link to="/dashboard?tab=users">
                <Sidebar.Item
                  active={tab === "users"}
                  icon={HiOutlineUserGroup}
                  as="div"
                >
                  Users
                </Sidebar.Item>
              </Link>
              <Link to="/dashboard?tab=comments">
                <Sidebar.Item
                  active={tab === "comments"}
                  icon={HiAnnotation}
                  as="div"
                >
                  Comments
                </Sidebar.Item>
              </Link>
            </>
          )} */}

          <Sidebar.Item
            icon={HiArrowSmRight}
            className="cursor-pointer"
            onClick={handleSignOut}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
