export default function ModalSearch({ open, onClose, children }) {
  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-100 flex justify-center items-start transition-colors duration-300 ${
          open ? "visible bg-black/20" : "invisible bg-transparent"
        } `}
      >
        {/* Modal */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`bg-white h-[500px] w-2/3 shadow-lg p-6 transition-all  mt-22 ${
            open ? "scale-100 opacity-100" : "scale-125 opacity-0"
          } `}
        >
          {children}
        </div>
      </div>
    </>
  );
}
