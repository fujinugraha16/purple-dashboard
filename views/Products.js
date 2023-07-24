'use client'
import axios from "axios"
import { useState, useEffect, useContext } from "react"

import Pagination from "@/components/Pagination"
import Table from "@/components/Table"

import debounce from "@/helpers/debounce"
import FilterProductDrawer from "@/components/FilterProductDrawer"
import DetailProductDrawer from "@/components/DetailProductDrawer"
import StatsProductPopup from "@/components/StatsProductPopup"
import paginateSearchAndFilter from "@/helpers/paginage-search-and-filter"
import AddOrEditProductDrawer from "@/components/AddOrEditProductDrawer"
import DeleteProductPopup from "@/components/DeleteProductPopup"

// icons
import ShoppingBagIcon from "@/icons/shopping-bag-icon"
import MagnifyGlassIcon from "@/icons/magnify-glass-icon"
import PlusIcon from "@/icons/plus-icon"
import FilterIcon from "@/icons/filter-icon"
import ChartIcon from "@/icons/chart-icon"
import CloseIcon from "@/icons/close-icon"

// context
import ToastContext from "@/context/ToastContext"

const tableData = {
  head: [
    {
      name: "Product Name",
      accessor: "title",
      isPrimary: true,
    },
    {
      name: "Brand",
      accessor: "brand",
    },
    {
      name: "Price",
      accessor: "price",
      customClassName: 'text-right',
    },
    {
      name: "Stock",
      accessor: "stock",
      customClassName: "text-center",
    },
    {
      name: "Category",
      accessor: "category",
    },
  ],
  mobileHead: {
    name: "Product Name",
    accessor: "title",
  },
}

const LIMIT = 10

