import React from 'react';
import { IoPencil, IoTrash } from 'react-icons/io5';

export default function ActionButtons({ onEdit, onDelete, showEdit, showDelete }) {
  return (
    <div className="flex space-x-2">
      {showEdit && (
        <button
          onClick={onEdit}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
        >
          <IoPencil /> Edit
        </button>
      )}
      {showDelete && (
        <button
          onClick={onDelete}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition flex items-center gap-2"
        >
          <IoTrash /> Delete
        </button>
      )}
    </div>
  );
}