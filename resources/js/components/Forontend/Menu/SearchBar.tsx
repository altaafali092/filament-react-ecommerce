import { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchBar = ({ isOpen, onClose }: SearchBarProps) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 w-full  p-4 animate-slideDown z-50">
      <div className="relative max-w-3xl mx-auto">
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full py-3 pl-4 pr-10 rounded-full border border-black bg-white focus:outline-none focus:ring-2 focus:ring-pink-300"
          autoFocus
        />
        <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <button
          className="absolute -top-1 -right-1 bg-gray-200 rounded-full p-1"
          onClick={onClose}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;