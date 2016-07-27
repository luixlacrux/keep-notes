import React from 'react'
import Note from './Note'

export default class Grid extends React.Component {

  calculatePositions () {
    var grid_heights = [0,0,0,0]

    this.props.notes.forEach(note => {

      let current_note = this.refs[`note-${note.id}`] 
      var min = grid_heights[0]
      var min_col = 0

      for (var col = 1; col < grid_heights.length; col++) {
        if (grid_heights[col] < min) {
          min = grid_heights[col]
          min_col = col
        }
      }

      current_note.setPosition(min, min_col)
      grid_heights[min_col] += current_note.getHeight()
    })
  }

  componentDidMount () {
    this.calculatePositions()
  }

  componentDidUpdate () {
    this.calculatePositions()
  }

  render () {
    return (
      <div className="grid">
        {
          this.props.notes.map(note => {
            return <Note key={note.id} id={note.id} title={note.title} text={note.text} ref={`note-${note.id}`}/>
          }) 
        }
      </div>
    )
  }
}
