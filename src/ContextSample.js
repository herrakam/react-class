import React, {createContext, useContext, useState} from 'react'

const MyContext = createContext('defaultValue')

function Child(){
    const text = useContext(MyContext)
    return(
        <div>안녕하세요? {text}</div>
    )
}

function Parent({text}){
    return (
        <Child text = {text}></Child>
    )
}

function GrandParent({text}){
    return(
        <Parent text={text}></Parent>
    )
}

function ContextSample(){
    const [value, setValue] = useState(true)
    return(
        <MyContext.Provider value={value ? 'good':'bad'}>
            <GrandParent text='good'></GrandParent>
            <button onClick={()=>setValue(!value)}>click me</button>
        </MyContext.Provider>
        
    )
}

export default ContextSample;