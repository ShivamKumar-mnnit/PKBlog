import React, { useState } from 'react';
import CommentCount from "./CommentCount";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt, faTimes } from '@fortawesome/free-solid-svg-icons'; 
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons'; 
import { faWhatsapp, faFacebookF, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'; 

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
      name: "Copy Link",
      url: '#',
      icon: null, // No icon for this option
    },
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
      name: "Twitter",
      url: `https://twitter.com/intent/tweet?text=${encodedMessage}${currentArticleUrl}`,
      icon: "https://w7.pngwing.com/pngs/748/680/png-transparent-twitter-x-logo.png",
    },
    {
      name: "Email",
      url: `mailto:?subject=Check%20out%20this%20article&body=${encodedMessage}${currentArticleUrl}`,
      icon: faEnvelope,
    },
  ];

  const toggleShareModal = () => {
    setIsShareModalOpen(!isShareModalOpen);
  };

  // Function to copy link to clipboard
  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(window.location.origin + `/post/${post.slug}`);
    alert("Link copied to clipboard!"); // Feedback for the user
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
            className='h-[300px] w-full object-contain transition-all duration-300'
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
        {isShareModalOpen && (
          <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
            <div className='bg-white rounded-lg p-6 shadow-lg min-w-[400px] max-w-[600px] relative'>
              <h3 className='text-lg font-semibold'>Share this Article</h3>
              <input
                type="text"
                placeholder="Add a custom message..."
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className='mt-2 p-2 border rounded w-full'
              />
              <div className='share-options mt-4 flex mx-4 '>
                {shareOptions.map((option, index) => (
                  <a
                    key={index}
                    href={option.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={option.name === "Copy Link" ? (e) => { e.preventDefault(); copyLinkToClipboard(); } : null}
                    className='flex items-center justify-between p-2 border rounded hover:bg-gray-100 my-1 mx-1'
                    aria-label={`Share on ${option.name}`}
                  >
                    {option.icon && (
                      <FontAwesomeIcon icon={option.icon} className="ml-2 mx-2" />
                    )}
                    {option.name}
                  </a>
                ))}
              </div>

              {/* Close button */}
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
