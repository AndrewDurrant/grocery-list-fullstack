import React from 'react';
import CategoryList from '../CategoryList/CategoryList';


function Sidebar(props) {
  return (
    <section>
      <h3>This is my Sidebar</h3>
      <CategoryList {...props}/>
    </section>
  );
}

export default Sidebar;