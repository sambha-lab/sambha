"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@sambha/ui/button";

interface EditableProfileProps {
  initialName: string;
  initialContact: string;
  initialPhoto: string;
  onSave?: (data: { name: string; contact: string; photo: string }) => void;
}

const EditableProfile: React.FC<EditableProfileProps> = ({
  initialName,
  initialContact,
  initialPhoto,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialName);
  const [contact, setContact] = useState(initialContact);
  const [photo, setPhoto] = useState(initialPhoto);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      const preview = URL.createObjectURL(file);
      setPhoto(preview);
    }
  };

  const handleSave = () => {
    if (onSave) onSave({ name, contact, photo });
    setIsEditing(false);
  };

  return (
    <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6 space-y-6">
      <div className="flex flex-col items-center space-y-4">
        {/* Profile photo */}
        <div className="relative">
          <Image
            src={photo}
            alt={name}
            width={96}
            height={96}
            className="rounded-full h-24 w-24 object-cover border-4 border-white shadow-md"
          />
          {isEditing && (
            <label className="absolute bottom-0 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded cursor-pointer">
              Change
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
            </label>
          )}
        </div>

        {/* Editable fields */}
        {isEditing ? (
          <>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-lg font-semibold border px-2 py-1 rounded w-full"
            />
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="text-sm border px-2 py-1 rounded w-full"
            />
          </>
        ) : (
          <>
            <h2 className="text-lg font-semibold text-gray-900">{name}</h2>
            <p className="text-sm text-gray-700">{contact}</p>
          </>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-3">
        {isEditing ? (
          <>
            <Button variant="secondary" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
          </>
        ) : (
          <Button variant="primary" onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        )}
      </div>
    </div>
  );
};

export default EditableProfile;
