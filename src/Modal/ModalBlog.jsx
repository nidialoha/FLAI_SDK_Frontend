export default function ModalBlog({ open, onClose, children }) {
  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 flex justify-center items-center transition-colors ${
          open ? "visible bg-black/20" : "invisible"
        } `}
      >
        {/* Modal */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`bg-white rounded-lg h-[500px] w-5/6 shadow-lg p-6 transition-all ${
            open ? "scale-100 opacity-100" : "scale-125 opacity-0"
          } `}
        >
          {children}
        </div>
      </div>
    </>
  );
}
