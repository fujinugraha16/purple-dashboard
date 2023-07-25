'use client'
import axios from "axios"
import { useEffect, useContext, useState } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

// context
import ToastContext from "@/context/ToastContext"

// icons
import CloseIcon from "@/icons/close-icon"

const schema = yup.object().shape({
  id: yup.number().nullable(),
  title: yup.string().required("Product Name is required").min(3, "Product Name min 3 characters").max(50, "Product Name max 50 characters"),
  brand: yup.string().required("Brand is required"),
  price: yup.number().required("Price is required").min(1, "Price min $1").max(2000, "Price max $2000"),
  stock: yup.number().required("Stock is required").min(1, "Stock min 1").max(1000, "Stock max 1000"),
  category: yup.string().required("Category is required"),
})

const AddOrEditProductDrawer = ({ open, toggle, brands, categories, productsLength, product, setProducts }) => {
  const addToast = useContext(ToastContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      id: null,
      title: '',
      brand: '',
      price: 0,
      stock: 0,
      category: '',
    },
    resolver: yupResolver(schema),
  })

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data) => {
    setIsLoading(true)

    const payload = {
      id: data.id || productsLength + 1,
      title: data.title,
      brand: data.brand,
      price: data.price,
      stock: data.stock,
      category: data.category,
      thumbnail: data.thumbnail || 'https://image.dummyjson.com/300',
      discountPercentage: data.discountPercentage || 0,
      rating: data.rating || 5.0,
      images: data.images || ['https://image.dummyjson.com/300'],
    }

    try {
      if (!product) {
        // ADD
        await axios({
          url: 'https://dummyjson.com/products/add',
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          data: JSON.stringify(payload)
        })
  
        setProducts(prevState => [payload, ...prevState])
      } else {
        // EDIT
        if (payload.id <= 100) {
          await axios({
            url: `https://dummyjson.com/products/${payload.id}`,
            method: 'put',
            data: JSON.stringify(payload)
          })
        }
  
        setProducts(prevState => {
          const updatedPrevState = [...prevState]
          const indexProduct = updatedPrevState.map(item => item.id).indexOf(payload.id)

          if (indexProduct > -1) {
            updatedPrevState.splice(indexProduct, 1, payload)
            return updatedPrevState
          }

          return prevState
        })
      }

      addToast({
        type: "success",
        message: `${product ? "Edit" : "Add"} product successfully`,
      })
      toggle()
      reset()
    } catch (err) {
      addToast({
        type: "failed",
        message: `${product ? "Edit" : "Add"} product failed`,
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!open) {
      reset()
    }
  }, [open])

  useEffect(() => {
    if (product && open) {
      Object.entries(product).forEach(item => {
        setValue(item[0], item[1])
      })
    }
  }, [product, open])

  return (
    <div className="relative">
      <div className={`flex flex-col w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 gap-3 h-screen bg-white py-5 px-3 fixed top-0 right-0 z-20 transition-all duration-500 transform ${open ? '-translate-x-0' : 'translate-x-full'}`}>
        <button
          className="absolute top-4 right-4 text-gray-700"
          onClick={toggle}
          disabled={isLoading}
        >
          <CloseIcon className="w-7 h-7" />
        </button>
    
        <div className="px-1 sm:px-2">
          <h1 className="text-gray-700 text-xl font-semibold">{product ? 'Edit' : 'Add'} Product</h1>
        </div>
    
        <form
          id="add-or-edit-product"
          className="flex flex-col gap-4 px-1 sm:px-2"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-2 text-gray-700">
            <label htmlFor="title" className="font-medium">Product Name <span className="text-red-500">*</span></label>
            <input
              {...register("title")}
              id="title"
              placeholder="Product Name"
              className="w-full px-3 py-2 outline-none border border-gray-400 focus:border-purple-500 hover:border-purple-500 rounded-md"
            />
            {!!errors.title && errors.title.message && (
              <small className="text-red-500">{errors.title.message}</small>
            )}
          </div>

          <div className="flex flex-col gap-2 text-gray-700">
            <label htmlFor="brand" className="font-medium">Brand <span className="text-red-500">*</span></label>
            <select
              {...register("brand")}
              id="brand"
              className="px-3 py-2 border border-gray-400 focus:border-purple-500 hover:border-purple-500 rounded-md outline-none appearance-none cursor-pointer"
              onChange={() => {}}
            >
              <option value="">-- Select Brand --</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
            {!!errors.brand && errors.brand.message && (
              <small className="text-red-500">{errors.brand.message}</small>
            )}
          </div>

          <div className="flex flex-col gap-2 text-gray-700">
            <label htmlFor="price" className="font-medium">Price <span className="text-red-500">*</span></label>
            <div className="flex gap-2 w-full items-center px-3 py-2 border border-gray-400 focus:border-purple-500 hover:border-purple-500 rounded-md outline-none appearance-none cursor-pointer">
              {"$"}
              <input
                {...register("price")}
                id="price"
                placeholder="0"
                className="w-full h-full outline-none appearance-none"
                type="number"
                onChange={() => {}}
              />
            </div>
            {!!errors.price && errors.price.message && (
              <small className="text-red-500">{errors.price.message}</small>
            )}
          </div>

          <div className="flex flex-col gap-2 text-gray-700">
            <label htmlFor="stock" className="font-medium">Stock <span className="text-red-500">*</span></label>
            <div className="flex gap-2 w-full items-center px-3 py-2 border border-gray-400 focus:border-purple-500 hover:border-purple-500 rounded-md outline-none appearance-none cursor-pointer">
              <input
                {...register("stock")}
                id="stock"
                placeholder="0"
                className="w-full h-full outline-none appearance-none"
                type="number"
                onChange={() => {}}
              />
            </div>
            {!!errors.stock && errors.stock.message && (
              <small className="text-red-500">{errors.stock.message}</small>
            )}
          </div>

          <div className="flex flex-col gap-2 text-gray-700">
            <label htmlFor="category" className="font-medium">Category <span className="text-red-500">*</span></label>
            <select
              {...register("category")}
              id="category"
              className="px-3 py-2 border border-gray-400 focus:border-purple-500 hover:border-purple-500 rounded-md outline-none appearance-none cursor-pointer"
              onChange={() => {}}
            >
              <option value="">-- Select Category --</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            {!!errors.category && errors.category.message && (
              <small className="text-red-500">{errors.category.message}</small>
            )}
          </div>

          <div className="flex sm:hidden flex-col gap-2 w-full mt-3">
            <button
              className="flex justify-center items-center px-3 gap-1 border border-purple-500 bg-purple-500 hover:bg-purple-600 rounded-lg w-full h-10 text-sm text-white font-medium"
              type={isLoading ? "button" : "submit"}
              form={!isLoading && "add-or-edit-product"}
              disabled={isLoading}
            >
              {isLoading ? "Please wait..." : "Save"}
            </button>
            <button                
              className="flex justify-center items-center px-3 gap-1 border border-yellow-500 hover:bg-yellow-500 rounded-lg w-full h-10 text-sm text-yellow-500 hover:text-white font-medium"
              onClick={toggle}
              type="button"
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </form>

        <div className="hidden sm:block absolute bottom-4 right-0 w-full">
          <div className="flex justify-between gap-2 w-full px-4">
            <button                
              className="flex justify-center items-center px-3 gap-1 border border-yellow-500 hover:bg-yellow-500 rounded-lg w-1/2 h-10 text-sm text-yellow-500 hover:text-white font-medium"
              onClick={toggle}
              type="button"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              className="flex justify-center items-center px-3 gap-1 border border-purple-500 bg-purple-500 hover:bg-purple-600 rounded-lg w-1/2 h-10 text-sm text-white font-medium"
              type={isLoading ? "button" : "submit"}
              form={!isLoading && "add-or-edit-product"}
              disabled={isLoading}
            >
              {isLoading ? "Please wait..." : "Save"}
            </button>
          </div>
        </div>
      </div>

      {/* backdrop */}
      <div className={`${open ? 'block' : 'hidden'} fixed inset-0 bg-black opacity-50`} onClick={toggle} />
    </div>
  )
}

export default AddOrEditProductDrawer