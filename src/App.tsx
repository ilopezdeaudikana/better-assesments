import React from 'react';
import logo from './logo.svg';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Pairs } from './pairs/Pairs';
import { Posts } from './posts/Posts';

import './App.css';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 5rem;
  color: #444;
`;

function App() {
  return (
      <Router>
        <div data-testid='App' className='App'>
          <header className='App-header'>
            <img src={logo} className="App-logo" alt="logo" />
            <nav>
              <ul>
                <li>
                  <Link to='/'>Pairs</Link>
                </li>
                <li>
                  <Link to='/posts'>Posts</Link>
                </li>
              </ul>
            </nav>
          </header>
          <Wrapper>
            <Routes>
              <Route path='/' element={<Pairs/>} />
              <Route path='/posts' element={<Posts/>} />
              {/* <Route element={Four04Page} />*/}
            </Routes>
          </Wrapper>
        </div>
      </Router>
  );
}

export default App;
