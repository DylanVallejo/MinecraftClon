import { useFrame, useThree } from "@react-three/fiber"
import { useSphere } from "@react-three/cannon"
import { useRef,useEffect } from "react";
import { Vector3 } from "three";
import { useKeyboard } from "../hooks/useKeyboard";
export const Player = () => {
    
    const actions = useKeyboard();
    console.log('action',Object.entries(actions).filter(([k,v]) => v))
    
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
        
        // trigger movement in the sphere
        api.velocity.set(0,1,0)
    })
    
    
    return(
        // atach ref
        <mesh ref={ref}>
            
        </mesh>
    )
    
}