import { createFileRoute, Link } from '@tanstack/react-router'
import {
  ProductCard,
  SearchInput,
  CollectionFilter,
  SortyBy,
  Cart,
} from '../components'
import { useProducts, useCollection } from '../hooks'
import { useState } from 'react'
import { Modal } from '../components/Modal'
import { useCart } from '../Contextapi/CartProvider'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const {
    data,
    handleSearch,
    isError,
    isLoading,
    searchProduct,
    selectedCollection,
    setSelectedCollection,
    setSortOrder,
    sortOrder,
  } = useProducts()

  const [isCartOpen, setCartOpen] = useState(false)
  const { collections } = useCollection()
  const { state } = useCart()

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error fetching products</p>

  const handleOpenCart = () => setCartOpen(true)
  const handleCloseCart = () => setCartOpen(false)

  return (
    <div className="p-2">
      <Modal isOpen={isCartOpen} onClose={handleCloseCart}>
        <Cart />
      </Modal>
      <div className="container mx-auto p-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
          {/* Search Bar */}
          <Link to={`/`}>
            <p>Home</p>
          </Link>

          <SearchInput
            handleSearch={handleSearch}
            searchProduct={searchProduct}
          />

          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 w-full sm:w-auto">
            {/* Collection Filter */}
            <CollectionFilter
              collections={collections}
              selectedCollection={selectedCollection}
              setSelectedCollection={setSelectedCollection}
            />

            {/* Sort By Price */}
            <SortyBy sortOrder={sortOrder} setSortOrder={setSortOrder} />
            <button
              onClick={handleOpenCart}
              className="relative flex items-center px-4 py-2 rounded-full border-2 border-gray-300 bg-white text-gray-700 shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <span className="text-lg">🛍️</span>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {state.items.length}
              </span>
            </button>
          </div>
        </div>
      </div>
      {/* Products' List */}
      <main className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-center min-h-screen p-8 mx-auto">
        {data?.result.map((product, index) => {
          return <ProductCard key={product.id} product={product} />
        })}
      </main>
    </div>
  )
}
