import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCTS = [
  {
    id: 1,
    name: "CHERRY",
    description: "Fresh Japanese cherry",
    price: 6,
  },
  {
    id: 2,
    name: "STRAWBERRY",
    description: "Seasonal organic strawberry",
    price: 5,
  },
  {
    id: 3,
    name: "GRAPES",
    description: "Seedless grapes",
    price: 6.5,
  },
  {
    id: 4,
    name: "BANANA",
    description: "One of the best fruits for workout",
    price: 3.5,
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
