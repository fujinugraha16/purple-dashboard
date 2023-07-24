// icons
import CloseIcon from "@/icons/close-icon"

const DeleteProductPopup = ({ open, toggle, product, onConfirm }) => {
  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className={`${open ? 'block' : 'hidden'} fixed inset-0 bg-black bg-opacity-50 transition-opacity`} />

      <div className={`${open ? 'block' : 'hidden'} fixed inset-0 z-10 overflow-y-auto`}>
        <div className="flex min-h-full items-end justify-center text-center sm:items-center p-0">
          <div className="relative transform overflow-hidden rounded-b-none sm:rounded-md bg-white text-left shadow-sm transition-all sm:my-8 w-full sm:max-w-lg">
            <div className="bg-white p-4 flex flex-col gap-3">
              <div>
                <button className="absolute top-4 right-4 text-gray-700" onClick={toggle}>
                  <CloseIcon className="w-7 h-7" />
                </button>

                <h1 className="text-gray-700 text-xl font-semibold">Delete Product</h1>
              </div>
              
              <p className="text-gray-700 text-base">Are you sure you want to delete the product <strong>{product && product.title}</strong>? deleted products cannot be returned.</p>
              
              {product && (
                <div className="flex justify-end gap-3">
                  <button                
                    className="flex justify-center items-center px-3 gap-1 border border-yellow-500 hover:bg-yellow-500 rounded-lg h-10 w-1/2 sm:w-auto text-sm text-yellow-500 hover:text-white font-medium"
                    onClick={toggle}
                  >
                    Cancel
                  </button>
                  <button
                    className="flex justify-center items-center px-3 gap-1 border border-red-500 bg-red-500 hover:bg-red-600 rounded-lg h-10 w-1/2 sm:w-auto text-sm text-white font-medium"
                    onClick={() => onConfirm(product.id)}
                  >
                    Yes, Continue
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteProductPopup