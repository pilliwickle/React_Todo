import TaskFilter from '../TasksFilter'
import React from 'react'
import PropTypes from 'prop-types'

function createElementsFooter(tasks, hiddenTask) {
  return tasks.map((item) => {
    const { id } = item

    return (
      <li key={id}>
        <TaskFilter infoItem={item} hiddenTask={hiddenTask} />
      </li>
    )
  })
}

function Footer({ countTasks, tasksFilter, clearCompletedTasks, hiddenTask }) {
  return (
    <footer className="footer">
      <span className="todo-count">{countTasks} items left</span>
      <ul className="filters">{createElementsFooter(tasksFilter, hiddenTask)}</ul>
      <button type="button" className="clear-completed" onClick={clearCompletedTasks}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.defaultProps = {
  clearCompletedTasks: () => {},
  hiddenTask: () => {},
}

Footer.propTypes = {
  clearCompletedTasks: PropTypes.func,
  hiddenTask: PropTypes.func,
}

export default Footer
