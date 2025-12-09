import { useState, useEffect } from 'react';

export const useProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("https://test.onesnzeroes.dev/api/v1/product/all");
      const data = await res.json();
      setProducts(data);
    }
    load();
  }, []);

  return products;
};
