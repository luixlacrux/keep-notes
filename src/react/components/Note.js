import React from 'react'
import ReactDOM from 'react-dom'
import NoteActions from '../actions/NoteActions'

export default class Note extends React.Component {

  fontSize (text) {
    if (text.length > 240)
      return 'text-longest'
    else if (text.length > 120)
      return 'text-long'
    else if (text.length > 60)
      return 'text-medium'
    else if (text.length > 30)
      return 'text-short'

    return 'text-shortest'
  }

  setPosition (top, column) {
    let element = ReactDOM.findDOMNode(this)
    element.style.top = `${top}px`
    element.style.left = `${column * 25}%`
  }

  getHeight () {
    let element = ReactDOM.findDOMNode(this)
    let computedStyle = window.getComputedStyle(element)
    let height = computedStyle.getPropertyValue('height')
    return parseInt(height)
  }

  remove () {
    NoteActions.remove(this.props.id)
  }

  render () {
    return (
      <div className="note">
        <div className="note-text">
          <strong>{this.props.title}</strong>
          <p className={this.fontSize(this.props.text)}>
            {this.props.text}
          </p>
        </div>
        <div className="note-toolbar">
          <a className="note-btn-delete" onClick={this.remove.bind(this)}></a>
        </div>
      </div>
    )
  }
}
