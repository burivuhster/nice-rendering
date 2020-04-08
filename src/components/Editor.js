import React from 'react'

import { Grid, Box, IconButton } from '@material-ui/core'
import { Delete, Add } from '@material-ui/icons'

import OneHalfEditor from './Editor.OneHalf'

export default ({ phrase, onAddNextTo, setAttr, onDelete }) => {
  return (
    <div>
      <Grid container direction='row-reverse'>
        <IconButton onClick={onDelete} color='secondary'>
          <Delete />
        </IconButton>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <OneHalfEditor direction='from' phrase={phrase} setAttr={setAttr} />
        </Grid>
        <Grid item xs={6}>
          <OneHalfEditor direction='to' phrase={phrase} setAttr={setAttr} />
        </Grid>
      </Grid>
      <Box m={1}>
        <IconButton onClick={onAddNextTo} color='primary' style={{ position: 'absolute' }}>
          <Add />
        </IconButton>
      </Box>
    </div>
  )
}
