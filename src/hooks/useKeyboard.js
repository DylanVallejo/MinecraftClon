import { useCallback, useState,useEffect } from "react"



function actionByKey(key){
    const keyActionMap = {
        KeyW: 'moveForward',
        KeyS: 'moveBackward',
        KeyA: 'moveLeft',
        KeyD: 'moveRight',
        Space: 'jump',
        Digit1:'dirt',
        Digit2:'grass',
        Digit3:'glass',
        Digit4:'wood',
        Digit5:'log',
        
        
        
    }
    return keyActionMap[key]
}

export const useKeyboard = () => {
    const [actions, setActions] = useState({
        moveForward: false,
        moveBackward: false,
        moveLeft:false,
        moveRight:false,
        jump: false,
        dirt:false,
        grass:false,
        glass:false,
        wood:false,
        log:false,
    })
    
    
    // setting actions on  true
    const handleKeyDown = useCallback((e) =>{
        // console.log(e)
        const action = actionByKey(e.code)
        if(actionByKey(e.code)){
            setActions((prev) => {
                return ({
                    ...prev,
                    [action]:true
                })
            })
        }
    },[])
    
    // setting ations on false
    
    const handleKeyUp = useCallback((e) =>{
        const action = actionByKey(e.code)
        if(actionByKey(e.code)){
            setActions((prev) => {
                return ({
                    ...prev,
                    [action]:false
                })
            })
        }
    },[])
    
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
        // document.addEventListener('keydown', handleKeyDown);
        // document.addEventListener('keydown', handleKeyDown);
        // document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.addEventListener('keydown', handleKeyDown);
            document.addEventListener('keyup', handleKeyUp);
            
        }
    }, [handleKeyDown,handleKeyUp])
    
    console.log('actions',actions)
    
    return actions
    
}