import React from "react";

export default function FiringPhotoInput({ onPhotoSelected }) {
  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      // Das ist ein String "data:image/jpeg;base64,..."
      onPhotoSelected(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFile}
        className="block"
      />
    </div>
  );
}