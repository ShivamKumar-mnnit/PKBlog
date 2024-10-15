import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import DashSidebar1 from '../components/DashSidebar1';
import DashSidebar2 from '../components/DashSidebar2';
import { Helmet } from 'react-helmet';

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

  // Generate a default description if no posts are available
  const defaultDescription = "Welcome to PK Photography. Explore our latest posts showcasing stunning photography.";
  const metaDescription = posts.length > 0 ? posts[0].description : defaultDescription;

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Helmet>
        <title>PK Photography - Latest Posts</title>
        <meta name="description" content={metaDescription} />
        {/* Add Open Graph tags if necessary */}
        <meta property="og:title" content="PK Photography - Latest Posts" />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content="https://www.pkphotography.io" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hide the sidebar on small screens and display it on medium screens */}
      <div className="hidden md:w-56 md:block">
        <div className="sticky top-0">
          <DashSidebar1 />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1">
        <div className='max-w-6xl mx-auto p-3 py-7'>
          {posts && posts.length > 0 && (
            <div className='flex flex-col gap-6 items-center'>
              <h2 className='text-2xl font-semibold text-center'>Latest Posts</h2>
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
