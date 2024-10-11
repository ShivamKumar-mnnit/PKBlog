import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons'; 
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons'; 

// Utility function to strip HTML tags
function stripHtml(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
}

export default function PostCard2({ post }) {
  // State for share dialog and custom message
  const [customMessage, setCustomMessage] = useState("");

  // Construct the URL for sharing
  const currentArticleUrl = encodeURIComponent(window.location.origin + `/post/${post.slug}`);
  const encodedMessage = encodeURIComponent(customMessage ? `${customMessage} ` : '');

  return (
    <div className='group relative w-full h-auto overflow-hidden rounded-lg transition-all'>
      <div className='p-4'>

        {/* Post Title - Restricted to 2 lines */}
        <p className='text-lg font-semibold mb-2 line-clamp-2'>
          {post.title}
        </p>

        {/* Post Image (Small Square) */}
        <Link to={`/post/${post.slug}`}>
          <img
            src={post.image}
            alt='post cover'
            className='h-32 w-32 object-cover rounded-md transition-all duration-300'
          />
        </Link>

        {/* Share and Comment Icons */}
        
      </div>
    </div>
  );
}
