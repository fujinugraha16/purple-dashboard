'use client'
import { useState, useEffect } from "react"
import Image from "next/image"

// icons
import CloseIcon from "@/icons/close-icon"
import StartIcon from "@/icons/star-icon"

const DetailProductDrawer = ({ open, toggle, product }) => {
  const [imageIndex, setImageIndex] = useState(0)

  useEffect(() => {
    if (!open) {
      setImageIndex(0)
    }
  }, [open])

  return (
    <div className="relative">
      <div className={`flex flex-col w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 gap-3 h-screen bg-white py-5 px-3 fixed top-0 right-0 z-20 transition-all duration-500 transform ${open ? '-translate-x-0' : 'translate-x-full'}`}>
        <button className="absolute top-4 right-4 text-gray-700" onClick={toggle}>
          <CloseIcon className="w-7 h-7" />
        </button>
    
        <div className="px-1 sm:px-2">
          <h1 className="text-gray-700 text-xl font-semibold">Detail Product</h1>
        </div>
    
        {product && (
          <div className="flex flex-col gap-4 px-1 sm:px-2">
            {/* images */}
            <div className="flex flex-col gap-3">
              <div className="relative w-full h-80 overflow-hidden rounded-md">
                <Image 
                  src={product.images ? product.images[imageIndex] : product.thumbnail}
                  alt="Main Product Image"
                  fill
                  className="object-fill"
                />
              </div>

              <div className="flex gap-4">
                {[...(product.images ? product.images : [product.thumbnail])].map((image, index) => (
                  <div
                    key={index}
                    className={`relative w-10 h-10 ${index === imageIndex && 'border-2 border-green-500'} cursor-pointer`}
                    onClick={() => setImageIndex(index)}
                  >
                    <Image 
                      src={image}
                      alt={`Product Image ${index + 1}`}
                      fill
                      className="object-fill"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* main detail */}
            <div className="flex flex-col gap-3 text-gray-700">
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-medium">
                  {product.title}
                </h2>

                <p className="uppercase text-gray-700 font-semibold text-sm">{product.brand}</p>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <p className="text-yellow-400">
                      <StartIcon className="w-5 h-5" />
                    </p>

                    <p className="text-gray-700 text-sm font-medium">{product.rating}</p>
                  </div>

                  <div className="px-2 py-1 rounded-full text-xs bg-purple-300 text-purple-800 font-semibold">{product.category}</div>
                </div>
              </div>

              <p className="text-xs text-gray-500">
                {product.description}
              </p>
            </div>

            {/* other detail */}
            <div className="flex flex-col gap-2 text-gray-700">
              <div className="flex gap-2">
                <div className="w-1/3 bg-gray-100 rounded-md px-2 py-1 text-sm font-medium">
                  Price
                </div>
                <div className="w-2/3 bg-gray-100 rounded-md px-2 py-1 text-sm">
                  ${product.price}
                </div>
              </div>

              {Boolean(product.discountPercentage) && (
                <div className="flex gap-2">
                  <div className="w-1/3 bg-gray-100 rounded-md px-2 py-1 text-sm font-medium">
                    Discount
                  </div>
                  <div className="w-2/3 bg-gray-100 rounded-md px-2 py-1 text-sm">
                    {product.discountPercentage.toString().replace('.', ',')}%
                  </div>
                </div>
              )}

              {Boolean(product.discountPercentage) && (
                <div className="flex gap-2">
                  <div className="w-1/3 bg-gray-100 rounded-md px-2 py-1 text-sm font-medium">
                    After Discount
                  </div>
                  <div className="w-2/3 bg-gray-100 rounded-md px-2 py-1 text-sm">
                    ${(product.price - (product.price * (product.discountPercentage/100))).toFixed(2).toString().replace('.', ',')}
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <div className="w-1/3 bg-gray-100 rounded-md px-2 py-1 text-sm font-medium">
                  Stock
                </div>
                <div className="w-2/3 bg-gray-100 rounded-md px-2 py-1 text-sm">
                  {product.stock}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* backdrop */}
      <div className={`${open ? 'block' : 'hidden'} fixed inset-0 bg-black opacity-50`} onClick={toggle} />
    </div>
  )
}

export default DetailProductDrawer