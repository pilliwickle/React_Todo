import TaskList from '../TaskList'
import Footer from '../Footer'
import NewTaskForm from '../NewTaskForm'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import React, { Component } from 'react'

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

export default class App extends Component {
  maxId = 1

  state = {
    todoData: [],

    tasksFilter: [
      { label: 'All', id: 'TF1', noted: 'selected' },
      { label: 'Active', id: 'TF2', noted: null },
      { label: 'Completed', id: 'TF3', noted: null },
    ],
  }

  addItem = (text) => {
    this.hiddenTask('All')

    const newItem = this.createTodoItem(text)
    this.setState(({ todoData }) => ({ todoData: [...todoData, newItem] }))
  }

  clearCompletedTasks = () => {
    const { todoData } = this.state
    todoData.forEach((el) => {
      if (el.condition === 'completed') {
        this.deleteTask(el.id)
      }
    })
  }

  onCompletedTask = (id) => {
    this.hiddenTask('All')

    this.setState(({ todoData }) => {
      const newArray = toggleProperty(todoData, id, 'completed')

      return {
        todoData: newArray,
      }
    })
  }

  onEditingTask = (id) => {
    this.setState(({ todoData }) => {
      const newArray = toggleProperty(todoData, id, 'editing')

      return {
        todoData: newArray,
      }
    })
  }

  editingTask = (id, text) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)

      const oldItem = todoData[idx]
      oldItem.label = text

      const newArray = [...todoData.slice(0, idx), oldItem, ...todoData.slice(idx + 1)]

      return {
        todoData: newArray,
      }
    })

    this.onEditingTask(id)
  }

  hiddenTask = (parameter) => {
    const { todoData } = this.state

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

    this.setState(() => ({
      todoData: newArray,
    }))
  }

  deleteTask = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)

      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]

      return {
        todoData: newArray,
      }
    })
  }

  createTodoItem(label) {
    this.maxId += 1

    return {
      label,
      condition: 'view',
      visibility: null,
      completed: false,
      id: this.maxId,
      timeCreate: Date.now(),
      timeInterval: this.updateTimeCreate(),
    }
  }

  updateTimeCreate() {
    setInterval(() => {
      this.setState(({ todoData }) => {
        const newArray = todoData.map((item, index) => {
          const itemObj = { ...todoData[index] }

          itemObj.timeInterval = formatDistanceToNow(itemObj.timeCreate, {
            includeSeconds: true,
            addSuffix: true,
          })
          return itemObj
        })

        return {
          todoData: newArray,
        }
      })
    }, 5000)
  }

  render() {
    const { todoData, tasksFilter } = this.state
    const countTasks = todoData.length - todoData.filter((el) => el.completed === true).length

    return (
      <section className="main">
        <header className="header" id="header">
          <h1>todos</h1>
          <NewTaskForm addItem={this.addItem} />
        </header>
        <TaskList
          todo={todoData}
          deletedTask={this.deleteTask}
          addItem={this.addItem}
          onCompletedTask={this.onCompletedTask}
          onEditingTask={this.onEditingTask}
          editingTask={this.editingTask}
        />
        <Footer
          countTasks={countTasks}
          tasksFilter={tasksFilter}
          clearCompletedTasks={this.clearCompletedTasks}
          hiddenTask={this.hiddenTask}
        />
      </section>
    )
  }
}
