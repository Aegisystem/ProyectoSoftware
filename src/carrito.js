export function crearCarrito() {
  const items = new Map();
  return {
    agregar(producto, talla, cantidad = 1) {
      const clave = `${producto.id}-${talla}`;
      const actual = items.get(clave);
      items.set(clave, { producto, talla, cantidad: (actual?.cantidad ?? 0) + cantidad });
    },
    quitar(producto, talla) {
      items.delete(`${producto.id}-${talla}`);
    },
    subtotal() {
      let total = 0;
      for (const { producto, cantidad } of items.values()) total += producto.precio * cantidad;
      return total;
    },
    items: () => [...items.values()],
  };
}
