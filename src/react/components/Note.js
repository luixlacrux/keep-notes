import React from 'react'

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
          <a className="note-btn-delete"></a>
        </div>
      </div>
    )
  }
}
