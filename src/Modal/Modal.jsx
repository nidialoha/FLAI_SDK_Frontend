export default function Modal({ open, onClose, children }) {
  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 flex justify-end items-center transition-colors duration-300 ${
          open ? "visible bg-black/20" : "invisible bg-transparent"
        } `}
      >
        {/* Modal */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`bg-white h-full w-[400px]  shadow-lg p-6 transform transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          } `}
        >
          {children}
        </div>
      </div>
    </>
  );
}
