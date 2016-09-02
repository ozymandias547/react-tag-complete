import React from 'react';
import ReactTagComplete from '../../lib/ReactTagComplete';

const BasicExample = React.createClass({

  getInitialState: function () {
    return {
      tags: [
        {id: 1, name: "_DEVICE_83994"},
        {id: 2, name: "_DEVICE_89949"}
      ],
      suggestions: [
        {id: 1, name: "_DEVICE_83994"},
        {id: 2, name: "_DEVICE_89949"},
        {id: 3, name: "_DEVICE_12345"},
        {id: 4, name: "_DEVICE_13451"},
        {id: 5, name: "_DEVICE_10498"},
        {id: 6, name: "_DEVICE_088429"},
        {id: 7, name: "_DEVICE_123745"},
        {id: 8, name: "_DEVICE_134561"},
        {id: 9, name: "_DEVICE_105498"},
        {id: 10, name: "_DEVICE_084329"}
      ]
    }
  },

  handleDelete: function (i) {
    let tags = this.state.tags;
    tags.splice(i, 1);
    this.setState({tags: tags});
  },

  handleAddition: function (tag) {

    let tags = this.state.tags;

    tags.push({
      id: tag.id || parseInt(Math.random() * 10000),
      name: tag.name
    });

    this.setState({tags: tags});

  },

  handleDrag: function (tag, currPos, newPos) {
    let tags = this.state.tags;

    // mutate array
    tags.splice(currPos, 1);
    tags.splice(newPos, 0, tag);

    // re-render
    this.setState({tags: tags});
  },

  render: function () {

    let tags = this.state.tags;
    let suggestions = this.state.suggestions;

    return (
      <div>
        <h2>react-tag-complete</h2>
        <div className="container">
          <ReactTagComplete tags={tags}
                            suggestions={suggestions}
                            handleDelete={this.handleDelete}
                            handleAddition={this.handleAddition}
                            handleDrag={this.handleDrag}
                            allowNew={true} />
        </div>
      </div>
    )
  }
});

export default BasicExample;