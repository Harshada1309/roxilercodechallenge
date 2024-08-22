import './App.css';
import React, { useState } from 'react';
import { Layout, Menu, Select } from 'antd';
import Transaction from './components/Transaction.jsx';
import Stats from './components/Stats.jsx';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';


const { Header, Content, Footer } = Layout;


const navItems = [
  {
    key: 1,
    label: ( <NavLink to="/">Transaction</NavLink> )
  },
  {
    key: 2,
    label: ( <NavLink to="/stats">Stats</NavLink> )
  }
];
const options = [
  "All Months",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];


const App = () => {
  let [month, setMonth] = useState(3);

  const handleMonthChange = (value) => {
    setMonth(parseInt(value));
  };

  return (
    <BrowserRouter>
      <Layout>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            
          }}
        >
          <h1 style={{ color: "white"}}>Dashboard</h1>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            items={navItems}
            style={{
              flex: 1,
              padding: "0 60px",
              color: ''
            }}
          />
          <Select
            size="large"
            defaultValue={options[month]}
            onChange={handleMonthChange}
            style={{
              width: 200
            }}
            options={options.map((text, i) => {
              return {
                value: i,
                label: text
              };
            })}
          />
        </Header>
        <Content
          style={{
            padding: "0px 48px",
            backgroundColor: "#E6E6FA",    //white
            minHeight: 600
          }}
        >
          <Routes>
            <Route path="/" element={
              <Transaction month={month} monthText={options[month]} />
            } />
            <Route path="/stats" element={
              <Stats month={month} monthText={options[month]} />
            } />
          </Routes>

        </Content>
        <Footer
          style={{
            textAlign: "center",
            backgroundColor: "black",
            color:"white"
          }}
        >
          Created by <strong>Harshada Karbele</strong>
        </Footer>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
