import Task from '../Task'
import React from 'react'
import PropTypes from 'prop-types'

function TaskList({ todo, deletedTask, addItem, onCompletedTask, onEditingTask, editingTask }) {
  const elements = todo.map((item) => {
    const { id } = item

    return (
      <Task
        key={id}
        itemTask={item}
        deletedTask={() => {
          deletedTask(id)
        }}
        addItem={addItem}
        onCompletedTask={() => {
          onCompletedTask(id)
        }}
        onEditingTask={() => {
          onEditingTask(id)
        }}
        editingTask={editingTask}
      />
    )
  })

  return <ul className="todo-list">{elements}</ul>
}

TaskList.defaultProps = {
  deletedTask: () => {},
  onCompletedTask: () => {},
  onEditingTask: () => {},
  editingTask: () => {},
  addItem: () => {},
}

TaskList.propTypes = {
  deletedTask: PropTypes.func,
  onCompletedTask: PropTypes.func,
  onEditingTask: PropTypes.func,
  editingTask: PropTypes.func,
  addItem: PropTypes.func,
}

export default TaskList
