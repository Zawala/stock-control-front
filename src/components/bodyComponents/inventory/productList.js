
const fetchOrders = async () => {
  try {
      const response = await fetch('http://127.0.0.1:8000/api/products');
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const orders = await response.json();
      return orders;
  } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
  }
};
const fetchedOrders = await fetchOrders();
console.log(fetchedOrders);

  export default fetchedOrders;