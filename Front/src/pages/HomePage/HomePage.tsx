import { useParams } from "react-router-dom";
import "./HomePage.css";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { PRODUCTS_BY_CATEGORY_QUERY } from "../../queries/Queries.ts";
import ProductCard from "../../components/ProductCard/ProductCard.tsx";

const HomePage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState<any[]>([]);

  const { loading, error, data } = useQuery(PRODUCTS_BY_CATEGORY_QUERY, {
    variables: { categoryName: category },
    skip: !category, // Skip query if category is not defined yet
  });

  useEffect(() => {
    console.log('Fetching data for category:', category);
  }, [category]);

  useEffect(() => {
    if (!loading && data) {
      setProducts(data.productsByCategory);
    }
  }, [loading, data]);

  if (loading) return <div className="loading-icon"></div>; // Display spinner
  if (error) return <p>Error: {error.message}</p>;

  return (
    <main className="home-page-main">
      <div className="home-page">
        <p className='category-name'>{category?.toUpperCase()}</p>
        <div className="product-list">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div></div>
    </main>
  );
};

export default HomePage;
