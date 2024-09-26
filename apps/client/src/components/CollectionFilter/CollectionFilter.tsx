import React from 'react'

interface CollectionFilterProps {
  setSelectedCollection: (value: React.SetStateAction<string>) => void
  selectedCollection: string
  collections: string[]
}

export const CollectionFilter = (props: CollectionFilterProps) => {
  const { selectedCollection, setSelectedCollection, collections } = props
  return (
    <div>
      <label
        htmlFor="collection"
        className="block text-sm font-medium text-gray-700"
      >
        Filter by Collection:
      </label>
      <select
        id="collection"
        name="collection"
        value={selectedCollection}
        onChange={(e) => setSelectedCollection(e.target.value)}
        className="mt-1 block w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
      >
        {collections.map((collection, index) => (
          <option key={index} value={collection}>
            {collection}
          </option>
        ))}
      </select>
    </div>
  )
}
