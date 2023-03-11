import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Task extends Component {
  state = {
    label: '',
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { itemTask, editingTask } = this.props
    const { label } = this.state
    if (label !== '' && label.length >= 2) {
      editingTask(itemTask.id, label)
    }
  }

  render() {
    const { itemTask, deletedTask, onCompletedTask, onEditingTask } = this.props
    const { label, condition, visibility, timeInterval } = itemTask
    return (
      <li className={`${condition} ${visibility}`}>
        <div className="view">
          <input className="toggle" type="checkbox" id="inputCheckbox" onClick={onCompletedTask} />
          <label>
            <span className="description">{label}</span>
            <span className="created">created {timeInterval}</span>
          </label>
          <button type="button" className="icon icon-edit" onClick={onEditingTask} aria-label="onEdit" />
          <button type="button" className="icon icon-destroy" onClick={deletedTask} aria-label="onDestroy" />
        </div>
        {condition === 'editing' ? (
          <form onSubmit={this.onSubmit}>
            <input type="text" className="edit" defaultValue={label} onChange={this.onLabelChange} />
          </form>
        ) : null}
      </li>
    )
  }
}

Task.defaultProps = {
  itemTask: {
    condition: 'view',
    visibility: null,
  },
}

Task.propTypes = {
  itemTask: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
    condition: PropTypes.string,
    visibility: PropTypes.string,
    timeInterval: PropTypes.string,
  }),
}
