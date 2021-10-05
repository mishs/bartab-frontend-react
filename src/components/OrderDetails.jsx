import React, { useState } from 'react';
import styled from 'styled-components';
import formatDate from '../utils/formatDate';
import ButtonStyles from './ButtonStyles';
// import { Input } from './InputStyles';
import { Table, TableRow, TableHead, TableData } from './TableStyles';
import { beersList } from '../constants/data';
function OrderDetails({ onGoBack, order, onAddItemToOrder }) {

  const [newItem, setNewItem] = useState(null);
  const [addingItem, setAddingItem] = useState(false);

  const handleBackClick = () => {
    onGoBack();
  };

  const handleItemAdd = () => {
    setAddingItem(true);
  }
  
  const handleItemSave = () => {
    debugger;
    const beer = getBeersNotInUse().find(item => item.name === newItem.name);
    onAddItemToOrder(order.orderId,{
      ...beer,
      qty: newItem.qty
    });
    setNewItem(null);
    setAddingItem(false);
  }
  
  const handleBeerChange = (beerName) => {
    const item = {...newItem};
    item.name = beerName;
    if(!item.qty) item.qty = 1;
    setNewItem(item);
  }
  const handleQtyChange = (qty) => {
    const item = {...newItem};
    item.qty =  parseInt(qty);
    setNewItem(item);
  }

  
  const getBeersNotInUse = (currentBeerName) => {
    return beersList.filter(beer => {
      const beerExists = order.items.find(item => item && item.name === beer.name);
      if(!beerExists || beer.name === currentBeerName) {
        return true;
      }
      return false;
    })
  }
  

  const renderItemsRows = () =>
    order.items.map((item, i) => (
      <TableRow key={i}>
        <TableData>{i + 1}</TableData>
        <TableData>{item.name}</TableData>
        <TableData>${item.price.toFixed(2)}</TableData>
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
      <div>Total Amount: ${order.totalAmount.toFixed(2)}</div>
      <br />
      { addingItem && (<React.Fragment>
      <Table>
       <TableRow>
          <TableHead>Beer</TableHead>
          <TableHead>Qty</TableHead>
        </TableRow>
        <TableRow>
          <TableData className="item">
            <select
              onChange={(e) => handleBeerChange(e.target.value)}
              value={newItem ? newItem.name : ''}
            >
                <option value="" disabled>
                  --Select Beer Type--
                </option>
              {getBeersNotInUse(newItem && newItem.name).map((beer, j) => (
                <option key={j} value={beer.name}>
                  {beer.name}
                </option>
              ))}
            </select>
          </TableData>
          <TableData className="qty">
            <QtyInput
            disabled={!newItem}
              onChange={(e) => handleQtyChange(e.target.value)}
              value={newItem && !isNaN(newItem.qty) ? newItem.qty : ''}
            />
          </TableData>
        </TableRow>
      </Table>
      <ButtonStyles onClick={handleItemSave}>
          Save Item
      </ButtonStyles>
      </React.Fragment>)}

      {!addingItem && getBeersNotInUse().length > 0 && <div>
        <ButtonStyles onClick={handleItemAdd}>
          Add Item
        </ButtonStyles>
      </div>}

      <br />
      <div>
        <ButtonStyles onClick={handleBackClick}>Go Back to Order</ButtonStyles>
      </div>
    </div>
  );
}


export const QtyInput = styled.input`
  text-align: center;
  width: 35px;
`;

export default OrderDetails;
