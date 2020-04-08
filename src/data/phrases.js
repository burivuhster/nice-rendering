import {times} from 'lodash'

const COUNT = 30

export default times(COUNT).map(i => ({
  _id: i,
  from: {
    text: `from text ${i}`,
    sound: null
  },
  to: {
    text: `to text ${i}`,
    sound: null
  }
}))