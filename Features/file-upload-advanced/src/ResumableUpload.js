import React, { useState, useRef } from 'react';
import axios from 'axios';

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [paused, setPaused] = useState(false);
  const cancelToken = useRef(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadFile = async () => {
    if (!file) return;
    if (paused) return; // Prevent upload if paused
    setUploading(true);
    setProgress(0);
    cancelToken.current = axios.CancelToken.source();
  
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await axios.post('http://localhost:3001/upload', formData, {
        onUploadProgress: (progressEvent) => {
          const totalLength = progressEvent.total;
          if (totalLength) {
            setProgress(Math.round((progressEvent.loaded * 100) / totalLength));
          }
        },
        cancelToken: cancelToken.current.token
      });
      console.log('File uploaded successfully:', response.data);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('File upload cancelled:', error.message);
      } else {
        console.error('Failed to upload file:', error);
      }
    } finally {
      setUploading(false);
    }
  };

  const cancelUpload = () => {
    if (cancelToken.current) {
      cancelToken.current.cancel('Upload cancelled by user');
      setUploading(false);
      setPaused(false); // Reset paused state when cancelling
    }
  };

  const pauseUpload = () => {
    if (!paused) {
      setPaused(true);
    } else {
      setPaused(false);
      uploadFile(); // Resume upload if paused
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile} disabled={!file || uploading || paused}>
        Upload
      </button>
      <button onClick={cancelUpload} disabled={!uploading || paused}>
        Cancel
      </button>
      <button onClick={pauseUpload} disabled={!uploading}>
        {paused ? 'Resume' : 'Pause'}
      </button>
      {uploading && <div>Progress: {progress}%</div>}
    </div>
  );
};

export default ResumeUpload;
