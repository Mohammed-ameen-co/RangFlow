import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { deleteUserAccount } from '../services/userService';

const DeleteAccountModal = ({ onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const { logout } = useContext(AuthContext);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await deleteUserAccount(data.password);
      if (response.success) {
        toast.success("Your account has been successfully deleted.");
        onClose();
        logout();
      } else {
        toast.error(response.message || "Failed to delete account.");
      }
    } catch (error) {
      console.error("Account deletion error:", error);
      toast.error(error.message || "Failed to delete account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 rounded-2xl p-8 w-full max-w-sm border border-gray-700 shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-center text-red-400">Confirm Account Deletion</h2>
        <p className="text-gray-300 text-sm mb-6 text-center">
          This action cannot be reversed. Please enter your password to verify your identity.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-1">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required to delete the account" })}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg font-semibold text-gray-400 border border-gray-600 hover:bg-gray-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-700 transition"
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteAccountModal;