// icons
import CloseIcon from "@/icons/close-icon"

const FilterProductDrawer = ({ open, toggle, brands, priceMin, priceMax, categories, filter, setFilter }) => {
  const handleChangePriceRange = (type, event) => {
    let value = event.target.value

    if (type === 'max') {
      if (parseInt(value, 10) > priceMax) {
        value = priceMax
      } else if (parseInt(value, 10) <= priceMax && parseInt(value, 10) >= priceMin) {
        value = value
      } else {
        value = priceMin
      }
    }

    if (type === 'min') {
      if (parseInt(value, 10) < priceMin) {
        value = priceMin
      } else if (parseInt(value, 10) >= priceMin && parseInt(value, 10) <= priceMax) {
        value = value
      } else {
        value = priceMax
      }
    }

    setFilter(prevState => ({
      ...prevState,
      price: {
        ...prevState.price,
        [type]: value,
      }
    }))
  }

  const handleBlurPriceRange = (type) => {
    const element = document.getElementById(`price-${type}`)
    let value = filter.price[type]

    if (type === 'max') {
      if (parseInt(value, 10) > priceMax) {
        element.value = priceMax
        value = priceMax
      } else if (parseInt(value, 10) <= priceMax && parseInt(value, 10) >= filter.price.min) {
        element.value = value
        value = value
      } else {
        element.value = filter.price.min
        value = filter.price.min
      }
    }

    if (type === 'min') {
      if (parseInt(value, 10) < priceMin) {
        element.value = priceMin
        value = priceMin
      } else if (parseInt(value, 10) >= priceMin && parseInt(value, 10) <= filter.price.max) {
        element.value = value
        value = value
      } else {
        element.value = filter.price.max
        value = filter.price.max
      }
    }

    setFilter(prevState => ({
      ...prevState,
      price: {
        ...prevState.price,
        [type]: value,
      }
    }))
  }

  return (
    <div className="relative">
      <div className={`flex flex-col w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 gap-3 h-screen bg-white py-5 px-3 shadow-md fixed top-0 left-0 z-20 transition-all duration-500 transform ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <button className="absolute top-4 right-4 text-gray-700" onClick={toggle}>
          <CloseIcon className="w-7 h-7" />
        </button>
    
        <div className="px-1 sm:px-2">
          <h1 className="text-gray-700 text-xl font-semibold">Filter</h1>
        </div>

        <form className="flex flex-col gap-4 px-1 sm:px-2">
          <div className="flex flex-col gap-2 text-gray-700">
            <label htmlFor="brand" className="font-medium">Select Brand</label>
            <select
              id="brand"
              className="px-3 py-2 border border-gray-400 focus:border-purple-500 hover:border-purple-500 rounded-md outline-none appearance-none cursor-pointer"
              onChange={(event) => setFilter(prevState => ({
                ...prevState,
                brand: event.target.value,
              }))}
              value={filter.brand}
            >
              <option value="all">All Brand</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2 text-gray-700">
            <label htmlFor="price-range" className="font-medium">Price Range</label>
            
            <div className="flex gap-3">
              <div className="flex flex-col gap-1 w-1/2">
                <label htmlFor="price-range" className="font-medium text-sm">Minimum Price</label>
                <div className="flex gap-2 w-full items-center px-3 py-2 border border-gray-400 focus:border-purple-500 hover:border-purple-500 rounded-md outline-none appearance-none cursor-pointer">
                  {"$"}
                  <input
                    id="price-min"
                    placeholder="Minimum Price"
                    className="w-full h-full outline-none appearance-none"
                    defaultValue={priceMin}
                    min={priceMin}
                    max={filter.price.max}
                    type="number"
                    onChange={(event) => handleChangePriceRange('min', event)}
                    onBlur={() => handleBlurPriceRange('min')}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1 w-1/2">
                <label htmlFor="price-range" className="font-medium text-sm">Maximum Price</label>
                <div className="flex gap-2 w-full items-center px-3 py-2 border border-gray-400 focus:border-purple-500 hover:border-purple-500 rounded-md outline-none appearance-none cursor-pointer">
                  {"$"}
                  <input
                    id="price-max"
                    placeholder="Maximum Price"
                    className="w-full h-full outline-none appearance-none"
                    defaultValue={priceMax}
                    min={filter.price.min}
                    max={priceMax}
                    type="number"
                    onChange={(event) => handleChangePriceRange('max', event)}
                    onBlur={() => handleBlurPriceRange('max')}
                  />
                </div>
              </div>
            </div>

          </div>

          <div className="flex flex-col gap-2 text-gray-700">
            <label htmlFor="category" className="font-medium">Select Category</label>
            <div className="flex gap-2 flex-wrap">
              {['all', ...categories].map(category => (
                <div 
                  key={category} 
                  className={`px-3 py-2 rounded-lg text-xs border-[1.5px] ${filter.category === category && 'bg-purple-300'} border-purple-300 text-purple-800 hover:bg-purple-300 font-medium cursor-pointer`}
                  onClick={() => setFilter(prevState => ({
                    ...prevState,
                    category,
                  }))}
                >
                  {category !== 'all' ? category : 'All'}
                </div>
              ))}
            </div>
          </div>
        </form>
      </div>

      {/* backdrop */}
      <div className={`${open ? 'block' : 'hidden'} fixed inset-0 bg-black opacity-50`} onClick={toggle} />
    </div>
  )
}

export default FilterProductDrawer