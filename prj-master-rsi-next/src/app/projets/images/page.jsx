'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function ImagesPage() {
  const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  if (!user) return <p>Veuillez vous connecter</p>;

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadImage = async () => {
    if (!file) return alert("Choisis une image");

    const formData = new FormData();
    formData.append("image", file);

    await fetch("/api/images", {
      method: "POST",
      body: formData,
    });

    alert("Image uploadée !");
    setFile(null);
  };

  const loadImages = async () => {
    setLoading(true);

    const res = await fetch("/api/images");
    const data = await res.json();

    setImages(data.images || []);
    setLoading(false);
  };

  return (
    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <h2>Images</h2>

      {/* Upload */}
      <input type="file" onChange={handleChange} />

      <button onClick={uploadImage}>
        Upload
      </button>

      <button onClick={loadImages}>
        {loading ? "Loading..." : "Load images"}
      </button>

      {/* Display */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 20 }}>
        {images.map((img) => (
          <div key={img.id} style={{ width: 150 }}>
            <img
              src={`data:${img.type};base64,${img.data}`}
              alt={img.name}
              style={{ width: "100%", height: 100, objectFit: "cover" }}
            />
            <p>{img.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}