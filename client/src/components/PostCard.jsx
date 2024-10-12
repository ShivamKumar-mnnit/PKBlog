import React, { useState } from 'react';
import CommentCount from "./CommentCount";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons'; 
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons'; 
import { faWhatsapp, faFacebookF, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'; // Correct import here
import { faTimes } from '@fortawesome/free-solid-svg-icons'; // Import the close icon



// Utility function to strip HTML tags
function stripHtml(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
}

export default function PostCard({ post }) {
  const cleanDesc = stripHtml(post.content);

  // State for share dialog and custom message
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState("");

  // Construct the URL for sharing
  const currentArticleUrl = encodeURIComponent(window.location.origin + `/post/${post.slug}`);
  const encodedMessage = encodeURIComponent(customMessage ? `${customMessage} ` : '');

  // Share options with URLs and icons
  const shareOptions = [
    {
      name: "WhatsApp",
      url: `https://wa.me/?text=${encodedMessage}${currentArticleUrl}`,
      icon: faWhatsapp,
    },
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${currentArticleUrl}`,
      icon: faFacebookF,
    },
    {
      name: "X",
    url: `https://twitter.com/intent/tweet?text=${encodedMessage}${currentArticleUrl}`, // Twitter URL structure is still used
    icon: "https://w7.pngwing.com/pngs/748/680/png-transparent-twitter-x-logo.png", // Replace with the URL of the X icon
  },
    {
      name: "Email",
      url: `mailto:?subject=Check%20out%20this%20article&body=${encodedMessage}${currentArticleUrl}`,
      icon: faEnvelope, // Correct icon reference
    },
  ];

  const toggleShareModal = () => {
    setIsShareModalOpen(!isShareModalOpen);
  };

  return (
    <div className='group relative w-full h-auto overflow-hidden rounded-lg transition-all'>
      <div className='p-6'>
        <p className='text-2xl font-semibold mb-2'>{post.title}</p>
        <span className='italic text-sm text-gray-600'>{post.category}</span>

        <Link to={`/post/${post.slug}`}>
          <img
            src={post.image}
            alt='post cover'
            className='h-[300px] w-full object-cover transition-all duration-300'
          />
        </Link>
        <p className='text-gray-700 mt-4 line-clamp-3'>{cleanDesc}</p>

        <div className='mt-4 flex items-center justify-between'>
          <Link
            to={`/post/${post.slug}`}
            className='inline-block mt-4 px-4 py-2 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center rounded-md'
          >
            Read article
          </Link>

          {/* Comment and Share Icons */}
          <div className='ml-auto flex items-center space-x-4'>
            <div className='ml-auto flex items-center space-x-1'>
              <Link to={`/post/${post.slug}#comments`}>
                <FontAwesomeIcon icon={faCommentAlt} className='cursor-pointer' />
              </Link>
              <CommentCount postId={post._id} />
            </div>
            <FontAwesomeIcon
              icon={faShareAlt}
              className='cursor-pointer'
              onClick={toggleShareModal}
            />
          </div>
        </div>

        {/* Share Modal */}
       {/* Share Modal */}
{/* Share Modal */}
{isShareModalOpen && (
  <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
    <div className='bg-white rounded-lg p-6 shadow-lg min-w-[400px] max-w-[600px] relative'> {/* Add relative positioning here */}
      <h3 className='text-lg font-semibold'>Share this Article</h3>
      <input
        type="text"
        placeholder="Add a custom message..."
        value={customMessage}
        onChange={(e) => setCustomMessage(e.target.value)}
        className='mt-2 p-2 border rounded w-full'
      />
      <div className='share-options mt-4 flex justify-between'>
        {shareOptions.map((option, index) => (
          <a
            key={index}
            href={option.url}
            target="_blank"
            rel="noopener noreferrer"
            className='flex-1 inline-flex items-center justify-center p-2 border rounded hover:bg-gray-100 mx-1'
            aria-label={`Share on ${option.name}`}
          >
            {typeof option.icon === "string" ? (
              <img src={option.icon} alt={`${option.name} logo`} className="w-5 h-5 mr-1" />
            ) : (
              <FontAwesomeIcon icon={option.icon} className="mr-1" />
            )}
          </a>
        ))}
      </div>

      {/* Close button with red close icon, positioned in top-right corner */}
      <button
        onClick={toggleShareModal}
        className='absolute top-2 right-2 p-2'
      >
        <FontAwesomeIcon icon={faTimes} className='text-red-500 w-5 h-5' />
      </button>
    </div>
  </div>
)}


      </div>
    </div>
  );
}
