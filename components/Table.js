import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"

// icons
import EyeIcon from "@/icons/eye-icon"
import PencilIcon from "@/icons/pencil-icon"
import TrashIcon from "@/icons/trash-icon"
import ShoppingBagIcon from "@/icons/shopping-bag-icon"
import ShoppingBagSolidIcon from "@/icons/shopping-bag-solid-icon"
import UpArrowIcon from "@/icons/up-arrow-icon"

const shortenSentence = (sentence) => sentence.length <= 26 ? sentence : `${sentence.substring(0, 26)}...`

const Table = ({ tableData, list, handleAction, hideAction }) => {
  const pathname = usePathname()

  const [activeAccordionNumber, setActiveAccordionNumber] = useState(-1)

  const handleAccordionButton = (number) => setActiveAccordionNumber(activeAccordionNumber !== number ? number : -1)

  useEffect(() => {
    setActiveAccordionNumber(-1)
  }, [list])

  return (
    <>
      <div className="w-full overflow-scroll hidden sm:flex">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              {tableData.head.map(({ name, customClassName }, index) => (
                <th
                  key={index}
                  scope="col"
                  className={`px-6 py-3 ${customClassName}`}
                >
                  {name}
                </th>
              ))}

              {!hideAction && (
                <th scope="col" className="px-6 py-3 text-center">Action</th>
              )}
            </tr>
          </thead>
          <tbody>
            {list.map(item => (
              <tr key={item.id} className="bg-white border-b">
                {tableData.head.map(({ accessor, isPrimary, customClassName }) => 
                  accessor === 'title' ? (
                    <td key={`${item.id}-${accessor}`} scope="row" className={isPrimary ? `flex items-center gap-3 px-6 py-4 font-medium text-gray-700 whitespace-nowrap ${customClassName}` : `flex items-center gap-3 px-6 py-4 font-normal ${customClassName}`}>
                      <div className="flex items-center w-8 h-8 overflow-hidden">
                        <Image
                          src={item.thumbnail}
                          alt={`Thumbnail ${item.id}`}
                          width={32}
                          height={32}
                          className="object-fill"
                        />
                      </div>
                      {item.title}
                    </td>
                  ) : accessor === 'products' ? (
                    <td key={`${item.id}-${accessor}`} scope="row" className={isPrimary ? `px-6 py-4 font-medium text-gray-700 whitespace-nowrap ${customClassName}` : `px-6 py-4 font-normal ${customClassName}`}>
                      <ul key={accessor} className="list-disc px-4">
                        {item.products.map(product => (
                          <li key={product.id}>
                            {product.title} &nbsp;x &nbsp;{product.quantity}
                          </li>
                        ))}
                      </ul>
                    </td>
                  ) : (
                    <td key={`${item.id}-${accessor}`} scope="row" className={isPrimary ? `px-6 py-4 font-medium text-gray-700 whitespace-nowrap ${customClassName}` : `px-6 py-4 font-normal ${customClassName}`}>
                      {['price', 'total', 'discountedTotal', 'discountedPrice'].includes(accessor) && '$'}{item[accessor]}{accessor === 'discountPercentage' && '%'}
                    </td>
                  )
                )}

                {!hideAction && (
                  <td className={`px-6 py-4 gap-4 ${pathname.includes('carts') ? 'text-center' : 'flex justify-center items-center'}`}>
                    <button
                      className="text-gray-500"
                      onClick={() => handleAction.view(item.id, item)}
                    >
                      <EyeIcon className="w-4 h-4" />
                    </button>

                    {Boolean(handleAction.edit) && (
                      <button
                        className="text-blue-500"
                        onClick={() => handleAction.edit(item.id, item)}
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                    )}

                    {Boolean(handleAction.delete) && (
                      <button
                        className="text-red-500"
                        onClick={() => handleAction.delete(item)}
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                )} 
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* mobile view */}
      <div className="w-full flex flex-col sm:hidden">
        <div className="px-3 py-4 text-xs uppercase font-bold bg-gray-50">{tableData.mobileHead.name}</div>
        
        {list.map((item, index) => (
          <div key={item.id}>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3 px-3 py-4 font-medium text-gray-700 whitespace-nowrap border-b border-gray-100">
                {'title' in item && 'thumbnail' in item ? (
                  <>
                    <div className="flex items-center w-8 h-8 overflow-hidden">
                      <Image
                        src={item.thumbnail}
                        alt={`Thumbnail ${item.id}`}
                        width={32}
                        height={32}
                        className="object-fill"
                      />
                    </div>
                    {shortenSentence(item.title)}
                  </>
                ) : 'cart' in item ? (
                  <>
                    <ShoppingBagIcon className="w-5 h-5" />

                    {item.cart}
                  </>
                ) : 'productName' in item ? (
                  <>
                    <ShoppingBagSolidIcon className="w-6 h-6" />

                    {shortenSentence(item.productName)}
                  </>
                ) : (
                  item[tableData.mobileHead.accessor]
                )}
              </div>

              <button className="text-gray-700 px-3 py-4" onClick={() => handleAccordionButton(index)}>
                <UpArrowIcon className={`w-5 h-5 ${activeAccordionNumber === index && 'rotate-180'}`} />
              </button>
            </div>

            <div className={`${activeAccordionNumber !== index && 'hidden'} flex flex-col gap-5 px-3 py-4 bg-gray-50`}>
              {tableData.head.filter(({ accessor }) => accessor !== tableData.mobileHead.accessor).map(({ name, accessor }) =>
                accessor === 'products' ? (
                  <div key={accessor} className="flex flex-col gap-2">
                    <p className="text-gray-400 font-medium uppercase text-sm">{name}</p>
                    <ul key={accessor} className="list-disc px-4">
                      {item.products.map(product => (
                        <li key={product.id} className="text-sm">
                          {product.title} &nbsp;x &nbsp;{product.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div key={accessor} className="flex justify-between">
                    <p className="text-gray-400 font-medium uppercase text-sm">{name}</p>
                    <p>{['price', 'total', 'discountedTotal', 'discountedPrice'].includes(accessor) && '$'}{item[accessor]}{accessor === 'discountPercentage' && '%'}</p>
                  </div>
                )
              )}

              {!hideAction && (
                <div className="flex justify-between">
                  <p className="text-gray-400 font-medium uppercase text-sm">Action</p>
                  <div className="flex gap-5">
                    <button
                      className="text-gray-500"
                      onClick={() => handleAction.view(item.id, item)}
                    >
                      <EyeIcon className="w-4 h-4" />
                    </button>

                    {Boolean(handleAction.edit) && (
                      <button
                        className="text-blue-500"
                        onClick={() => handleAction.edit(item.id, item)}
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                    )}

                    {Boolean(handleAction.delete) && (
                      <button
                        className="text-red-500"
                        onClick={() => handleAction.delete(item)}
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Table