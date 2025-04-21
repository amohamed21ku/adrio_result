'use client'

import { initializeApp } from "firebase/app";
import { getStorage, listAll, ref, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyD0eyX6bAMBNt5fd1ZDOYW7G903AYosZk4",
  authDomain: "face-veil.firebaseapp.com",
  projectId: "face-veil",
  storageBucket: "face-veil.firebasestorage.app",
  messagingSenderId: "834940908059",
  appId: "1:834940908059:web:f9e375e78afb76bda53ebe"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default function Home() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const storageRef = ref(storage, "masked_faces");
        const result = await listAll(storageRef);
        const urls = await Promise.all(
          result.items.map((imageRef) => getDownloadURL(imageRef))
        );
        setImageUrls(urls);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(50px, 1fr))', // Adjust minmax for desired tile size
    gap: '1px', // Adjust gap for spacing between images
    width: '80%', // Adjust width of the mosaic
    margin: '20px auto', // Center the mosaic
  };

  const imageStyle = {
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
    borderRadius: '3px',
    transition: 'opacity 0.3s ease-in-out',
  };

  return (
    <div style={{
      backgroundColor: 'hsl(var(--background))',
      color: 'hsl(var(--foreground))',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px'
    }}>
      <h1 style={{ color: 'hsl(var(--accent))', marginBottom: '20px' }}>Mosaic Face</h1>
      {loading ? (
        <p>Loading images...</p>
      ) : (
        <div style={containerStyle}>
          {imageUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Mosaic tile ${index}`}
              style={imageStyle}
            />
          ))}
        </div>
      )}
    </div>
  );
}
