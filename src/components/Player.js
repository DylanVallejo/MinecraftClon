import { useFrame, useThree } from "@react-three/fiber"
import { useSphere } from "@react-three/cannon"
import { useRef,useEffect } from "react";
import { Vector3 } from "three";
import { useKeyboard } from "../hooks/useKeyboard";


const JUMP_FORCE = 4 
const SPEED = 4


export const Player = () => {
    
    const {moveBackward, moveForward, moveRight, moveLeft,jump} = useKeyboard();
    // console.log('action',Object.entries(actions).filter(([k,v]) => v))
    
    // we can add a camera 
    const {camera} = useThree();
    // const [ref] = useSphere(() => ({
    //     mass:1
    // })) 
    
    
    const [ref,api] = useSphere(()=> ({
        mass:1,
        type:'Dynamic',
        // we can move the startin gpositon whit the second value
        position: [0,1,0]
    }))
    
    
    // velocity will work similar
    const vel = useRef([0,0,0])
    

    useEffect(() => {
        api.velocity.subscribe((v)=> vel.current = v)
    }, [api.velocity])
    
    
    
    // defining a position for player
    const pos = useRef([0,0,10])
    
    // postion should follow th sphere bacuse of gravity
    
    //gluing the camera to the position reference
    useEffect(() => {
        //subscribe the position reference to sphere
        api.position.subscribe((p)=> pos.current = p)
    }, [api.position])
    
    
    // the hook will run in 
    // everey frame and attach the camera to the position 
    useFrame(() => {

        camera.position.copy(new Vector3(pos.current[0],pos.current[1],pos.current[2]))
        
        
        
        // moving in one direction 
        const direction  = new Vector3()
        
        // movement forn t and bakc 
        const  frontVector = new Vector3(
            0,
            0,
            (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)
        )
        
        // side directions
        const sideVector = new Vector3(
            (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
            0,
            0
        )
        
        
        direction
            .subVectors(frontVector,sideVector)
            .normalize()
            .multiplyScalar(SPEED)
            .applyEuler(camera.rotation)
        
        api.velocity.set(direction.x,vel.current[1],direction.z)
        
        // trigger movement in the sphere
        // api.velocity.set(0,1,0)
        
        if (jump && Math.abs(vel.current[1]) < 0.04) {
            // adding jump
			api.velocity.set(vel.current[0], JUMP_FORCE, vel.current[2])
		}
    })
    
    
    return(
        // atach ref
        <mesh ref={ref}>
            
        </mesh>
    )
    
}