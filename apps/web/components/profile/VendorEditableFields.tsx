import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { cn } from "utils/cn";

type EditableFieldProps = {
  label: string;
  value: string;
  icon: React.ReactElement;
  multiline?: boolean;
  style?: string;
};

export const EditableField = ({
  label,
  value,
  icon,
  multiline = false,
  style,
}: EditableFieldProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      if (multiline) {
        if (!e.shiftKey) {
          e.preventDefault();
          setIsEditing(false);
        }
      } else {
        e.preventDefault();
        setIsEditing(false);
      }
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 flex-1">
        <div className="flex-1">
          <label className="block text-sm font-bold text-primary-darkPurple mb-1">
            {label}
          </label>

          {isEditing ? (
            multiline ? (
              <textarea
                value={currentValue}
                onChange={(e) => setCurrentValue(e.target.value)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:border-transparent bg-white-base text-neutral-black"
                rows={3}
                autoFocus
              />
            ) : (
              <input
                type="text"
                value={currentValue}
                onChange={(e) => setCurrentValue(e.target.value)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:border-transparent bg-white-base text-neutral-black"
                autoFocus
              />
            )
          ) : (
            <div className="flex justify-between items-start gap-4">
              <p
                className={cn(
                  "text-sm text-gray-900 whitespace-pre-line",
                  style
                )}
              >
                {currentValue || "Click to add value"}
              </p>
              <button type="button" onClick={() => setIsEditing(true)}>
                {icon}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

type Location = {
  name: string;
  address: string;
};

type EditableAddFieldProps = {
  label: string;
  values: Location[];
  icon: React.ReactElement;
};

export const EditableAddField = ({
  label,
  values,
  icon,
}: EditableAddFieldProps) => {
  const [items, setItems] = useState<Location[]>(values);
  const [isAdding, setIsAdding] = useState(false);
  const [newLocation, setNewLocation] = useState<Location>({
    name: "",
    address: "",
  });

  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleAdd = () => {
    if (newLocation.name.trim() !== "" && newLocation.address.trim() !== "") {
      setItems((prev) => [...prev, newLocation]);
      setNewLocation({ name: "", address: "" });
      setIsAdding(false);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAdd();
    }
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsAdding(false);
        setNewLocation({ name: "", address: "" });
      }
    }

    if (isAdding) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAdding]);

  return (
    <div className="flex flex-col" ref={wrapperRef}>
      <div className="flex items-center justify-between">
        <label className="block text-sm font-bold text-primary-darkPurple mb-2">
          {label}
        </label>

        <button type="button" onClick={() => setIsAdding(true)}>
          {icon}
        </button>
      </div>

      {isAdding ? (
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Location name"
            value={newLocation.name}
            onChange={(e) =>
              setNewLocation({ ...newLocation, name: e.target.value })
            }
            onKeyDown={handleKeyDown}
            className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 bg-white-base text-neutral-black"
            autoFocus
          />
          <textarea
            placeholder="Address (press Enter to add, Shift+Enter for new line)"
            value={newLocation.address}
            onChange={(e) =>
              setNewLocation({ ...newLocation, address: e.target.value })
            }
            onKeyDown={handleKeyDown}
            className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 bg-white-base text-neutral-black"
            rows={3}
          />
        </div>
      ) : (
        <ul className="space-y-3 mb-3">
          {items.map((loc, idx) => (
            <li key={`${loc.name}-${idx}`}>
              <p className="text-sm font-medium text-primary-darkPurple">
                {loc.name}
              </p>
              <p className="text-xs text-gray-600 whitespace-pre-line">
                {loc.address}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

type EditableImageFieldProps = {
  label: string;
  values: string[];
  icon: React.ReactElement;
};

export const EditableImageField = ({
  label,
  values,
  icon,
}: EditableImageFieldProps) => {
  const [images, setImages] = useState<string[]>(values);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleFileChange = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const newUrls = Array.from(files).map((file) => URL.createObjectURL(file));
    setImages(newUrls);
    setIsEditing(false);
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsEditing(false);
      }
    }
    if (isEditing) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditing]);

  return (
    <div className="flex flex-col" ref={wrapperRef}>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-bold text-primary-darkPurple">
          {label}
        </label>

        <button
          type="button"
          onClick={() => {
            setIsEditing(true);
            fileInputRef.current?.click();
          }}
        >
          {icon}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Image ${idx}`}
            className="w-full h-24 object-cover rounded"
          />
        ))}
      </div>

      {/* hidden input for selecting multiple */}
      {isEditing && (
        <input
          type="file"
          accept="image/*"
          multiple
          ref={fileInputRef}
          className="hidden"
          onChange={(e) => handleFileChange(e.target.files)}
        />
      )}
    </div>
  );
};
