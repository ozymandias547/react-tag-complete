import React from 'react';
import ReactTagComplete from '../../lib/';

class BasicExample extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
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

  }

  render() {
    return (
      <div>
        <h2>Tagging</h2>
        <div className="basic-container">
          <ReactTagComplete tags={this.state.tags}
                            suggestions={this.state.suggestions}
                            onTagDeleted={(tag) => (this.onTagDeleted(tag) )}
                            onTagAdded={(tag) => (this.onTagAdded(tag) )}
                            allowNew={true}
                            autofocus={false}
                            autoresize={true}/>
        </div>
      </div>
    )
  }

  onTagDeleted(i) {

    let tags = this.state.tags;
    tags.splice(i, 1);
    this.setState({tags: tags});

  }

  onTagAdded(tag) {

    let tags = this.state.tags;

    tags.push({
      id: tag.id || parseInt(Math.random() * 10000),
      name: tag.name
    });

    this.setState({
      tags: tags
    });
  }

}

export default BasicExample;