import React, { useState, useEffect } from "react"
import "./App.css"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import TimeSlot from "./TimeSlot"
import moment from "moment"

function App() {
  const [value, onChange] = useState(new Date())
  const [time, setTime] = useState(null)
  useEffect(() => {
    const timeConverted = moment(value).unix()
    setTime(timeConverted)
  }, [value])

  return (
    <div className="App">
      <Calendar onChange={onChange} value={value} />
      <TimeSlot time={time} />
    </div>
  )
}

export default App
