import { useState } from 'react';
import axios from 'axios';
function PostForm({ onAddPost }) {
  const [formData, setFormData] = useState({
    caption: '',
    image: null
  });
  const [preview, setPreview] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
     // console.log('File : ', file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Upload image to Cloudinary first
      const cloudinaryFormData = new FormData();
      cloudinaryFormData.append('file', formData.image);
      cloudinaryFormData.append('upload_preset', 'preset1'); // Replace with your upload preset
      //console.log('Cloudinary Form Data : ', cloudinaryFormData.get('file'));
      const cloudinaryResponse = await axios.post(
        'https://api.cloudinary.com/v1_1/dhxgu0jpf/image/upload', // Replace with your cloud name
        cloudinaryFormData
      );

      // Create post with Cloudinary image URL
      const postData = {
        caption: formData.caption,
        imageUrl: cloudinaryResponse.data.secure_url
      };
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      };
      //console.log('Post Data : ', postData);
      //alert('Post Data : '+postData);

      await axios.post('http://localhost:4000/api/feed', postData, config).then((response)=>{
        //console.log('Response : ', response);
        alert('Response : '+response);
      }).catch((error)=>{
        console.log('Error : ', error);
        alert('Error : '+error);
      });
      setFormData({ caption: '', image: null });
      setPreview('');
    } catch (error) {
      console.error('Error uploading image:', error);
      // Handle error appropriately (e.g., show error message to user)
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Create New Post</h5>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label className="form-label">Photo</label>
            <input
              type="file"
              className="form-control"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>
          {preview && (
            <div className="mb-3">
              <img
                src={preview}
                alt="Preview"
                className="img-fluid"
                style={{ maxHeight: '200px' }}
              />
            </div>
          )}
          <div className="mb-3">
            <label className="form-label">Caption</label>
            <textarea
              className="form-control"
              value={formData.caption}
              onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Post</button>
        </form>
      </div>
    </div>
  );
}

export default PostForm; 