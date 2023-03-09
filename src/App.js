import { Physics } from '@react-three/cannon';
import { Sky } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Ground } from './components/Ground';
import { Player } from './components/Player';
import { FPV } from './components/FPV';
import { Cubes } from './components/Cubes';
import { TextureSelector } from './components/TextureSelector';
import { Menu } from './components/Menu';
function App() {
  return (
    <>
      {/* <div>Outside Canvas</div> */}
      {/* canvas form react tree fiber */}
      {/* canbvas can't handle divss */}
      <Canvas>
        {/* sky  */}
        <Sky sunPosition={[100,100,20]}/>
        
        {/* adding ligth  */}
        <ambientLight intensity={0.5}/>
        
        {/* ADDIng First person view */}
        
        <FPV/>
        
        {/* adding Physics */}
        <Physics>
          <Player/> 
          {/* adding cubes */}
          <Cubes/>
          {/* addidng ground */}
          <Ground/>
          
        </Physics>
        
      </Canvas>
      
      <div className='absolute centered cursor'>
        +
      </div>
      <TextureSelector/>
      <Menu/>
    </>
  );
}

export default App;
