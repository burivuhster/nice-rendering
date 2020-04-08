import React, { useState } from 'react'

import { Grid } from '@material-ui/core'

import dataPhrases from './data/phrases'

import Editor from './components/Editor'

export default () => {
  const [phrases, setPhrases] = useState(dataPhrases)
  const makeOnAddNextTo = i => () => {
    const newArr = [...phrases]
    newArr.splice(i + 1, 0, {
      from: { text: '', sound: '' },
      to: { text: '', sound: '' }
    })
    setPhrases(newArr)
  }
  const makeSetAttr = i => (lang, attr, value) => {
    const newArr = [...phrases]
    newArr[i][lang][attr] = value
    setPhrases(newArr)
  }
  const makeOnDelete = i => () => {
    const newArr = [...phrases]
    newArr.splice(i, 1)
    setPhrases(newArr)
  }

  return (
    <Grid container direction='column' spacing={2}>
      {phrases.map((phrase, i) => (
        <Grid key={i} item>
          <Editor
            phrase={phrase}
            onAddNextTo={makeOnAddNextTo(i)}
            setAttr={makeSetAttr(i)}
            onDelete={makeOnDelete(i)}
          />
        </Grid>
      ))}
    </Grid>
  )
}
