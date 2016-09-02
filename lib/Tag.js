'use strict'

const React = require('react')

module.exports = (props) => (
  <div className={props.classNames.selectedTag + (props.isSelected ? " selected" : "")} onClick={props.onSelectTag}>
    {props.tag.name}
    <button type='button'  title='Click to remove tag' onClick={props.onDelete}>X </button>
  </div>
)
