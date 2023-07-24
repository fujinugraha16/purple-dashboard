'use client'
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

import Table from "@/components/Table"
import paginateSearchAndFilter from "@/helpers/paginage-search-and-filter"
import Pagination from "@/components/Pagination"

// icons
import CartIcon from "@/icons/cart-icon"

const tableData = {
  head: [
    {
      name: "Products",
      accessor: "products",
    },
    {
      name: "Total Quantity",
      accessor: "totalQuantity",
      customClassName: 'text-center',
    },
    {
      name: "Total Price",
      accessor: "total",
      customClassName: 'text-center',
    },
    {
      name: "Price After Discount",
      accessor: "discountedTotal",
      customClassName: 'text-center',
    },
  ],
  mobileHead: {
    name: "Carts",
    accessor: "cart",
    isPrimary: true,
  },
}

const LIMIT = 5

const Carts = ({ data }) => {
  const router = useRouter()

  const [cartList, setCartList] = useState([])
  const [total, setTotal] = useState(data.carts.length)
  const [page, setPage] = useState(1)

  const handleViewDetailCart = (id) => {
    router.push(`/carts/${id}`)
  } 

  useEffect(() => {
    const { list, total } = paginateSearchAndFilter({
      list: data.carts,
      perPage: 5,
      page,
    })

    setCartList(list)
    setTotal(total)
  }, [page, data.carts])

  return (
    <div className="p-0 sm:p-4">
      <div className="flex flex-col gap-5 w-full h-auto px-4 py-6 bg-white rounded-lg text-gray-700 shadow-none sm:shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <div className="flex gap-2">
            <CartIcon className="w-6 h-6" />
            <h2 className="text-lg font-semibold">Carts</h2>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Table
            list={cartList}
            tableData={tableData}
            handleAction={{ view: handleViewDetailCart }}
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

export default Carts