import { useState, useRef, useEffect } from "react";

export default function LanguageDropdown({ select, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { name: "C++", value: "cpp" },
    { name: "Java", value: "java" },
    { name: "Python", value: "python" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        className="bg-gray-800 text-white px-4 py-1 rounded-md flex items-center gap-2 hover:bg-gray-700 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        {select} ▼
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-40 bg-gray-900 text-white rounded-md shadow-lg z-10 border border-gray-700">
          {languages.map((lang) => (
            <button
              key={lang.value}
              className="block w-full text-left px-4 py-2 hover:bg-gray-700 transition"
              onClick={() => {
                onSelect(lang.value);
                console.log("Called !!!");
                
                setIsOpen(false);
              }}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
