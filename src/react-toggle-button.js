import React, { Component } from 'react';
import {
  Motion,
  spring
} from 'react-motion';
import {
  reactToggle,
  reactToggleScreenReaderOnly,
  reactToggleTrack,
  reactToggleOn,
  reactToggleOff,
  reactToggleThumb,
  reactThumbCenteringContainer,
} from './styles'

import {
  rgbToHex,
  interpolateColor,
  mapValueInRange,
} from './colors'

const defaultColors = {
  checked: {
    base: rgbToHex(1,124,66),
    hover: rgbToHex(1,124,66),
  },
  unChecked: {
    base: rgbToHex(65,66,68),
    hover: rgbToHex(65,66,68),
  },
  checkedThumb: {
    base: rgbToHex(250,250,250),
    hover: rgbToHex(250,250,250),
  },
  unCheckedThumb: {
    base: rgbToHex(250,250,250),
    hover: rgbToHex(250,250,250),
  },
}

export const rgb = rgbToHex

export class ToggleStyle {
  constructor(base, hover) {
    this._base = base
    this._hover = hover
  }

  set base(_base) {
    this._base = _base
  }

  set hover(_hover) {
    this._hover = _hover || this.base
  }

  get base() {
    return this._base || {}
  }

  get hover() {
    return this._hover || {}
  }
}

const emptyStyle = new ToggleStyle({})

export default class ToggleButton extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isHover: false,
    }
  }

  static propTypes = {
    checked: React.PropTypes.bool.isRequired,
    onToggle: React.PropTypes.func.isRequired,
    colors: React.PropTypes.object,
    checkedLabel: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object,
    ]),
    checkedLabelStyle: React.PropTypes.instanceOf(ToggleStyle),
    checkedThumbStyle: React.PropTypes.instanceOf(ToggleStyle),
    unCheckedLabel: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object,
    ]),
    unCheckedLabelStyle: React.PropTypes.instanceOf(ToggleStyle),
    thumbStyle: React.PropTypes.instanceOf(ToggleStyle),
    trackStyle: React.PropTypes.instanceOf(ToggleStyle),
    animateThumbStyleHover: React.PropTypes.func,
    animateTrackStyleHover: React.PropTypes.func,
    animateTrackStyleToggle: React.PropTypes.func,
    animateThumbStyleToggle: React.PropTypes.func,
    internalSpringSetting: React.PropTypes.object,
    internalHoverSpringSetting: React.PropTypes.object,
    thumbIcon: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object,
    ]),
    thumbAnimateRange: React.PropTypes.array,
  }

  static defaultProps = {
    checked: false,
    onToggle: () => {},
    colors: defaultColors,
    checkedLabel: 'ON',
    checkedLabelStyle: emptyStyle,
    unCheckedLabel: 'OFF',
    unCheckedLabelStyle: emptyStyle,
    thumbStyle: emptyStyle,
    animateThumbStyleHover: () => { return {} },
    animateThumbStyleToggle: () => { return {} },
    trackStyle: emptyStyle,
    animateTrackStyleHover: () => { return {} },
    animateTrackStyleToggle: () => { return {} },
    thumbAnimateRange: [1, 33],
    internalSpringSetting: {
      stiffness: 180,
      damping: 22,
    },
    internalHoverSpringSetting: {
      stiffness: 180,
      damping: 20,
    },
  }

  static displayName = 'Toggle'

  onMouseOver() {
    this.setState({ isHover: true })
  }

  onMouseOut() {
    this.setState({ isHover: false })
  }

  checkColors(colors, key) {
    if (!colors[key]){
      colors[key] = defaultColors[key]
    } else if (!colors[key].hover) {
      if (!colors[key].base) {
        console.warn('Color prop should have a "base" style and a "hover" style!')
        colors[key] = defaultColors[key]
      } else {
        colors[key].hover = colors[key].base
      }
    }
  }

  interpolateColorWithHover(colorNumber, checkKey, unCheckKey) {
    const colors = this.props.colors
    this.checkColors(colors, checkKey)
    this.checkColors(colors, unCheckKey)
    if (this.state.isHover) {
      return {
        backgroundColor: interpolateColor(
          colorNumber,
          colors[checkKey].hover,
          colors[unCheckKey].hover,
          0, 400
        )
      }
    } else {
      return {
        backgroundColor: interpolateColor(
          colorNumber,
          colors[checkKey].base,
          colors[unCheckKey].base,
          0, 400
        )
      }
    }
  }

  makeStyle(style, focusStyle) {
    if (this.state.isHover) {
      return {
        ...style,
        ...focusStyle,
      }
    } else {
      return style
    }
  }

  handleClick(evt) {
    if (evt.target !== this._input) {
      evt.preventDefault()
      this._input.focus()
      this._input.click()
    }

    this.props.onToggle(this.props.checked)
  }

  render() {
    const SpringConfig = this.props.internalSpringSetting
    const HoverSpringConfig = this.props.internalHoverSpringSetting
    return (
      <Motion style={{
          opacity: spring(this.props.checked ? 1 : 0, SpringConfig),
          left: spring(
            this.props.checked ? this.props.thumbAnimateRange[1]*10 : this.props.thumbAnimateRange[0]*10,
            SpringConfig
          ),
          colorNumber: spring(this.props.checked ? 0 : 400, SpringConfig),
          toggleNumber: spring(this.state.checked ? 400 : 0, SpringConfig),
          hoverNumber: spring(this.state.isHover ? 400 : 0, HoverSpringConfig),
      }}>
      {({ opacity, left, colorNumber, hoverNumber, toggleNumber }) =>
        <div style={reactToggle}
          onMouseOver={this.onMouseOver.bind(this)}
          onMouseOut={this.onMouseOut.bind(this)}
          onClick={this.handleClick.bind(this)}>
          <div style={{
              ...this.makeStyle({
                ...reactToggleTrack,
                ...this.props.trackStyle.base,
                ...this.interpolateColorWithHover(colorNumber, 'checked', 'unChecked'),
                ...this.props.animateTrackStyleToggle(toggleNumber/400.0),
              }, {
                ...this.props.trackStyle.hover,
              ...this.props.animateTrackStyleHover(hoverNumber/400.0),
              }),
            }}>
            <div style={{
                ...this.makeStyle({
                  ...reactToggleOn,
                  ...this.props.checkedLabelStyle.base,
                }, this.props.checkedLabelStyle.hover),
                opacity: opacity,
              }}>
              {this.props.checkedLabel}
            </div>
            <div style={{
              ...this.makeStyle({
                ...reactToggleOff,
                ...this.props.unCheckedLabelStyle.base,
              }, this.props.unCheckedLabelStyle.hover),
              opacity: 1 - opacity,
              }}>
              {this.props.unCheckedLabel}
            </div>
          </div>
          <div style={reactThumbCenteringContainer}>
            <div style={{
                ...this.makeStyle({
                  ...reactToggleThumb,
                  ...this.props.thumbStyle.base,
                  ...this.interpolateColorWithHover(colorNumber, 'checkedThumb', 'unCheckedThumb'),
                  ...this.props.animateThumbStyleToggle(toggleNumber/400.0),
                }, {
                  ...this.props.thumbStyle.hover,
                  ...this.props.animateThumbStyleHover(hoverNumber/400.0),
                }),
                position: 'relative',
                left: Math.round(left/10.0),
              }}>
              {this.props.thumbIcon}
            </div>
          </div>
          <input
            ref={(c) => {
              this._input = c
            }}
            type="checkbox"
            style={reactToggleScreenReaderOnly}
            {...this.props} />
        </div>
      }
    </Motion>
    )
  }
}
