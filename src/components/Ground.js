// importing hook from canon 
import {usePlane} from '@react-three/cannon'
import { groundTexture } from '../images/textures';
import { useStore } from '../hooks/useStore';

export const  Ground = () => {
    // give us a plane and the reference fgo first
    const [ref] = usePlane (() => ({
        // ROTATING THE IMG CALCULATING THE HALF OF PI
        rotation: [ -Math.PI / 2 ,0,0], position: [0,-0.5,0]
    }));
    
    
    // addind cube when clicking 
    const [addCube] = useStore((state)=>[state.addCube]);
    
    // size img
    groundTexture.repeat.set(100,100)
    
    
    return(
        <mesh
            onClick={(e) => {
                    e.stopPropagation()
                    const [x,y,z] =Object.values(e.point).map(val => Math.ceil(val));
                    addCube(x, y, z)
                }
            }
            ref={ref}
        >
            <planeBufferGeometry attach='geometry' args={[100,100]} />
            {/* defining a texture for ground or color  */}
            <meshStandardMaterial attach='material' map={groundTexture} />
        </mesh>
    )
} 