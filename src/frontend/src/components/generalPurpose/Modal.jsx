import { useEffect, useRef } from "react";

const Modal = ({ children, onClose }) => {
  const modalContentRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        modalContentRef.current &&
        !modalContentRef.current.contains(event.target)
      ) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded shadow-md" ref={modalContentRef}>
        {children}
      </div>
      <button
        className="absolute top-0 right-0 m-4 text-gray-600"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
};

export default Modal;
