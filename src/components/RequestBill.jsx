import React, { useState } from 'react';
import styled from 'styled-components';
import ButtonStyles from './ButtonStyles';
import { InputStyles } from './InputStyles';
import { Table, TableRow, TableHead, TableData } from './TableStyles';

function RequestBill({ onGoBack, order }) {
  const [noOfPoeple, setNoOfPeople] = useState(null);
  const handleNoOfPeopleChange = (e) => {
    setNoOfPeople(e.target.value);
  };
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
      <div>Total Amount: DKK {order.totalAmount.toFixed(2)}</div>
      <br />

      {order.totalAmount > 0 && (
        <div>
          <BillSplit>Would you like to divide bill?</BillSplit>
          <NumberOfPeopleInput
            placeholder="# of people"
            value={!isNaN(noOfPoeple) ? noOfPoeple : ''}
            onChange={handleNoOfPeopleChange}
          />
          {!isNaN(noOfPoeple) && noOfPoeple > 1
            ? `DKKDKK{(order.totalAmount / parseInt(noOfPoeple)).toFixed(2)}/person`
            : ''}
        </div>
      )}
      <br />

      <div>
        <ButtonStyles onClick={handleBackClick}>Go Back to Order</ButtonStyles>
      </div>
    </div>
  );
}
const NumberOfPeopleInput = styled(InputStyles)`
  width: 100px;
`;

const BillSplit = styled.span`
  padding-right: 10px;
`
export default RequestBill;
