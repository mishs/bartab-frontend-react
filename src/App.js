import React, { useState } from 'react';
import styled from 'styled-components';
import './App.css';
import PriceList from './components/PriceList';
import Orders from './components/Orders';
import OrdersContext from './contexts/ordersContext';

const TABS = {
  BEERS_PRICE_LIST: 'BEERS_PRICE_LIST',
  ORDERS: 'ORDERS',
};

const rawOrdersState = localStorage.getItem('ORDERS');
let ordersState = [];
if (rawOrdersState) {
  try {
    ordersState = JSON.parse(rawOrdersState);
  } catch (error) {}
}

function App() {
  const [activeTab, setActiveTab] = useState(TABS.ORDERS); // TABS.BEARS_PRICE_LIST, TABS.NEW_ROUND_OF_DRINKS
  const [orders, setOrders] = useState(ordersState);

  const addOrder = (order) => {
    const newOrders = [...orders, order];
    setOrders(newOrders);

    localStorage.setItem('ORDERS', JSON.stringify(newOrders));
  };

  const renderTabButtons = () => (
    <React.Fragment>
      <TabsButton
        className={activeTab === TABS.BEERS_PRICE_LIST && 'active'}
        onClick={() => setActiveTab(TABS.BEERS_PRICE_LIST)}
      >
        Beers Price List
      </TabsButton>
      <TabsButton
        className={activeTab === TABS.ORDERS && 'active'}
        onClick={() => setActiveTab(TABS.ORDERS)}
      >
        Orders
      </TabsButton>
    </React.Fragment>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case TABS.BEERS_PRICE_LIST:
        return <PriceList />;

      case TABS.ORDERS:
        return <Orders />;

      default:
        return null;
    }
  };
  return (
    <div className="App">
      <OrdersContext.Provider
        value={{
          orders,
          addOrder,
        }}
      >
        <TabsWrapper>
          <TabsHeader>{renderTabButtons()}</TabsHeader>

          <TabsContent>{renderTabContent()}</TabsContent>
        </TabsWrapper>
      </OrdersContext.Provider>
    </div>
  );
}

const TabsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 40vw;
  height: 75vh;
  margin: auto;
`;
const TabsHeader = styled.div`
  display: flex;
  margin-bottom: 14px;
`;
const TabsButton = styled.div`
  background-color: inherit;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0.5em 0.75em;
  transition: 0.3s;
  border: 1px solid #c9d1d9;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  &:hover {
    color: #999;
  }
  &.active {
    color: #eee !important;
    font-weight: bold;
  }
`;
const TabsContent = styled.div`
  border-top: none;
`;

export default App;
