import React from 'react'
import Clock from 'react-live-clock';

const TodoDate = () => {

  return (
  <div>
    <p style={{fontSize: "1rem", color:"purple",fontWeight:"bold"}}>
     <Clock format={'YYYY 년 MM 월 DD 일'} ticking={false} timezone={"KR/Pacific"} />
    </p>
  </div>
  )
}

export default TodoDate