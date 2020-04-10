import React from 'react'

import { Grid, Paper, Box, IconButton, TextField } from '@material-ui/core'
import { VolumeOff, Pause, VolumeUp, Mic, FlashAuto, GTranslate } from '@material-ui/icons'

// Чтобы избежать перерисовки иконок каждый раз, когда в инпут что-то вводят - вынес тулбар в отдельный компонент и обернул в HOC React.memo
// Вынеси в отдельный файл если считаешь нужным
const EditorToolbar = React.memo(function({ sound, track, micEnabled, translationEnabled }) {
  return (
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

      <IconButton color='default' disabled={!micEnabled} component={Box} ml='auto'>
        <Mic />
      </IconButton>
      <IconButton disabled={!micEnabled}> {/* тут не знаю что за логика, возможно отдельным параметром рулить надо */}
        <FlashAuto />
      </IconButton>

      <IconButton disabled={!translationEnabled} component={Box} ml='auto'>
        <GTranslate />
      </IconButton>
    </Grid>
  )
})

// Чтобы избежать перерисовки одной половины при редактировании другой - порефакторил, чтобы сюда пропсами приходили только необходимые данные, и пропсы не менялись при редактировании другой половины (по крайней мере не на каждое нажатие клавиатуры)
export default React.memo(function OneHalfEditor({
  phraseId,
  lang = 'en',
  direction,
  phraseHalf,
  translationEnabled,
  setAttr
}) {
  const sound = phraseHalf.sound

  const text = phraseHalf.text
  const setText = text => setAttr(phraseId, direction, 'text', text)

  const track = null

  return (
    <Paper component={Box} p={2}>
      <Grid container direction='column' spacing={1}>
        <EditorToolbar
          sound={sound}
          track={track}
          micEnabled={!!text}
          translationEnabled={translationEnabled}
        />

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
})
