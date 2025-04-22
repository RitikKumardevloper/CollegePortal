// import React from "react";

// const OverlayModal = ({ isOpen, onClose, children }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-[9999] bg-black bg-opacity-50 flex justify-center items-center px-4">
//       <div className="bg-white rounded-lg w-full max-w-xl max-h-[90vh] overflow-y-auto relative p-4">
//         <button
//           className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
//           onClick={onClose}
//         >
//           &times;
//         </button>
//         {children}
//       </div>
//     </div>
//   );
// };

// export default OverlayModal;

import React, { useRef } from "react";

const OverlayModal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef();

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black bg-opacity-50 flex justify-center items-center px-4"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg w-full max-w-xl max-h-[90vh] overflow-y-auto relative p-4"
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default OverlayModal;


