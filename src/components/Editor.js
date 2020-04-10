import React, { useCallback } from 'react'

import { Grid, Box, IconButton } from '@material-ui/core'
import { Delete, Add } from '@material-ui/icons'

import OneHalfEditor from './Editor.OneHalf'

// Добавил React.memo - это мемоизация результата вызова Editor для одинаковых параметров
// Без нее реакт для функциональных компонентов (также как и для компонентов-классов) вызывает рендер снова, независимо от того, поменялись ли пропсы
// React.memo - это для функциональных компонентов как React.PureComponent для компонентов-классов)
export default React.memo(function Editor({ phrase, onAddNextTo, setAttr, onDelete }) {
  const onDeleteClick = useCallback(() => { onDelete(phrase._id) }, [onDelete, phrase]);
  const onAddNextClick = useCallback(() => { onAddNextTo(phrase._id) }, [onAddNextTo, phrase]);

  return (
    <div>
      <Grid container direction='row-reverse'>
        <IconButton onClick={onDeleteClick} color='secondary'>
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
        <IconButton onClick={onAddNextClick} color='primary' style={{ position: 'absolute' }}>
          <Add />
        </IconButton>
      </Box>
    </div>
  )
})
