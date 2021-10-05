import React, { useState } from 'react';
import styled from 'styled-components';
import { beersList } from '../constants/data';
import ButtonStyles from './ButtonStyles';
import RequestBill from './RequestBill';
import { Table, TableRow, TableHead, TableData } from './TableStyles';

const VIEWS = {
  NEW_ORDER: 'NEW_ORDER',
  REQUEST_BILL: 'REQUEST_BILL',
};

function NewOrder({ onAddOrder }) {
  const [view, setView] = useState([null]);
  const [items, setItems] = useState([null]);

  const handleItemAdd = () => {
    setItems([...items, null]);
  };

  const handleBeerChange = (i, beerName) => {
    debugger;
    const newItems = items.slice();
    const beer = beersList.find((_beer) => _beer.name === beerName);

    newItems[i] = { ...beer, qty: newItems[i] ? parseInt(newItems[i].qty) : 1 };
    setItems(newItems);
  };
  const handleQtyChange = (i, qty) => {
    const newItems = items.slice();
    const beer = newItems[i];
    if (beer) {
      newItems[i] = { ...beer, qty: parseInt(qty) };
      setItems(newItems);
    }
  };

  const getCurrentOrder = () => {
    const _orderedAt = new Date();
    const _items = items.filter((item) => item);
    const _totalAmount = _items.reduce(
      (amount, order) => order.qty * order.price + amount,
      0
    );

    return {
      orderedAt: _orderedAt,
      items: _items,
      totalAmount: _totalAmount,
    };

  }
  const handleOrderSubmit = () => {
    onAddOrder(getCurrentOrder());
  };

  const handleRequestBillClick = () => {
    setView(VIEWS.REQUEST_BILL);
  };


  const handleRequestBillBack = () => {
    setView(VIEWS.NEW_ORDER);
  };

  const renderBeerRow = () =>
    items.map((beerName, i) => (
      <TableRow key={i}>
        <TableData className="serialNo">{i + 1}</TableData>
        <TableData className="item">
          <SelectInput
            onChange={(e) => handleBeerChange(i, e.target.value)}
            value={items[i] ? items[i].name : ''}
          >
            {beerName === null && (
              <Option value="" disabled>
                --Select Beer Type--
              </Option>
            )}
            {beersList.map((beer, j) => (
              <Option key={j} value={beer.name}>
                {beer.name}
              </Option>
            ))}
          </SelectInput>
        </TableData>
        <TableData className="qty">
          <QtyInput
          disabled={!items[i]}
            onChange={(e) => handleQtyChange(i, e.target.value)}
            value={items[i] && !isNaN(items[i].qty) ? items[i].qty : ''}
          />
        </TableData>
      </TableRow>
    ));

  return view === VIEWS.REQUEST_BILL ? (
    <RequestBill onGoBack={handleRequestBillBack} order={getCurrentOrder()} />
  ) : (
    <div>
      <Table>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Beer Type</TableHead>
          <TableHead>Qty</TableHead>
        </TableRow>

        {renderBeerRow()}
      </Table>
      <br />
      <div>
        <ButtonStyles onClick={handleItemAdd} disabled={items.includes(null)}>
          Add Item
        </ButtonStyles>
      </div>
      <br />

      <div>
        <ButtonStyles
          onClick={handleOrderSubmit}
          disabled={items.every((item) => item === null)}
        >
          Submit Order
        </ButtonStyles>

        <ButtonStyles onClick={handleRequestBillClick}>Request Bill</ButtonStyles>
      </div>
    </div>
  );
}

export const SelectInput = styled.select``;
export const Option = styled.option``;

export const QtyInput = styled.input`
  text-align: center;
  width: 35px;
`;

export default NewOrder;
