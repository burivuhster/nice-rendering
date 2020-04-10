import React, { useState, useCallback } from 'react'

import { Grid } from '@material-ui/core'

import dataPhrases from './data/phrases'

import Editor from './components/Editor'

export default function Phrases() { // добавил название функции чтобы удобнее было смотреть в профайлере
  const [phrases, setPhrases] = useState(dataPhrases)

  function getMaxId(phrases) { // при добавлении новой фразы нужно генерить какой-то айдишник – я беру следующее число от максимального. Эта функа ищет максимальный айдишник в текущем массиве фраз
    return phrases.map(p => p._id).reduce((max, id) => (id > max ? id : max))
  }

  // Обернул в useCallback, чтобы референс на функцию onAddNextTo был постоянным между рендерами, чтобы можно было оптимизировать Editor
  // Поменял везде работу с индексами массива на айдишники - чтобы key у фраз оставались те же при изменении массива (добавлении/удалении)
  // Заменил формат вызова setPhrase на передачу функции, чтобы получать предыдущий массив oldPhrases параметром, вместо замыкания
  // С замыканием были проблемы, если не добавлять phrases в deps useCallback, а если добавлять - колбек меняется при каждом изменении phrases, то есть считай при каждом рендере
  const onAddNextTo = useCallback(id => {
    setPhrases(oldPhrases => {
      const newArr = [...oldPhrases]
      const index = newArr.findIndex(phrase => phrase._id === id);
      newArr.splice(index + 1, 0, {
        _id: getMaxId(oldPhrases) + 1,
        from: { text: '', sound: '' },
        to: { text: '', sound: '' }
      })

      return newArr
    })
  }, [])

  // Тут поправил иммутабельность фраз
  // Также поменял вызов setPhrases
  // Сделал поиск элемента по айдишнику вместо индекса
  const onSetAttr = useCallback((id, lang, attr, value) => {
    setPhrases(oldPhrases =>
      oldPhrases.map(phrase => {
        if (phrase._id !== id) {
          return phrase
        }

        return {
          ...phrase,
          [lang]: {
            ...phrase[lang],
            [attr]: value
          }
        }
      })
    )
  }, [])

  const onDelete = useCallback(id => {
    setPhrases(oldPhrases => oldPhrases.filter(phrase => phrase._id !== id))
  }, [])

  return (
    <Grid container direction='column' spacing={2}>
      {phrases.map((phrase, i) => (
        <Grid key={phrase._id} item> {/*заменил key с индекса на айдишник - чтобы избежать перерендера всех элементов при добавлении/удалении элементов*/}
          <Editor
            phrase={phrase}
            onAddNextTo={onAddNextTo}
            setAttr={onSetAttr}
            onDelete={onDelete}
          />
        </Grid>
      ))}
    </Grid>
  )
}
