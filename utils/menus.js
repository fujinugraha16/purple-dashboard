// icons
import CartIcon from "@/icons/cart-icon"
import ShoppingBagIcon from "@/icons/shopping-bag-icon"

const menus = [
  {
    title: 'Products',
    icon: (
      <ShoppingBagIcon className="w-full h-full" />
    ),
    url: '/',
  },
  {
    title: 'Carts',
    icon: (
      <CartIcon className="w-full h-full" />
    ),
    url: '/carts',
  },
]

export default menus