import TaskList from '../TaskList'
import Footer from '../Footer'
import NewTaskForm from '../NewTaskForm'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import React, { useState } from 'react'

import { v4 as uuidv4 } from 'uuid'

function toggleProperty(arr, id, propName) {
  const idx = arr.findIndex((el) => el.id === id)

  const oldItem = arr[idx]
  let comp
  let cond = 'view'

  if (oldItem.condition === 'view' && oldItem.completed === false) cond = 'editing'

  if (oldItem.condition === 'completed' && oldItem.completed === true && propName === 'editing') {
    cond = 'editing'
    comp = true
  }

  if (
    (oldItem.condition === 'view' && oldItem.completed === false && propName === 'completed') ||
    (oldItem.condition === 'editing' && oldItem.completed === true)
  ) {
    cond = 'completed'
    comp = true
  }

  const newItem = {
    ...oldItem,
    condition: cond,
    completed: comp || false,
  }

  return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
}

function taskVisibilityСondition(array, parameter, todoData) {
  return array.map((item, index) => {
    const itemObj = { ...todoData[index] }
    itemObj.visibility = null

    if (itemObj.condition === parameter) {
      itemObj.visibility = 'hidden'
    }
    return itemObj
  })
}

function App() {
  const [todoData, setTodoData] = useState([])

  const toggleStateTimer = (id, value) => {
    setTodoData((prev) => {
      const idx = prev.findIndex((el) => el.id === id)

      const itemObj = { ...prev[idx] }

      itemObj.timerOn = value

      const newArray = [...prev.slice(0, idx), itemObj, ...prev.slice(idx + 1)]

      return newArray
    })
  }

  const hiddenTask = (parameter) => {
    let newArray = todoData.map((item, index) => {
      const itemObj = { ...todoData[index] }
      itemObj.visibility = null
      return itemObj
    })

    if (parameter === 'Active') {
      newArray = taskVisibilityСondition(newArray, 'completed', todoData)
    } else if (parameter === 'Completed') {
      newArray = taskVisibilityСondition(newArray, 'view', todoData)
    }

    setTodoData(newArray)
  }

  const onCompletedTask = (id) => {
    hiddenTask('All')

    toggleStateTimer(id, false)
    setTodoData((prev) => {
      const newArray = toggleProperty(prev, id, 'completed')

      return newArray
    })
  }

  const onEditingTask = (id) => {
    setTodoData((prev) => {
      const newArray = toggleProperty(prev, id, 'editing')

      return newArray
    })
  }

  const editingTask = (id, text) => {
    setTodoData((prev) => {
      const idx = prev.findIndex((el) => el.id === id)

      const oldItem = prev[idx]
      oldItem.label = text

      const newArray = [...prev.slice(0, idx), oldItem, ...prev.slice(idx + 1)]

      return newArray
    })

    onEditingTask(id)
  }

  const deleteTask = (id) => {
    toggleStateTimer(id, false)
    setTodoData((prev) => {
      const newArray = prev.filter((el) => el.id !== id)
      return newArray
    })
  }

  const updateTimeCreate = () => {
    setInterval(() => {
      setTodoData((prev) => {
        const newArray = prev.map((item, index) => {
          const itemObj = { ...prev[index] }

          itemObj.timeInterval = formatDistanceToNow(itemObj.timeCreate, {
            includeSeconds: true,
            addSuffix: true,
          })
          return itemObj
        })

        return newArray
      })
    }, 5000)
  }

  const createTodoItem = (label, timerTime) => ({
    label,
    timerTime,
    timerOn: true,
    condition: 'view',
    visibility: null,
    completed: false,
    id: uuidv4(),
    timeCreate: Date.now(),
    timeInterval: updateTimeCreate(),
  })

  const updateTimerTime = (id) => {
    const timer = setInterval(() => {
      setTodoData((prev) => {
        const idx = prev.findIndex((el) => el.id === id)

        const itemObj = { ...prev[idx] }
        if (itemObj.timerTime) {
          itemObj.timerTime -= 1

          const newArray = [...prev.slice(0, idx), itemObj, ...prev.slice(idx + 1)]
          if (!itemObj.timerOn) {
            clearInterval(timer)
          }
          return newArray
        }
        clearInterval(timer)
        return prev
      })
    }, 1000)
  }

  const addItem = (text, timerTime) => {
    hiddenTask('All')

    const newItem = createTodoItem(text, timerTime)
    setTodoData((prev) => [...prev, newItem])
    updateTimerTime(newItem.id)
  }

  const clearCompletedTasks = () => {
    todoData.forEach((el) => {
      if (el.condition === 'completed') {
        deleteTask(el.id)
      }
    })
  }

  const stopTimer = (id) => {
    toggleStateTimer(id, false)
  }

  const startTimer = (id) => {
    toggleStateTimer(id, true)
    updateTimerTime(id)
  }

  const countTasks = todoData.length - todoData.filter((el) => el.completed === true).length
  return (
    <section className="main">
      <header className="header" id="header">
        <h1>To do List</h1>
        <NewTaskForm addItem={addItem} />
      </header>
      <TaskList
        todo={todoData}
        deletedTask={deleteTask}
        addItem={addItem}
        onCompletedTask={onCompletedTask}
        onEditingTask={onEditingTask}
        editingTask={editingTask}
        stopTimer={stopTimer}
        startTimer={startTimer}
      />
      <Footer countTasks={countTasks} clearCompletedTasks={clearCompletedTasks} hiddenTask={hiddenTask} />
    </section>
  )
}

export default App