const Products = ({ data, categories }) => {
  const addToast = useContext(ToastContext)
  
  const [products, setProducts] = useState(data.products)
  const [productList, setProductList] = useState([])
  const [total, setTotal] = useState(data.products.length)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [showFilterProductDrawer, setShowFilterProductDrawer] = useState(false)
  const [product, setProduct] = useState(null)
  const [showDetailProductDrawer, setShowDetailProductDrawer] = useState(false)
  const [showStatsPopup, setShowStatsPopup] = useState(false)
  const [showAddOrEditProductDrawer, setShowAddOrEditProductDrawer] = useState(false)
  const [showDeleteProductPopup, setShowDeleteProductPopup] = useState(false)

  const [priceMin, setPriceMin] = useState(Math.min(...data.products.map(product => product.price)))
  const [priceMax, setPriceMax] = useState(Math.max(...data.products.map(product => product.price)))

  const [filter, setFilter] = useState({
    brand: 'all',
    price: {
      min: Math.min(...data.products.map(product => product.price)),
      max: Math.max(...data.products.map(product => product.price)),
    },
    category: 'all',
  })

  const handleSearch = debounce((event) => {
    setSearch(event.target.value)
  }, 700)

  const handleToggleAddOrEditProductDrawer = () => setShowAddOrEditProductDrawer(prevState => !prevState)

  const handleToggleFilterProductDrawer = () => setShowFilterProductDrawer(prevState => !prevState)

  const handleToggleStatsProductPopup = () => setShowStatsPopup(prevState => !prevState)

  const handleToggleDeleteProductPopup = () => setShowDeleteProductPopup(prevState => !prevState)

  const handleShowAddOrEditProductDrawer = async (id = undefined, product = null) => {
    if (id && id <= 100) {
      try {
        const { data } = await axios(`https://dummyjson.com/products/${id}`)

        setProduct({ ...data, ...product })
      } catch (err) {
        addToast({
          type: "failed",
          message: "Get detail product failed",
        })
        return
      }
    } else if (id && id > 100) {
      setProduct(product)
    } else {
      setProduct(null)
    }

    setShowAddOrEditProductDrawer(true)
  }

  const handleShowDeleteProductPopup = async (product) => {
    setProduct(product)
    setShowDeleteProductPopup(true)
  }

  const handleShowDetailProductDrawer = async (id, product) => {
    if (id <= 100) {
      try {
        const { data } = await axios(`https://dummyjson.com/products/${id}`)
  
        setProduct({ ...data, ...product })
        setShowDetailProductDrawer(true)
      } catch (err) {
        addToast({
          type: "failed",
          message: "Get detail product failed",
        })
      }
    } else {
      setProduct(product)
      setShowDetailProductDrawer(true)
    }
  } 

  const handleDeleteProduct = async (id) => {
    setProducts(prevState => prevState.filter(item => item.id !== id))
    setShowDeleteProductPopup(false)
    setProduct(null)
    addToast({
      type: "success",
      message: "Delete product successfully",
    })
  }

  useEffect(() => {
    const { list, total } = paginateSearchAndFilter({
      list: products,
      perPage: LIMIT,
      page,
      ...(search && { search }),
      filter,
    })

    setProductList(list)
    setTotal(total)
  }, [page, products, search, filter])

  useEffect(() => {
    const { list, total } = paginateSearchAndFilter({
      list: products,
      perPage: LIMIT,
      page: 1,
      ...(search && { search }),
      filter,
    })

    setProductList(list)
    setTotal(total)
    setPage(1)
  }, [search, products, filter])

  useEffect(() => {
    if (!showDetailProductDrawer) {
      setProduct(null)
    }
  }, [showDetailProductDrawer])

  useEffect(() => {
    setTotal(products.length)

    setFilter(prevState => ({
      ...prevState,
      price: {
        min: Math.min(...products.map(product => product.price)),
        max: Math.max(...products.map(product => product.price)),
      },
    }))

    setPriceMin(Math.min(...products.map(product => product.price)))
    setPriceMax(Math.max(...products.map(product => product.price)))

    setSearch('')
    setPage(1)
  }, [products])

  return (
    <>
      <div className="p-0 sm:p-4">
        <div className="flex flex-col gap-5 w-full h-auto px-4 py-6 bg-white rounded-lg text-gray-700 shadow-none sm:shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between gap-3">
            <div className="flex gap-2">
              <ShoppingBagIcon className="w-6 h-6" />
              <h2 className="text-lg font-semibold">Products</h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex items-center gap-2 px-3 w-full sm:w-auto h-8 text-gray-700 border border-gray-700 rounded-lg">
                <MagnifyGlassIcon className="w-5 h-5" />
                
                <input
                  placeholder="Search ..."
                  onChange={handleSearch}
                  className="text-sm focus:outline-none"
                />
              </div>

              <button
                className="flex justify-center items-center px-3 gap-1 border border-purple-500 bg-purple-500 hover:bg-purple-600 rounded-lg w-full sm:w-auto h-8 text-sm text-white font-medium"
                onClick={handleShowAddOrEditProductDrawer}
              >
                <PlusIcon className="w-4 h-4" />
                Add <span className="block sm:hidden md:block">Product</span>
              </button>

              <button
                className="flex justify-center items-center px-3 gap-1 border border-purple-500 hover:bg-purple-500 rounded-lg w-full sm:w-auto h-8 text-sm text-purple-500 hover:text-white font-medium"
                onClick={handleToggleFilterProductDrawer}
              >
                <FilterIcon className="w-4 h-4" />
                Filter
              </button>

              <button
                className="flex justify-center items-center px-3 gap-1 border border-yellow-500 hover:bg-yellow-500 rounded-lg w-full sm:w-auto h-8 text-sm text-yellow-500 hover:text-white font-medium"
                onClick={handleToggleStatsProductPopup}
              >
                <ChartIcon className="w-4 h-4" />

                Stats
              </button>
            </div>
          </div>

          {(filter.brand !== 'all' || filter.price.min !== priceMin || filter.price.max !== priceMax || filter.category !== 'all') && (
            <div className="flex gap-3 items-center flex-wrap">
              <p className="text-xs font-semibold">FILTERED BY:</p>
              {filter.brand !== 'all' && (
                <div className="flex items-center gap-2 px-2 py-1 rounded-lg text-xs bg-purple-300 text-purple-800 hover:bg-purple-300 font-medium cursor-pointer">
                  Brand:<strong>{filter.brand}</strong>
                  <button onClick={() => setFilter(prevState => ({ ...prevState, brand: 'all' }))}>
                    <CloseIcon className="w-4 h-4" />
                  </button>
                </div>
              )}
              {(filter.price.min !== priceMin || filter.price.max !== priceMax) && (
                <div className="flex items-center gap-2 px-2 py-1 rounded-lg text-xs bg-purple-300 text-purple-800 hover:bg-purple-300 font-medium cursor-pointer">
                  Price Range:<strong>${filter.price.min} - ${filter.price.max}</strong>
                  <button
                    onClick={() => {
                      const elementPriceMin = document.getElementById('price-min')
                      const elementPriceMax = document.getElementById('price-max')
                      elementPriceMin.value = priceMin
                      elementPriceMax.value = priceMax

                      setFilter(prevState => ({ ...prevState, price: { min: priceMin, max: priceMax } }))
                    }}
                  >
                    <CloseIcon className="w-4 h-4" />
                  </button>
                </div>
              )}
              {filter.category !== 'all' && (
                <div className="flex items-center gap-2 px-2 py-1 rounded-lg text-xs bg-purple-300 text-purple-800 hover:bg-purple-300 font-medium cursor-pointer">
                  Category:<strong>{filter.category}</strong>
                  <button onClick={() => setFilter(prevState => ({ ...prevState, category: 'all' }))}>
                    <CloseIcon className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Table
              list={productList}
              tableData={tableData}
              handleAction={{ 
                view: handleShowDetailProductDrawer,
                delete: handleShowDeleteProductPopup,
                edit: handleShowAddOrEditProductDrawer,
              }}
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

      <AddOrEditProductDrawer
        open={showAddOrEditProductDrawer}
        toggle={handleToggleAddOrEditProductDrawer}
        brands={[...new Set(products.map(product => product.brand))]}
        categories={categories}
        productsLength={total}
        product={product}
        setProducts={setProducts}
      />

      <FilterProductDrawer
        open={showFilterProductDrawer}
        toggle={handleToggleFilterProductDrawer}
        brands={[...new Set(products.map(product => product.brand))]}
        priceMin={priceMin}
        priceMax={priceMax}
        categories={categories}
        filter={filter}
        setFilter={setFilter}
      />

      <DetailProductDrawer
        open={showDetailProductDrawer}
        toggle={() => setShowDetailProductDrawer(prevState => !prevState)}
        product={product}
      />

      <StatsProductPopup
        open={showStatsPopup}
        toggle={handleToggleStatsProductPopup}
        brandCount={products
          .map(product => product.brand)
          .reduce((accumulator, value) => ({...accumulator, [value]: (accumulator[value] || 0) + 1}), {})
        }
      />

      <DeleteProductPopup
        open={showDeleteProductPopup}
        toggle={handleToggleDeleteProductPopup}
        product={product}
        onConfirm={handleDeleteProduct}
      />
    </>
  )
}

export default Products