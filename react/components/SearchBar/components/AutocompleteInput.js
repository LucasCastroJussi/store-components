import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { Input } from 'vtex.styleguide'
import { IconClose, IconSearch } from 'vtex.store-icons'
import { useCssHandles } from 'vtex.css-handles'

/** Midleware component to adapt the styleguide/Input to be used by the Downshift*/
const CSS_HANDLES = [
  'searchBarIcon',
  'compactMode',
  'autoCompleteOuterContainer',
]

class AutocompleteInput extends Component {
  constructor(props) {
    super(props)
    this.inputRef = React.createRef()
  }

  changeClassInput = () => {
    const { compactMode } = this.props
    if (compactMode) {
      this.inputRef.current.placeholder = ''
      this.inputRef.current.classList.add(styles.paddingInput)
    }
  }

  componentDidMount() {
    const { autoFocus } = this.props
    this.changeClassInput()
    autoFocus && this.inputRef.current.focus()
  }

  render() {
    const {
      onClearInput,
      compactMode,
      value,
      hasIconLeft,
      iconBlockClass,
      iconClasses,
      ...restProps
    } = this.props

    const handles = useCssHandles(CSS_HANDLES)

    const suffix = (
      <span
        className={`${iconClasses || ''} ${
          handles.searchBarIcon
        } flex items-center pointer`}
        onClick={() => value && onClearInput()}
      >
        {value ? (
          <IconClose type="line" size={22} />
        ) : (
          !hasIconLeft && <IconSearch />
        )}
      </span>
    )

    const prefix = (
      <span className={`${iconClasses} ${handles.searchBarIcon}`}>
        <IconSearch />
      </span>
    )

    const classContainer = classNames('w-100', {
      [handles.compactMode]: compactMode,
    })

    return (
      <div className={`${handles.autoCompleteOuterContainer} flex`}>
        <div className={classContainer}>
          <Input
            ref={this.inputRef}
            size="large"
            value={value}
            prefix={hasIconLeft && prefix}
            suffix={suffix}
            {...restProps}
          />
        </div>
      </div>
    )
  }
}

AutocompleteInput.propTypes = {
  /** Downshift prop to be passed to the input */
  autoComplete: PropTypes.string,
  /** Input ID */
  id: PropTypes.string,
  /** Downshift prop to be passed to the input */
  onBlur: PropTypes.func,
  /** Downshift prop to be passed to the input */
  onChange: PropTypes.func,
  /** Downshift prop to be passed to the input */
  onKeyDown: PropTypes.func,
  /** Downshift prop to be passed to the input */
  value: PropTypes.string,
  /** Placeholder to be used on the input */
  placeholder: PropTypes.string,
  compactMode: PropTypes.bool,
  /** Clears the input */
  onClearInput: PropTypes.func,
  /** Identify if the search icon is on left or right position */
  hasIconLeft: PropTypes.bool,
  /** Custom classes for the search icon */
  iconClasses: PropTypes.string,
  /** Block class for the search icon */
  iconBlockClass: PropTypes.string,
  /** Identify if the search input should autofocus or not */
  autoFocus: PropTypes.bool,
}

export default AutocompleteInput
