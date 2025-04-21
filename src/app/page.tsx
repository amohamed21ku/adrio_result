'use client'

import { initializeApp } from "firebase/app";
import { getStorage, listAll, ref, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-background">
      <Card className="w-full max-w-4xl shadow-md rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">ASIU104- Adrian Piper Style</CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Our Class Art :/
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          {loading ? (
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 20 }).map((_, index) => (
                <Skeleton key={index} className="w-full aspect-square rounded-md" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2">
              {imageUrls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Mosaic tile ${index}`}
                  className="w-full aspect-square object-cover rounded-md transition-opacity duration-300 opacity-90 hover:opacity-100"
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
