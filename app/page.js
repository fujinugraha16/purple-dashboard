import axios from "axios"

import Products from "@/views/Products"

const getProducts = async () => {
  try {
    const { data } = await axios('https://dummyjson.com/products?limit=100&select=title,brand,price,stock,category,thumbnail')
  
    return data
  } catch (err) {
    throw err
  }
}

const getCategories = async () => {
  try {
    const { data } = await axios('https://dummyjson.com/products/categories')
  
    return data
  } catch (err) {
    throw err
  }
}

export default async function ProductsPage() {
  const data = await getProducts()
  const categories = await getCategories()
  
  return (
    <Products
      data={data}
      categories={categories}
    />
  )
}
