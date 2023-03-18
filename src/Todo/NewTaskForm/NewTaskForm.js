import React, { useState } from 'react'
import PropTypes from 'prop-types'

function NewTaskForm({ addItem }) {
  const [state, setState] = useState({
    label: '',
    minute: '',
    second: '',
  })

  const onLabelChange = (e) => {
    setState((prev) => ({ ...prev, label: e.target.value }))
  }

  const onMinuteChange = (e) => {
    const valueMinute = e.target.value
    if (+valueMinute || valueMinute === '') {
      setState((prev) => ({ ...prev, minute: valueMinute }))
    }
  }

  const onSecondChange = (e) => {
    const valueSecond = e.target.value
    if (+valueSecond || valueSecond === '') {
      setState((prev) => ({ ...prev, second: valueSecond }))
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const { label, minute, second } = state
    const timerTime = Number(minute) * 60 + Number(second)

    if (label.trim() !== '' && label.length >= 2) {
      addItem(label, timerTime)
      setState({
        label: '',
        minute: '',
        second: '',
      })
    }
  }

  const { label, minute, second } = state
  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <input className="new-todo" placeholder="What needs to be done?" onChange={onLabelChange} value={label} />
      <input className="new-todo-form__timer" placeholder="Min" onChange={onMinuteChange} value={minute} />
      <input className="new-todo-form__timer" placeholder="Sec" onChange={onSecondChange} value={second} />
      <label>
        <button type="submit" title="submit" aria-label="submit" onSubmit={onSubmit} label=" " />
      </label>
    </form>
  )
}

NewTaskForm.defaultProps = {
  addItem: () => {},
}

NewTaskForm.propTypes = {
  addItem: PropTypes.func,
}

export default NewTaskForm
