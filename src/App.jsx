import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AddItem from './components/AddItem';
import Items from './components/Items';
import Home from './components/Home';
import Entry from './components/Entry';
import Page404 from './components/Page404';
import PrivateComponenet from './components/PrivateComponenet';

const App = () => {

  return (
      <Routes>
        <Route path='/' element={<Entry />} />
        <Route path='*' element={<Page404 />} />

          <Route path='/home' element={
            <PrivateComponenet>
              <Home />
            </PrivateComponenet>
          }/>
          <Route path='/add' element={
            <PrivateComponenet>
              <AddItem />
            </PrivateComponenet>
          } />
          <Route path='/items' element={
            <PrivateComponenet>
              <Items />
            </PrivateComponenet>
          } />
         
      </Routes>
  );
}

export default App;
