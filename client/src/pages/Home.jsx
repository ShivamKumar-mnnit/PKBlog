import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import DashSidebar1 from '../components/DashSidebar1';
import DashSidebar2 from '../components/DashSidebar2';

export default function Home() {
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
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Hide the sidebar on small screens and display it on medium screens */}
      <div className="hidden md:w-56 md:block">
        <div className="sticky top-0">
          <DashSidebar1 />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1">
        <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto '>
          <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to PK Photography</h1>
          <p className='text-gray-500 text-xs sm:text-sm'>
            Here you'll find a variety of photographs and tutorials.
          </p>
          <Link
            to='/search'
            className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'
          >
            View all posts
          </Link>
        </div>

        <div className='max-w-6xl mx-auto p-3 py-7'>
          {posts && posts.length > 0 && (
            <div className='flex flex-col gap-6 items-center'>
              <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
              <div className='max-w-6xl mx-auto p-3 py-7 flex flex-col gap-8'>
                {posts.map((post) => (
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
      </div>

      {/* Right sidebar for ads/news */}
      <div className="md:w-72">
        <DashSidebar2 />
      </div>
    </div>
  );
}
