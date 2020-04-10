import React, { useCallback, useMemo } from 'react'

import { Grid, Box, IconButton } from '@material-ui/core'
import { Delete, Add } from '@material-ui/icons'

import OneHalfEditor from './Editor.OneHalf'

// Добавил React.memo - это мемоизация результата вызова Editor для одинаковых параметров
// Без нее реакт для функциональных компонентов (также как и для компонентов-классов) вызывает рендер снова, независимо от того, поменялись ли пропсы
// React.memo - это для функциональных компонентов как React.PureComponent для компонентов-классов)
export default React.memo(function Editor({ phrase, onAddNextTo, setAttr, onDelete }) {
  const onDeleteClick = useCallback(() => {
    onDelete(phrase._id)
  }, [onDelete])
  const onAddNextClick = useCallback(() => {
    onAddNextTo(phrase._id)
  }, [onAddNextTo])

  // Увидел в профайлере, что перерисовка иконок много времени занимает, обернул их тоже в useMemo -
  const topBar = useMemo(
    () => (
      <Grid container direction='row-reverse'>
        <IconButton onClick={onDeleteClick} color='secondary'>
          <Delete />
        </IconButton>
      </Grid>
    ),
    [onDeleteClick]
  )

  const bottomBar = useMemo(
    () => (
      <Box m={1}>
        <IconButton onClick={onAddNextClick} color='primary' style={{ position: 'absolute' }}>
          <Add />
        </IconButton>
      </Box>
    ),
    [onAddNextClick]
  )

  return (
    <div>
      {topBar}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <OneHalfEditor
            direction='from'
            phraseId={phrase._id}
            phraseHalf={phrase.from}
            setAttr={setAttr}
            translationEnabled={!!phrase.to.text}
          />
        </Grid>
        <Grid item xs={6}>
          <OneHalfEditor
            direction='to'
            phraseId={phrase._id}
            phraseHalf={phrase.to}
            setAttr={setAttr}
            translationEnabled={!!phrase.from.text}
          />
        </Grid>
      </Grid>
      {bottomBar}
    </div>
  )
})
