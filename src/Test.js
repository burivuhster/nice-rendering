import React, { useState } from 'react'

import { times } from 'lodash'

export default () => {
  const [arr, setArr] = useState(
    times(27).map(i => ({
      id: i,
      value: i * 5
    }))
  )

  const set = i => e => {
    const newArr = [...arr]
    newArr[i].value = e.target.value
    setArr(newArr)
  }

  return (
    <div>
      {arr.map((el, i) => (
        <div key={i}>
          <div>{el.value}</div>
          <br />
          <MyDiv>
            <div>
              <input value={el.value} onChange={set(i)} />
            </div>
          </MyDiv>
        </div>
      ))}
    </div>
  )
}

const MyDiv = ({ children }) => <div>{children}</div>
