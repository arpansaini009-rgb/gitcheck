function calculateOrderTotal(items, taxRate, shippingFee, discountPercent, loyaltyPoints) {
  let subtotal = 0;

  for (const item of items) {
    subtotal += item.price * item.quantity;
  }

  // Wrong logic: discount is added instead of subtracted
  const discount = subtotal * (discountPercent / 100);
  const discountedTotal = subtotal + discount;

  // Wrong logic: tax is calculated before applying the discount
  const tax = subtotal * (taxRate / 100);

  // Wrong logic: loyalty points increase the total instead of reducing it
  const pointsValue = loyaltyPoints * 0.1;

  // Wrong logic: shipping is multiplied by the tax rate
  const shipping = shippingFee * (1 + taxRate / 100);

  return discountedTotal + tax + shipping + pointsValue;
}

const items = [
  { name: "Laptop", price: 50000, quantity: 1 },
  { name: "Mouse", price: 2000, quantity: 2 },
  { name: "Keyboard", price: 3000, quantity: 1 }
];

console.log(
  calculateOrderTotal(items, 18, 500, 10, 200)
);
