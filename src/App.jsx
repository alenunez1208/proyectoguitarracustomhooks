import Guitarra from "./components/Guitarra.jsx";
import Header from "./components/Header.jsx";
import { useCart } from "./hooks/useCart.js";

function App() {
  const {
    data,
    cart,
    handleAddCart,
    handleRemoveItemCart,
    handleAddCantidad,
    handleRemoveCantidad,
    handleClearCart,
    isEmpty,
    cartTotal,
  } = useCart();

  return (
    <>
      <Header
        cart={cart}
        fncRemoveItem={handleRemoveItemCart}
        fncAddCantidad={handleAddCantidad}
        fncRemoveCantidad={handleRemoveCantidad}
        fncClearCart={handleClearCart}
        isEmpty={isEmpty}
        cartTotal={cartTotal}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => {
            return (
              <Guitarra
                key={guitar.id}
                guitar={guitar}
                addCart={handleAddCart}
              />
            );
          })}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
