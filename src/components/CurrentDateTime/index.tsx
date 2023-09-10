import  React, { useState , useEffect } from 'react'

export const DateTime = () => {

    var [date,setDate] = useState(new Date());
    
    useEffect(() => {
        var timer = setInterval(()=>setDate(new Date()), 1000 )
        return function cleanup() {
            clearInterval(timer)
        }
    
    });

    return(
        <>
            <p style={{display: "inline-block", color: "white"}}> Date : {date.toLocaleDateString()}</p>
            <p style={{display: "inline-block", color: "white"}}> Time : {date.toLocaleTimeString()}</p>

        </>
    )
}

export default DateTime