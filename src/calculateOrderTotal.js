const POINT_VALUE = 0.1;

function calculateOrderTotal(items, taxRate, shippingFee, discountPercent, loyaltyPoints) {
  let subtotal = 0;

  for (const item of items) {
    subtotal += item.price * item.quantity;
  }

  // Discount reduces the subtotal.
  const discount = subtotal * (discountPercent / 100);
  const discountedTotal = subtotal - discount;

  // Tax applies to the discounted amount.
  const tax = discountedTotal * (taxRate / 100);

  // Shipping is a flat fee and is not taxed.
  const shipping = shippingFee;

  // Loyalty points are redeemed against the total, but can't push it below zero.
  const beforePoints = discountedTotal + tax + shipping;
  const pointsValue = Math.min(loyaltyPoints * POINT_VALUE, beforePoints);

  return beforePoints - pointsValue;
}

const items = [
  { name: "Laptop", price: 50000, quantity: 1 },
  { name: "Mouse", price: 2000, quantity: 2 },
  { name: "Keyboard", price: 3000, quantity: 1 }
];

console.log(
  calculateOrderTotal(items, 18, 500, 10, 200)
);
