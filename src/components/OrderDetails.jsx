import React, { useState } from 'react';
import styled from 'styled-components';
import formatDate from '../utils/formatDate';
import ButtonStyles from './ButtonStyles';
import { Table, TableRow, TableHead, TableData } from './TableStyles';

function OrderDetails({ onGoBack, order }) {

  const handleBackClick = () => {
    onGoBack();
  };

  const renderItemsRows = () =>
    order.items.map((item, i) => (
      <TableRow>
        <TableData>{i + 1}</TableData>
        <TableData>{item.name}</TableData>
        <TableData>DKK {item.price.toFixed(2)}</TableData>
        <TableData>{item.qty}</TableData>
      </TableRow>
    ));
  return (
    <div>
      <Table>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Beer</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Qty</TableHead>
        </TableRow>
        {renderItemsRows()}
      </Table>

      <br />
      <div>Order Date: {formatDate(order.orderedAt)}</div>
      <br />
      <div>Total Amount: DKK {order.totalAmount.toFixed(2)}</div>
      <br />

      <div>
        <ButtonStyles onClick={handleBackClick}>Go Back to Order</ButtonStyles>
      </div>
    </div>
  );
}

export default OrderDetails;
