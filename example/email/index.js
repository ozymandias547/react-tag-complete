import React from 'react';
import ReactTagComplete from '../../lib/';

class  EmailExample extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      toEmails: [
        {id: 1, name: "larry.page@wherever.com"}, {id: 1, name: "john.olligver@how.com"}
      ],
      ccEmails: [
        {id: 2, name: "bob@hope.com"}
      ],
      suggestions: [
        {id: 2, name: "bob@hope.com"},
        {id: 1, name: "larry.page@wherever.com"},
        {id: 3, name: "john.olligver@how.com"}
      ]
    }

  }

  render() {
    return (
      <div>
        <h2>Gmail style</h2>
        <div className="email-container">
          <ReactTagComplete tags={this.state.toEmails}
                            suggestions={this.state.suggestions}
                            onTagDeleted={(tag) => (this.onToEmailDeleted(tag) )}
                            onTagAdded={(tag) => (this.onToEmailAdded(tag) )}
                            allowNew={true}
                            autofocus={false}
                            autoresize={false}
                            placeholder="recipients..."
                            label="To: "/>
          <ReactTagComplete tags={this.state.ccEmails}
                            suggestions={this.state.suggestions}
                            onTagDeleted={(tag) => (this.onCCEmailDeleted(tag) )}
                            onTagAdded={(tag) => (this.onCCEmailAdded(tag) )}
                            allowNew={true}
                            autofocus={false}
                            autoresize={false}
                            placeholder="recipients..."
                            label="cc: "/>
        </div>
      </div>
    )
  }

  onToEmailDeleted(i) {
    let toEmails = this.state.toEmails;
    toEmails.splice(i, 1);
    this.setState({toEmails: toEmails});
  }

  onToEmailAdded(toEmail) {

    let toEmails = this.state.toEmails;

    toEmails.push({
      id: toEmail.id || parseInt(Math.random() * 10000),
      name: toEmail.name
    });

    this.setState({
      toEmails: toEmails
    });

  }

  onCCEmailDeleted(i) {
    let ccEmails = this.state.ccEmails;
    ccEmails.splice(i, 1);
    this.setState({ccEmails: ccEmails});
  }

  onCCEmailAdded(ccEmail) {

    let ccEmails = this.state.ccEmails;

    ccEmails.push({
      id: ccEmail.id || parseInt(Math.random() * 10000),
      name: ccEmail.name
    });

    this.setState({
      ccEmails: ccEmails
    });

  }

}

export default EmailExample;