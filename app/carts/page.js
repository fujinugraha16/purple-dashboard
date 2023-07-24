import axios from "axios"

import Carts from "@/views/Carts"

const getCarts = async () => {
  try {
    const { data } = await axios('https://dummyjson.com/carts')
    const { carts, ...otherData } = data
  
    return {
      carts: carts.map((cart, index) => ({ cart: `Cart ${index + 1}`, ...cart })),
      ...otherData,
    } 
  } catch (err) {
    throw err
  }
}

export default async function CartsPage() {
  const data = await getCarts()

  return (
    <Carts data={data} />
  )
}
