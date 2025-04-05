export const Avatar = ({ src, size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "h-8 w-8 text-sm",
    md: "h-10 w-10 text-base",
    lg: "h-12 w-12 text-lg",
  };

  return (
    <div
      className={`${sizeClasses[size]} ${className} rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border border-gray-300`}
    >
      {src ? (
        <img src={src} alt="Avatar" className="w-full h-full object-cover" />
      ) : (
        <span className="text-gray-500">👤</span>
      )}
    </div>
  );
};
