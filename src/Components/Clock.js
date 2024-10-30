import React, { useState, useEffect } from 'react'

const Clock = () => {
    const [currentTime, setCurrentTime] = useState(new Date())

useEffect(() => {
    const timerId = setInterval(() => {
        setCurrentTime(new Date());
    }, 1000)

    return () =>
        clearInterval(timerId)
}, [])

return(
        <span>{currentTime.toLocaleString()}</span>
)
}
export default Clock;