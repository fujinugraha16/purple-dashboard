import axios from "axios"
import { notFound } from "next/navigation"

import DetailCart from "@/views/DetailCart"

const getCart = async (id) => {
  try {
    const { data } = await axios(`https://dummyjson.com/carts/${id}`)
    const { products, ...cart } = data

    return {
      products: products.map(product => ({ productName: product.title, ...product })),
      ...cart,
    }
  } catch (err) {
    if ('response' in err && 'status' in err.response && err.response.status === 404) {
      return notFound()
    }

    throw err
  }
}

const getUser = async (id) => {
  try {
    const { data } = await axios(`https://dummyjson.com/users/${id}?select=email,firstName,lastName,image,address`)
    
    return data
  } catch (err) {
    throw err
  }
}

export default async function DetailCartPage({ params }) {
  const { id } = params
  const cart = await getCart(id)
  const user = await getUser(cart.userId)

  return (
    <DetailCart
      id={id}
      cart={cart}
      user={user}
    />
  )
}
