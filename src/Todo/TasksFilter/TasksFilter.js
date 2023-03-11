import React from 'react'

function TaskFilter({ infoItem, hiddenTask }) {
  const { label } = infoItem
  return (
    <label>
      <input
        type="radio"
        name="taskFilter"
        value={label}
        onClick={() => {
          hiddenTask(label)
        }}
      />
      {label}
    </label>
  )
}

export default TaskFilter
