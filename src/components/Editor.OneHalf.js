import React from 'react'

import { Grid, Paper, Box, IconButton, TextField } from '@material-ui/core'
import { VolumeOff, Pause, VolumeUp, Mic, FlashAuto, GTranslate } from '@material-ui/icons'

export default function OneHalfEditor({ direction, phrase, setAttr }) {
  const directionReverse = direction === 'to' ? 'from' : 'to'
  const lang = 'EN'

  const sound = phrase[direction].sound

  const text = phrase[direction].text
  const setText = text => setAttr(phrase._id, direction, 'text', text)
  const textReverse = phrase[directionReverse].text

  const track = null

  return (
    <Paper component={Box} p={2}>
      <Grid container direction='column' spacing={1}>
        <Grid item container>
          {!sound && (
            <IconButton disabled>
              <VolumeOff />
            </IconButton>
          )}
          {sound && sound !== track && (
            <IconButton>
              <VolumeUp />
            </IconButton>
          )}
          {sound && sound === track && (
            <IconButton>
              <Pause />
            </IconButton>
          )}

          <IconButton color='default' disabled={!text} component={Box} ml='auto'>
            <Mic />
          </IconButton>
          <IconButton disabled={!text}>
            <FlashAuto />
          </IconButton>

          <IconButton disabled={!textReverse} component={Box} ml='auto'>
            <GTranslate />
          </IconButton>
        </Grid>

        <Grid item container direction='column'>
          <TextField
            style={{ width: '100%' }}
            label={lang.toUpperCase()}
            multiline
            rows='5'
            value={text}
            onChange={e => setText(e.target.value)}
            variant='outlined'
          />
        </Grid>
      </Grid>
    </Paper>
  )
}
