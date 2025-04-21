# **App Name**: Mosaic Face

## Core Features:

- Firebase Connection: Connect to Firebase Storage using the provided configuration to access images.
- Image Retrieval: Fetch all images from the 'masked_faces' folder within Firebase Storage.
- Mosaic Generation: Dynamically arrange the fetched images into a mosaic pattern to form a larger picture.
- Image Display: Display the generated mosaic image on the web page.

## Style Guidelines:

- Primary color: White or light gray for a clean background.
- Secondary color: Dark gray for text and subtle UI elements.
- Accent: Teal (#008080) to highlight interactive elements.
- A clean and minimal layout to focus on the mosaic image.
- Subtle transitions or animations when loading and arranging images.

## Original User Request:
I want a web that get pictures from firebase storage const firebaseConfig = {
  apiKey: "AIzaSyD0eyX6bAMBNt5fd1ZDOYW7G903AYosZk4",
  authDomain: "face-veil.firebaseapp.com",
  projectId: "face-veil",
  storageBucket: "face-veil.firebasestorage.app",
  messagingSenderId: "834940908059",
  appId: "1:834940908059:web:f9e375e78afb76bda53ebe"
}; and put the images from the storage folder masked_faces and put this in a shape to form a big picture out of the pictures in the storage
  