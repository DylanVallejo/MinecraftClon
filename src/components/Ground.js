// importing hook from canon 
import {usePlane} from '@react-three/cannon'
import { NearestFilter, RepeatWrapping } from 'three';
import { groundTexture } from '../images/textures';
export const  Ground = () => {
    // give us a plane and the reference fgo first
    const [ref] = usePlane (() => ({
        // ROTATING THE IMG CALCULATING THE HALF OF PI
        rotation: [ -Math.PI / 2 ,0,0], position: [0,0,0]
    }));
    
    // making th eimage repeat and cover not stretchuing
    groundTexture.magFilter = NearestFilter
    groundTexture.wrapS = RepeatWrapping
    groundTexture.wrapT = RepeatWrapping
    // size img
    groundTexture.repeat.set(100,100)
    return(
        <mesh ref={ref}>
            <planeBufferGeometry attach='geometry' args={[100,100]} />
            {/* defining a texture for ground or color  */}
            <meshStandardMaterial attach='material' map={groundTexture} />
        </mesh>
    )
} 