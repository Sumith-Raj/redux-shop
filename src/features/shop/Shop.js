import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sell,
  buy,
  remove,
  selectProducts,
  selectCart,
  getTotal,
  checkout
} from "./shopSlice";
import styles from "./Shop.module.css";

export function Shop() {
  const [input, setinput] = useState({ title: "", price: 0 });
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const cart = useSelector(selectCart);
  const total = useSelector(getTotal);
  return (
    <>
      <div className={styles.input}>
        <input
          type="text"
          style={{ padding: "10px" }}
          onChange={(e) => {
            setinput({ ...input, title: e.target.value });
          }}
          placeholder="Enter the product"
          required
        />
        <input
          type="number"
          style={{ padding: "10px" }}
          onChange={(e) => {
            setinput({ ...input, price: Number(e.target.value) });
          }}
          placeholder="Enter the price"
          required
        />
        <button
          style={{ padding: "10px" }}
          onClick={() => dispatch(sell(input))}
        >
          Add to shop
        </button>
      </div>
      <div className={styles.box}>
        <h3>Products</h3>
        {products?.map((item) => (
          <article key={item.id}>
            <i>{item.title}</i>
            <p>Rs {item.price} /-</p>
            <button onClick={() => dispatch(buy(item.id))}>Add to cart</button>
            <hr />
          </article>
        ))}
        {products.length===0 && <p>Add something to shop</p>}
      </div>
      <div className={styles.cart}>
        <h3>Your Cart </h3>

        {cart?.map((item) => (
          <article key={item.id}>
            <i>
              {item.title} 
            </i>
            <p>Rs{item.price} /-</p>
            <button onClick={() => dispatch(remove(item.id))}>
              Remove from cart
            </button>
            <hr />
          </article>
        ))}
       {cart.length>0 ? <><b>Total price: {total}</b><br/><button onClick={() => dispatch(checkout())}>Checkout</button></>:<p>Add something to cart</p>}
      </div>
    </>
  );
}
