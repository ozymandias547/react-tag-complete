import React from 'react'
import Tag from './Tag'
import Input from './input'
import Suggestions from './Suggestions'

const KEYS = {
  ENTER: 13,
  TAB: 9,
  BACKSPACE: 8,
  UP_ARROW: 38,
  DOWN_ARROW: 40,
  LEFT_ARROW: 37,
  RIGHT_ARROW: 39,
};

const CLASS_NAMES = {
  root: 'react-tag-complete',
  rootFocused: 'is-focused',
  selected: 'react-tags__selected',
  selectedTag: 'react-tags__selected-tag',
  selectedTagName: 'react-tags__selected-tag-name',
  search: 'react-tags__search',
  searchInput: 'react-tags__search-input',
  suggestions: 'react-tags__suggestions',
  suggestionActive: 'is-active',
  suggestionDisabled: 'is-disabled'
};

class ReactTagComplete extends React.Component {

  constructor (props) {

    super(props);

    this.state = {
      query: '',
      focused: false,
      inputFocused: false,
      expandable: false,
      selectedIndex: -1,
      cursorPosition: 0,
      classNames: Object.assign({}, CLASS_NAMES, this.props.classNames)
    }

  }

  componentWillReceiveProps (newProps) {
    this.setState({
      classNames: Object.assign({}, CLASS_NAMES, newProps.classNames)
    })
  }

  handleChange (e) {

    const query = e.target.value;

    if (this.props.handleInputChange) {
      this.props.handleInputChange(query)
    }

    this.setState({ query })

  }

  handleKeyDown (e) {

    const { query, selectedIndex } = this.state

    // when one of the terminating keys is pressed, add current query to the tags.
    if (e.keyCode === KEYS.ENTER || e.keyCode === KEYS.TAB) {
      query && e.preventDefault();

      if (query.length >= this.props.minQueryLength) {

        // Check if the user typed in an existing suggestion.
        const match = this.suggestions.state.options.findIndex((suggestion) => {
          return suggestion.name.search(new RegExp(`^${query}$`, 'i')) === 0
        });

        const index = selectedIndex === -1 ? match : selectedIndex;

        if (index > -1) {
          this.addTag(this.suggestions.state.options[index])
        } else if (this.props.allowNew) {
          this.addTag({ name: query })
        }
      }
    }

    // when backspace key is pressed and query is blank, delete the last tag
    if (e.keyCode === KEYS.BACKSPACE && query.length === 0) {
      this.deleteTag(this.props.tags.length - 1)
    }

    if (e.keyCode === KEYS.UP_ARROW) {

      e.preventDefault();

      // if last item, cycle to the bottom
      if (selectedIndex <= 0) {
        this.setState({ selectedIndex: this.suggestions.state.options.length - 1 })
      } else {
        this.setState({ selectedIndex: selectedIndex - 1 })
      }
    }

    if (e.keyCode === KEYS.DOWN_ARROW) {
      e.preventDefault();
      this.setState({ selectedIndex: (selectedIndex + 1) % this.suggestions.state.options.length })
    }

    if (e.keyCode === KEYS.LEFT_ARROW) {
      e.preventDefault();
      this.setState({ cursorPosition : this.state.cursorPosition - 1 })
    }

  }

  handleClick (e) {

    if (document.activeElement !== e.target) {
      this.input.input.focus();

      this.setState({
        cursorPosition: 0
      });

    }
  }

  handleBlur () {
    this.setState({ focused: false, selectedIndex: -1, cursorPosition: 0 })
  }

  handleFocus () {
    this.setState({ focused: true, cursorPosition: 0 })
  }

  addTag (tag) {

    if (tag.disabled) {
      return
    }

    if (!this.props.allowDuplicates) {

      let matchingTag = this.props.tags.filter(existingTag => existingTag.name === tag.name);

      if (matchingTag.length > 0) {
        return;
      }

    }

    this.props.onTagAdded(tag);

    // reset the state
    this.setState({
      query: '',
      selectedIndex: -1
    })
  }

  deleteTag (i) {
    this.props.onTagDeleted(i);
    this.setState({ query: '' })
  }

  selectTag(e, i) {

    e.stopPropagation();

    this.setState({
      cursorPosition: this.props.tags.length - i, focused: true
    });

    this.input.input.blur();
  }

  onInputFocus() {
    this.setState({inputFocused: true})
  }

  onInputBlur() {
    this.setState({inputFocused: false})
  }

  render () {

    const listboxId = 'ReactTags-listbox';

    const tags = this.props.tags.map((tag, i) => (
      <Tag
        key={i}
        tag={tag}
        classNames={this.state.classNames}
        onDelete={this.deleteTag.bind(this, i)}
        onSelectTag={(e) => this.selectTag(e, i)} isSelected={this.state.cursorPosition === this.props.tags.length - i} />
    ));

    const expandable = this.state.focused && this.state.query.length >= this.props.minQueryLength;
    const classNames = [this.state.classNames.root]

    this.state.focused && classNames.push(this.state.classNames.rootFocused);

    let suggestions = this.props.suggestions;

    if (!this.props.allowDuplicates) {

      var tagIds = this.props.tags.map((tag) => tag.id);

      suggestions = suggestions.filter((suggestion) => {
        return tagIds.indexOf(suggestion.id) === -1;
      })
    }

    return (
      <div className={classNames.join(' ')} onClick={this.handleClick.bind(this)}>
        {this.props.label && (
          <div className="react-tags__label">{this.props.label}</div>
        )}
        <div className={this.state.classNames.selected} aria-live='polite' aria-relevant='additions removals'>
          {tags}
        </div>
        <div
          className={this.state.classNames.search}
          onBlur={this.handleBlur.bind(this)}
          onFocus={this.handleFocus.bind(this)}
          onChange={this.handleChange.bind(this)}
          onKeyDown={this.handleKeyDown.bind(this)}>
          <Input {...this.state}
                 ref={(c) => { this.input = c }}
                 listboxId={listboxId}
                 autofocus={this.props.autofocus}
                 autoresize={this.props.autoresize}
                 expandable={expandable}
                 placeholder={this.props.placeholder}
                 onFocus={this.onInputFocus.bind(this)}
                 onBlur={this.onInputBlur.bind(this)}/>
          <Suggestions {...this.state}
                       ref={(c) => { this.suggestions = c }}
                       listboxId={listboxId}
                       expandable={expandable}
                       suggestions={suggestions}
                       addTag={this.addTag.bind(this)}
                       maxSuggestionsLength={this.props.maxSuggestionsLength} />
        </div>
      </div>
    )
  }
}

ReactTagComplete.defaultProps = {
  tags: [],
  placeholder: 'Add new tag',
  suggestions: [],
  autofocus: true,
  autoresize: true,
  minQueryLength: 1,
  maxSuggestionsLength: 6,
  allowNew: false,
  allowDuplicates: false,
  label: false
};

ReactTagComplete.propTypes = {
  tags: React.PropTypes.array,
  placeholder: React.PropTypes.string,
  label: React.PropTypes.string,
  suggestions: React.PropTypes.array,
  autofocus: React.PropTypes.bool,
  autoresize: React.PropTypes.bool,
  onTagDeleted: React.PropTypes.func.isRequired,
  onTagAdded: React.PropTypes.func.isRequired,
  handleInputChange: React.PropTypes.func,
  minQueryLength: React.PropTypes.number,
  maxSuggestionsLength: React.PropTypes.number,
  classNames: React.PropTypes.object,
  allowNew: React.PropTypes.bool,
  allowDuplicates: React.PropTypes.bool
};

export default ReactTagComplete;


