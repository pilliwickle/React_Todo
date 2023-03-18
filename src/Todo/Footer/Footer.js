import TaskFilter from '../TasksFilter'
import React from 'react'
import PropTypes from 'prop-types'

const tasksFilter = [
  { label: 'All', id: 'TF1', noted: 'selected' },
  { label: 'Active', id: 'TF2', noted: null },
  { label: 'Completed', id: 'TF3', noted: null },
]

function createElementsFooter(hiddenTask) {
  return tasksFilter.map((item) => {
    const { id } = item

    return (
      <li key={id}>
        <TaskFilter infoItem={item} hiddenTask={hiddenTask} />
      </li>
    )
  })
}

function Footer({ countTasks, clearCompletedTasks, hiddenTask }) {
  return (
    <footer className="footer">
      <span className="todo-count">{countTasks} items left</span>
      <ul className="filters">{createElementsFooter(hiddenTask)}</ul>
      <label>
        <button
          type="button"
          className="clear-completed"
          onClick={clearCompletedTasks}
          title="clear completed task"
          aria-label="clear completed task"
        >
          Clear completed
        </button>
      </label>
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
