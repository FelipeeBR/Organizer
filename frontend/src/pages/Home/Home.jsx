import React from 'react';
import Tasks from '../../components/Tasks';
import Title from '../../components/Title';


const Home = () => {
  
  return (
    <div className='bg-gray-200 h-full overflow-y-auto'>
        <div>
          <Title text="Início" />
          <Tasks/>
        </div>
    </div>
  )
}

export default Home;