import React, { useState } from 'react';
import { Table, TableRow, TableHead, TableData } from './TableStyles';
import OrdersContext from '../contexts/ordersContext';
import NewOrder from '../components/NewOrder';
import ButtonStyles from '../components/ButtonStyles';
import InfoMessageStyles from './InfoMessageStyles';
import formatDate from '../utils/formatDate';
import OrderDetails from './OrderDetails';

const VIEWS = {
  ORDERS: 'ORDERS',
  NEW_ORDER: 'NEW_ORDER',
  ORDER_DETAILS: 'ORDER_DETAILS',
};

function Orders() {
  const [view, setView] = useState(VIEWS.ORDER);
  const [orderDetails, setOrderDetails] = useState(null);


  const renderOrderRow = (orders) =>
    orders.map((order, i) => (
      <TableRow key={i}>
        <TableData className="serialNo">{i + 1}</TableData>
        <TableData className="orderedAt">{formatDate(order.orderedAt)}</TableData>
        <TableData className="orderAmount">$ {(parseFloat(order.totalAmount)).toFixed(2)}</TableData>
        <TableData className="viewOrder">
        <ButtonStyles onClick={() => {
          setOrderDetails(order);
          setView(VIEWS.ORDER_DETAILS);
        }}>
                View
              </ButtonStyles>
        </TableData>
      </TableRow>
    ));

  return (
    <OrdersContext.Consumer>
      {({ orders, addOrder, addItemToOrder }) =>
        view === VIEWS.NEW_ORDER ? (
          <React.Fragment>
            <NewOrder
              onAddOrder={(order) => {
                addOrder(order);
                setView(VIEWS.ORDERS);
              }}
              totalOrders={orders.length}
            />
          </React.Fragment>
        ) : view === VIEWS.ORDER_DETAILS ? (
          <OrderDetails onGoBack={() => setView(VIEWS.ORDERS)} onAddItemToOrder={addItemToOrder} order={orderDetails} />
        ) : (
          <React.Fragment>
            {orders.length ? (<Table>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Ordered At</TableHead>
                <TableHead>Order Amount</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>

              {renderOrderRow(orders)}
            </Table>) : <InfoMessageStyles>No orders, please add new order</InfoMessageStyles>}
            <div>
              <br />
              <ButtonStyles onClick={() => setView(VIEWS.NEW_ORDER)}>
                Add New Order
              </ButtonStyles>
            </div>
          </React.Fragment>
        )
      }
    </OrdersContext.Consumer>
  );
}


export default Orders;
