import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import PostCard from "./PostCard2";
import { Link } from "react-router-dom";

// Dummy data for ads and news
const ads = [
  { id: 1, image: 'ad1.jpg', link: 'https://example.com/ad1' },
  { id: 2, image: 'ad2.jpg', link: 'https://example.com/ad2' },
];

const news = [
  { id: 1, title: 'New Camera Gear Released!', link: '/news/gear-release' },
  { id: 2, title: '10 Photography Tips for Beginners', link: '/news/tips' },
];

export default function DashSidebar2() {
  const [adIndex, setAdIndex] = useState(0);

  // Rotating ads every 5 seconds
  useEffect(() => {
    const adInterval = setInterval(() => {
      setAdIndex((prevIndex) => (prevIndex + 1) % ads.length);
    }, 5000);

    return () => clearInterval(adInterval);
  }, []);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  return (
    <Sidebar className="w-full md:w-72 bg-gray-100 p-4 rounded-lg">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-4">

          {/* Ads Section */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-2">Offers</h2>
            <div className="bg-white p-3 rounded-lg shadow-lg">
              <a href={ads[adIndex].link} target="_blank" rel="noopener noreferrer">
                <img
                  src={ads[adIndex].image}
                  alt={`Ad ${adIndex + 1}`}
                  className="w-full h-auto object-cover"
                />
              </a>
            </div>
          </div>

          <div className='max-w-6xl mx-auto p-3 py-7'>
            {posts && posts.length > 0 && (
              <div className='flex flex-col gap-6 items-center'>
                <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
                <div className='max-w-6xl mx-auto p-3 py-7 flex flex-col gap-8'>
                  {/* Show only 3 recent posts */}
                  {posts.slice(0, 3).map((post) => (
                    <PostCard key={post._id} post={post} />
                  ))}
                </div>
                <Link
                  to={'/search'}
                  className='text-lg text-teal-500 hover:underline text-center'
                >
                  View all posts
                </Link>
              </div>
            )}
          </div>

          {/* News Section */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-2">Latest News</h2>
            <div className="space-y-4">
              {news.map((item) => (
                <a key={item.id} href={item.link} className="block text-teal-500 hover:underline">
                  {item.title}
                </a>
              ))}
            </div>
          </div>

        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
