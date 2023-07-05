'use client';

import { useState } from 'react';

type Props = {
  products: [];
};

export default function SearchBar({ products }: any) {
  const [selectedType, setSelectedType] = useState('');
  const [searchName, setSearchName] = useState('');

  // Search products by name
  if (searchName) {
    const filterByName = (product: any) => product.name.includes(searchName);
    products = products.filter(filterByName);
  }

  // Filter products by type
  const filteredProducts = selectedType
    ? products.filter((product: any) => product.type === selectedType)
    : products;

  /*
  if (searchName) {
    const fn = (o) => o.name.includes(searchName);

    products = products.filter(fn);
  }

  // Filter products by type
  const filteredProducts = selectedType
    ? products.filter((product: any) => product.type === selectedType)
    : products; */

  return (
    <>
      <div>
        <input
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
      </div>
      <div>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">All</option>
          <option value="capsules">Capsules</option>
          <option value="instant">Instant</option>
          <option value="bean">Bean</option>
        </select>
      </div>
      <div>
        {filteredProducts.map((product: any) => {
          return (
            <div key={`product-div-${product.id}`}>
              <div>{product.name}</div>
              <p>{product.type}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
