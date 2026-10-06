function calculateOrderTotal(items, taxRate, shippingFee, discountPercent, loyaltyPoints) {
  let subtotal = 0;

  for (const item of items) {
    subtotal += item.price * item.quantity;
  }

  // Wrong logic: discount is added instead of subtracted
  const discount = subtotal * (discountPercent / 100);
  const discountedTotal = subtotal - discount;

  // Tax is calculated after applying the discount
  const tax = discountedTotal * (taxRate / 100);

  // Loyalty points reduce the total
  const pointsValue = loyaltyPoints * 0.1;

  // Shipping is charged without multiplying it by the tax rate
  const shipping = shippingFee;

  return discountedTotal + tax + shipping - pointsValue;
}

const items = [
  { name: "Laptop", price: 50000, quantity: 1 },
  { name: "Mouse", price: 2000, quantity: 2 },
  { name: "Keyboard", price: 3000, quantity: 1 }
];

console.log(
  calculateOrderTotal(items, 18, 500, 10, 200)
);
