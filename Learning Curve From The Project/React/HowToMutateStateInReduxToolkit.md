To update an object within an array in Redux Toolkit reducer, you need to ensure that you are returning the updated state correctly. The map method should be used to return a new array, and the mutation of product.quantity should be done immutably. Also, avoid direct mutation of the state. Here's a modified version of your reducer:

```ts
setCartProduct: (state, action: PayloadAction<CartProduct>) => {
  const existingProductIndex = state.findIndex(product => product.id === action.payload.id);

  if (existingProductIndex !== -1) {
    // If product exists in the cart, update the quantity
    state[existingProductIndex] = {
      ...state[existingProductIndex],
      quantity: state[existingProductIndex].quantity + 1,
    };
  } else {
    // If product doesn't exist, add it to the cart
    state.push(action.payload);
  }
},

```

Explanation:
    - findIndex is used to locate the product in the array.
    - If the product exists, it updates the quantity immutably by creating a new object for that specific product.
    - If the product doesn't exist, it adds it to the cart.
    - This ensures that the state is updated immutably and properly triggers Redux updates.