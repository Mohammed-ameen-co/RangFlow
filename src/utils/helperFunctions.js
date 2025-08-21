
export const getInitials = (name) => {
  if (!name) return "G"; // G for Guest
  const parts = name.split(" ");
  if (parts.length > 1) {
    return parts[0][0].toUpperCase() + parts[1][0].toUpperCase();
  }
  return parts[0][0].toUpperCase();
};


