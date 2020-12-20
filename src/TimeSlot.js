import React, { useState, useEffect } from "react"
import firebase from "./firebase"
const db = firebase.firestore()
const TimeSlot = ({ time }) => {
  const [timeArr, setTimeArr] = useState([])
  const [selectedOption, setSelectedOption] = useState(null)
  console.log(time)
  const getData = async () => {
    const appRef = db.collection("appointment")
    try {
      const timeArray = []
      const appData = await appRef.where("date", "==", time).get()
      appData.forEach((doc) => {
        timeArray.push(doc.data())
      })
      const timeAt10AM = time + 36000
      const timeAt1PM = time + 46800
      const timeAt4PM = time + 57600
      console.log(timeArray)
      const times = [timeAt10AM, timeAt1PM, timeAt4PM]
      console.log(times)
      timeArray.forEach((item) => {
        if (
          item.appTime === timeAt10AM ||
          item.appTime === timeAt1PM ||
          item.appTime === timeAt4PM
        ) {
          const index = times.indexOf(item.appTime)
          times.splice(index, 1)
        }
      })
      console.log(times)
      const displayTimes = times.map((time) => {
        if (time === timeAt10AM) {
          return "10 AM"
        } else if (time === timeAt1PM) {
          return "1 PM"
        } else if (time === timeAt4PM) {
          return "4 PM"
        }
      })
      setTimeArr(displayTimes)

    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getData()
    // eslint-disable-next-line
  }, [time])

  const onSubmitHandler = (e) => {
    e.preventDefault()
    const data = {
      date: time,
      appTime: time + 3600,
      createdAt: Math.floor(Date.now() / 1000),
    }
    try {
      db.collection("appointment").doc().set(data)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="timeSlot">
      <form onSubmit={onSubmitHandler}>
        <h2>Available Times</h2>
        {timeArr.length > 0 ? (
          timeArr.map((item) => (
            <>
              <label>
                <input
                  type="radio"
                  value={item}
                  checked={selectedOption === item}
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
                {item}
              </label>
              <br/>
            </>
          ))
        ) : (
          <p>No time available</p>
        )}
      </form>
    </div>
  )
}

export default TimeSlot
