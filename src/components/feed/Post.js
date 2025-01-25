import { useEffect } from "react";

function Post({ post }) {
  return (
    <div className="col-lg-4 col-md-4 col-sm-12 mb-4">
      <div className="card">
        <img
          src={post.imageUrl}
          className="card-img-top"
          alt={post.caption}
          style={{ objectFit: 'cover', height: '300px' }}
        />
        <div className="card-body">
          <p className="card-text">{post.caption}</p>
          <small className="text-muted">
            Posted on {new Date(post.createdAt).toLocaleDateString()}
          </small>
          
        </div>
      </div>
    </div>
  );
}

export default Post; 