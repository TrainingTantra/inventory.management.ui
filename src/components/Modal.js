import React from "react";

const Modal = ({ isVisible, onClose, children, modalTitle }) => {
  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-[1]"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="md:w-[600px] w-[90%] mx-auto flex flex-col bg-white">
        <div className="bg-white p-2 rounded">
          <div className="flex items-start justify-between p-4">
            <h5 className="text-xl font-medium text-gray-900">{modalTitle}</h5>
            <button className="opacity-50" onClick={() => onClose()}>
              X
            </button>
          </div>
          <div className="p-6 px-6 lg:px-8 text-left pt-0">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
