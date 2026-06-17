"use client";

import { Input } from "@sambha/ui/input";
import { IoCameraOutline, IoSearchOutline } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import React, { useRef, useState } from "react";
import { useAtom, useSetAtom } from "jotai";
import { groupsAtom, usersAtom } from "../../store/chatAtoms";
import Image from "next/image";
import { Checkbox } from "@sambha/ui/checkbox";
import { HiPlus } from "react-icons/hi";
import { Button } from "@sambha/ui/button";
import { IoIosArrowBack } from "react-icons/io";
import { Host } from "../../types/events/data";
import { v4 as uuidv4 } from "uuid";
import { PlaceHolder } from "@sambha/ui/icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createGroupSchema } from "schemas/createGroupValidation";

export const CreateGroup = () => {
  const [users, setUsers] = useAtom(usersAtom);
  const setGroups = useSetAtom(groupsAtom);

  const [searchTerm, setSearchTerm] = useState("");
  // const [groupName, setGroupName] = useState<string>("");
  const [selected, setSelected] = useState<string[]>([]);
  const [step, setStep] = useState<1 | 2>(1);
  const [groupImage, setGroupImage] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const data = Object.values(users);

  const filtered = data.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    );
  };

  const selectedUsers = data.filter((user) => selected.includes(user.id));

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setGroupImage(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    inputRef.current?.click();
  };

  const {
  register,
  handleSubmit,
  getValues, 
  formState: { errors, isSubmitting },
} = useForm({
  resolver: yupResolver(createGroupSchema),
  defaultValues:{
    groupName: ''
  }
});

const onSubmit = () => {
  const formGroupName = getValues("groupName");

  if (!selectedUsers.length) return;

  const groupId = uuidv4();

  const newGroup: Host = {
    id: groupId,
    name: formGroupName,
    image: groupImage
      ? URL.createObjectURL(groupImage)
      : "/default-group.png",
    phoneNumber: "",
    verified: false,
    category: "host",
    members: selectedUsers.map((u) => ({
      id: u.id,
      name: u.name,
      image: u.image,
    })),
    membersTotal: selectedUsers.length,
    dateCreated: new Date().toISOString(),
  };

  setUsers((prev) => ({
    ...prev,
    [groupId]: newGroup,
  }));

  setGroups((prev) => [...prev, newGroup]);

  setStep(1);
  setSelected([]);
  setGroupImage(null);
  setSearchTerm("");
};

  if (step === 2) {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <button
        onClick={() => setStep(1)}
        type="button"
        className="inline-flex items-center space-x-2 text-sm"
      >
        <IoIosArrowBack /> Back
      </button>

      {/* Group Image Section */}
      <div className="flex flex-col space-y-2">
        <div className="relative w-24 h-24">
          {groupImage ? (
            <Image
              width={24}
              height={24}
              src={URL.createObjectURL(groupImage)}
              alt="Preview Image"
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <PlaceHolder />
          )}

          <button
            type="button"
            onClick={triggerFileInput}
            className="absolute -bottom-2 right-2 bg-gray-700 border-white border-2 rounded-full p-1 shadow"
          >
            <IoCameraOutline className="w-4 h-4 text-white-main " />
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

      {/* Group Name Field */}
      <div className="my-6 space-y-2">
        <label htmlFor="groupname">Group Name</label>
        <Input
          id="groupname"
          {...register("groupName")}
          placeholder="Enter group name"
          className="rounded-md"
        />
        {errors.groupName && (
          <p className="text-red-500 text-sm">{errors.groupName.message}</p>
        )}
      </div>

      {/* Selected Users */}
      <div className="flex flex-wrap gap-2">
        {selectedUsers.map((user) => (
          <div
            key={user.id}
            className="flex items-center space-x-1 bg-neutral-300 px-2 py-1 rounded-full text-sm"
          >
            <Image
              src={user.image}
              alt={user.name}
              width={20}
              height={20}
              className="rounded-full"
            />
            <span>{user.name}</span>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <Button
          type="submit"
          disabled = {isSubmitting}
          className="w-full bg-primary-violet text-white hover:bg-primary-violet/90"
        >
          {isSubmitting? 'Creating': 'Create Group'}
        </Button>
      </div>
    </form>
  );
}

  return (
    <div>
      <div className="relative mb-3">
        <Input
          placeholder="Search members by name or email"
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <IoSearchOutline className="absolute top-1/2 -translate-y-1/2 left-2 text-grey-base" />
      </div>

      {selectedUsers.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4 items-center">
          {selectedUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center space-x-1 bg-neutral-300 px-2 py-1 rounded-full text-sm"
            >
              <Image
                src={user.image}
                alt={user.name}
                width={20}
                height={20}
                className="rounded-full"
              />
              <span className="text-xs">{user.name}</span>
              <button
                onClick={() =>
                  setSelected((prev) =>
                    prev.filter((userId) => userId !== user.id)
                  )
                }
              >
                <IoIosClose />
              </button>
            </div>
          ))}
          <button
            className="text-sm bg-primary-violet hover:bg-primary-violet/80 text-white h-fit py-[2px] rounded-full inline-flex items-center px-2 space-x-1"
            onClick={() => setStep(2)}
          >
            <HiPlus />
            <span className="text-sm">Next</span>
          </button>
        </div>
      )}

      <div className="space-y-2">
        {filtered.map((user) => (
          <label
            key={user.id}
            className="flex justify-between items-center cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <Image
                src={user.image}
                alt={user.name}
                width={30}
                height={30}
                className="rounded-full size-7"
              />
              <div>
                <p className="text-neutral-base font-medium">{user.name}</p>
                <p className="text-neutral-base/50 text-sm">
                  {user.phoneNumber}
                </p>
              </div>
            </div>

            <Checkbox
              checked={selected.includes(user.id)}
              onCheckedChange={() => toggleSelect(user.id)}
              className="border-gray-base border-2"
            />
          </label>
        ))}
      </div>
    </div>
  );
};
