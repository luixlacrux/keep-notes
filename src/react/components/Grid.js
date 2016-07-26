import React from 'react'
import Note from './Note'

export default class Grid extends React.Component {

  render () {
    return (
      <div className="grid">
        {
          this.props.notes.map((note, idx) => {
            return <Note key={idx} id={note.id} title={note.title} text={note.text} />
          }) 
        }
      </div>
    )
  }
}
