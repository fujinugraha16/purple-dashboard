'use client'
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Table from "@/components/Table"
import paginateSearchAndFilter from "@/helpers/paginage-search-and-filter"
import Pagination from "@/components/Pagination"
import LeftArrowIcon from "@/icons/left-arrow-icon"
import CartIcon from "@/icons/cart-icon"
import MarkIcon from "@/icons/mark-icon"

const tableData = {
  head: [
    {
      name: "Product Name",
      accessor: "productName",
      isPrimary: true,
    },
    {
      name: "Price",
      accessor: "price",
      customClassName: 'text-right',
    },
    {
      name: "Quantity",
      accessor: "quantity",
      customClassName: "text-center",
    },
    {
      name: "Total Price",
      accessor: "total",
      customClassName: "text-center",
    },
    {
      name: "Discount",
      accessor: "discountPercentage",
      customClassName: "text-center",
    },
    {
      name: "Price After Discount",
      accessor: "discountedPrice",
      customClassName: "text-center",
    },
  ],
  mobileHead: {
    name: "Product Name",
    accessor: "productName",
  },
}

const LIMIT = 5

const DetailCart = ({ id, cart, user }) => {
  const router = useRouter()
  
  const [productList, setProductList] = useState([])
  const [total, setTotal] = useState(cart.products.length)
  const [page, setPage] = useState(1)

  const handleBack = () => {
    router.push('/carts')
  }

  useEffect(() => {
    const { list, total } = paginateSearchAndFilter({
      list: cart.products,
      perPage: LIMIT,
      page,
    })

    setProductList(list)
    setTotal(total)
  }, [page, cart.products])

  return (
    <div className="p-0 sm:p-4">
      <div className="flex flex-col gap-5 w-full h-auto px-4 py-6 bg-white rounded-lg text-gray-700 shadow-none sm:shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              className="flex justify-center items-center w-8 h-8 rounded-full text-purple-500 hover:bg-gray-100"
              onClick={handleBack}
            >
              <LeftArrowIcon className="w-5 h-5" />
            </button>

            <CartIcon className="w-6 h-6" />
            <h2 className="text-lg font-semibold">Detail Cart {id}</h2>
          </div>
        </div>

        <div className="w-full p-4 rounded-lg border border-purple-300 bg-purple-50 text-purple-900">
          <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <div className="flex items-center gap-2">
              <div className="relative w-14 h-14 bg-white rounded-full overflow-hidden border border-purple-300">
                <Image
                  src={user.image}
                  alt="User Image"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col">
                <h4 className="uppercase text-sm font-semibold">{user.firstName} {user.lastName}</h4>
                <p className="text-xs">{user.email}</p>
                <div className="flex gap-1 mt-1">
                  <MarkIcon className="w-3 h-3" />

                  <p className="text-xs">{user.address.address}, {user.address.city}, {user.address.state}.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-row justify-between sm:flex-col gap-1 sm:items-end">
              <p className="text-xs"># of Items: <strong>{cart.totalProducts}</strong></p>
              <p className="text-xs">Total Quantity: <strong>{cart.totalQuantity}</strong></p>
              <p className="text-xs">Total Amount: <strong className="line-through">${cart.total}</strong> (<strong>${cart.products.reduce((prev, curr) => prev + curr.discountedPrice, 0)}</strong>)</p>
            </div>
          </div>
        </div>

        <h3 className="text-md font-semibold">Products</h3>

        <div className="flex flex-col gap-2">
          <Table
            list={productList}
            tableData={tableData}
            hideAction
          />

          {total > 0 ? (
            <p className="text-xs text-center text-gray-700">
              show <strong>{(LIMIT * page) - (LIMIT - 1)}</strong> - <strong>{total > LIMIT * page ? LIMIT * page : total}</strong> from <strong>{total}</strong> data
            </p>
          ) : (
            <p className="text-xs text-center text-gray-700">
              data not found
            </p>
          )}
        </div>

        <Pagination
          page={page}
          setPage={setPage}
          totalPage={Math.ceil(total/LIMIT)}
          totalButton={Math.ceil(total/LIMIT) < 5 ? Math.ceil(total/LIMIT) : 5}
        />
      </div>
    </div>
  )
}

export default DetailCart