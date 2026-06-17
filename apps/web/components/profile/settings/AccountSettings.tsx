import React, { useRef, useState } from "react";
import Image from "next/image";
import { IoCameraOutline } from "react-icons/io5";
import { Input } from "@sambha/ui/input";
import { PencilEdit } from "@sambha/ui/icons";
import { Switch } from "@sambha/ui/switch";

interface AccountSettingsProps {
  name: string;
  bio: string;
  email: string;
  image?: string;

  showCalendarAccess?: boolean;
  onChange?: (data: {
    name: string;
    bio: string;
    email: string;
    profileImage: File | null;
    calendarAccess?: boolean;
  }) => void;

  nameLabel?: string; // "Name" or "Company name"
  bioLabel?: string; // "Bio" or "Description"
}

export const AccountSettings: React.FC<AccountSettingsProps> = ({
  name,
  bio,
  email,
  image,
  showCalendarAccess = false,
  onChange,
  nameLabel = "Name", // default fallback
  bioLabel = "Bio", // default fallback
}) => {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [formData, setFormData] = useState({ name, bio, email });
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [calendarAccess, setCalendarAccess] = useState(true); // state for toggle

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onChange?.({ ...updated, profileImage });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
      onChange?.({ ...formData, profileImage: e.target.files[0] });
    }
  };

  const handleCalendarToggle = (value: boolean) => {
    setCalendarAccess(value);
    onChange?.({ ...formData, profileImage, calendarAccess: value });
  };

  const triggerFileInput = () => inputRef.current?.click();

  return (
    <div className="mt-9 w-full md:max-w-[500px]">
      <form className="">
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div>
            <div className="relative w-32 h-32 rounded-full">
              {profileImage ? (
                <Image
                  width={40}
                  height={40}
                  src={URL.createObjectURL(profileImage)}
                  alt="Preview Image"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : image ? (
                <Image
                  src={image}
                  alt={name}
                  width={40}
                  height={40}
                  className="w-full rounded-full object-cover"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center">
                  <IoCameraOutline className="w-6 h-6 text-gray-500" />
                </div>
              )}

              <button
                type="button"
                onClick={triggerFileInput}
                className="absolute bottom-1 right-2 bg-gray-700 border-white border-2 rounded-full p-1 shadow"
              >
                <IoCameraOutline className="w-4 h-4 text-white-base" />
              </button>
              <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          <div className="space-y-4 md:ml-6 w-full">
            <div className="grid grid-cols-1 space-y-1">
              <label htmlFor="name" className="font-medium text-sm">
                {nameLabel}
              </label>
              <Input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="min-h-10 rounded-lg"
              />
            </div>

            <div className="grid grid-cols-1 space-y-1">
              <label htmlFor="bio" className="font-medium text-sm">
                {bioLabel}
              </label>
              <textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                className="resize-none min-h-12 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
              />
            </div>
          </div>
        </div>

        <div className="relative grid grid-cols-1 space-y-1 mt-8">
          <label htmlFor="email" className="text-sm font-medium">
            Email Address
          </label>
          <Input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="rounded-lg min-h-10 text-grey-base"
          />
          <div className="absolute top-1/2 right-4">
            <PencilEdit />
          </div>
        </div>

        <div className="flex flex-col gap-6 py-8">
          <div className="flex items-center justify-between ">
            <p>Allow Notification</p>
            <Switch defaultChecked />
          </div>

          {showCalendarAccess && (
            <div className="flex items-center justify-between ">
              <p>Calendar Access</p>
              <Switch
                checked={calendarAccess}
                onCheckedChange={handleCalendarToggle}
              />{" "}
            </div>
          )}
        </div>
      </form>

      <button className="w-full text-center mt-6 text-error-dark">
        Delete Account
      </button>
    </div>
  );
};

// import React, { useRef, useState } from "react";
// import { userData } from "../../../app/(dashboard)/event-planner/chats/data";
// import Image from "next/image";
// import { IoCameraOutline } from "react-icons/io5";
// import { Input } from "@sambha/ui/input";
// import { PencilEdit } from "@sambha/ui/icons";
// import { Switch } from "@sambha/ui/switch";

// export const AccountSettings = () => {
//   const [profileImage, setProfileImage] = useState<File | null>(null);
//   const inputRef = useRef<HTMLInputElement | null>(null);

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setProfileImage(e.target.files[0]);
//     }
//   };

//   const triggerFileInput = () => {
//     inputRef.current?.click();
//   };

//   return (
//     <div className="mt-9 w-full md:max-w-[500px]">
//       <form action="" className="">
//         <div className="flex flex-col md:flex-row gap-4 w-full">
//           <div className="">
//             <div className="relative w-32 h-32 rounded-full">
//               {profileImage ? (
//                 <Image
//                   width={40}
//                   height={40}
//                   src={URL.createObjectURL(profileImage)}
//                   alt="Preview Image"
//                   className="w-full h-full rounded-full object-cover"
//                 />
//               ) : (
//                 <Image
//                   src={userData.image}
//                   alt={userData.name}
//                   width={40}
//                   height={40}
//                   className="w-full rounded-full"
//                 />
//               )}

//               <button
//                 type="button"
//                 onClick={triggerFileInput}
//                 className="absolute bottom-1 right-2 bg-gray-700 border-white border-2 rounded-full p-1 shadow"
//               >
//                 <IoCameraOutline className="w-4 h-4 text-white-base" />
//               </button>
//               <input
//                 type="file"
//                 accept="image/*"
//                 ref={inputRef}
//                 onChange={handleImageChange}
//                 className="hidden"
//               />
//             </div>
//           </div>

//           <div className="space-y-4 md:ml-6 w-full">
//             <div className="grid grid-cols-1 space-y-1">
//               <label htmlFor="name" className="font-medium text-sm">
//                 Company name
//               </label>
//               <Input
//                 type="text"
//                 defaultValue={userData.name}
//                 id="name"
//                 className="min-h-10 rounded-lg"
//               />
//             </div>
//             <div className="grid grid-cols-1 space-y-1">
//               <label htmlFor="description" className="font-medium text-sm">
//                 Description
//               </label>
//               <textarea
//                 id="description"
//                 defaultValue={userData.description}
//                 className="resize-none min-h-12 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
//               />
//             </div>
//           </div>
//         </div>
//         <div className="relative grid grid-cols-1 space-y-1 mt-8">
//           <label htmlFor="email" className="text-sm font-medium">
//             Email Address
//           </label>
//           <Input
//             type="email"
//             defaultValue={userData.email}
//             className="rounded-lg min-h-10 text-grey-base"
//           />
//           <div className="absolute top-1/2 right-4">
//             <PencilEdit />
//           </div>
//         </div>
//         <div className="flex items-center justify-between mt-6">
//           <p>Allow Notification</p>
//           <Switch defaultChecked />
//         </div>
//       </form>
//       <button className="w-full text-center mt-6 text-error-dark">
//         Delete Account
//       </button>
//     </div>
//   );
// };
