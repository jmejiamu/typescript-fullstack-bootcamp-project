import React from 'react'
interface SearchInputProps {
  searchProduct: string
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export const SearchInput = (props: SearchInputProps) => {
  const { handleSearch, searchProduct } = props
  return (
    <input
      name="search"
      type="text"
      placeholder="Search for products..."
      value={searchProduct}
      onChange={handleSearch}
      className="w-full sm:w-1/3 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
    />
  )
}
