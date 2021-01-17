const mysql = require('mysql2/promise');
const config = require('./config');

async function createOrder() {
  const items = ['TP0001'];
  const connection = await mysql.createConnection(config.db);
  await connection.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');
  console.log('Finished setting the isolation level to read committed');
  //set wait timeout and lock wait timeout as per need.
  await connection.beginTransaction();
  try {
    await connection.execute('SELECT id, name FROM product WHERE sku IN (?) FOR UPDATE', items);
    console.log(`Locked rows for skus ${items.join()}`);
    const [itemsToOrder,] = await connection.execute(
      'SELECT name, quantity, price from product WHERE sku IN (?) ORDER BY id',
      items
    );
    console.log('Selected quantities for items');
    let orderTotal = 0;
    let orderItems = [];
    for (itemToOrder of itemsToOrder) {
      if (itemToOrder.quantity < 1) {
        throw new Error(`One of the items is out of stock ${itemToOrder.name}`);
      }
      console.log(`Quantity for ${itemToOrder.name} is ${itemToOrder.quantity}`);
      orderTotal += itemToOrder.price;
      orderItems.push(itemToOrder.name);
    }
    await connection.execute(
      'INSERT INTO sales_order (items, total) VALUES (?, ?)', 
      [orderItems.join(), orderTotal]
    )
    console.log(`Order created`);
    await connection.execute(
      `UPDATE product SET quantity=quantity - 1 WHERE sku IN (?)`,
      items
    );
    console.log(`Deducted quantities by 1 for ${items.join()}`);
    await connection.commit();
    const [rows,] = await connection.execute('SELECT LAST_INSERT_ID() as order_id');
    return `order created with id ${rows[0].order_id}`;
  } catch (err) {
    console.error(`Error occurred while creating order: ${err.message}`, err);
    connection.rollback();
    console.info('Rollback successful');
    return 'error creating order';
  }
}

(async function testOrderCreate() {
  console.log(await createOrder());
  process.exit(0);
})();
