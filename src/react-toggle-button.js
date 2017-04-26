import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
  hexToRGB,
  interpolateColor,
  mapValueInRange,
} from './colors'

const defaultColors = {
  active: {
    base: `rgb(1,124,66)`,
    hover: `rgb(1,124,66)`,
  },
  inactive: {
    base: `rgb(65,66,68)`,
    hover: `rgb(65,66,68)`,
  },
  activeThumb: {
    base: `rgb(250,250,250)`,
    hover: `rgb(250,250,250)`,
  },
  inactiveThumb: {
    base: `rgb(250,250,250)`,
    hover: `rgb(250,250,250)`,
  },
}

const emptyStyle = {}

export default class ToggleButton extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isHover: false,
    }
  }

  static propTypes = {
    value: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
    passThroughInputProps: PropTypes.object,
    onClick: PropTypes.func,
    colors: PropTypes.object,
    activeLabel: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    containerStyle: PropTypes.object,
    activeLabelStyle: PropTypes.object,
    activeLabelStyleHover: PropTypes.object,
    activeThumbStyle: PropTypes.object,
    activeThumbStyleHover: PropTypes.object,
    inactiveLabel: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    inactiveLabelStyle: PropTypes.object,
    inactiveLabelStyleHover: PropTypes.object,
    thumbStyle: PropTypes.object,
    thumbStyleHover: PropTypes.object,
    trackStyle: PropTypes.object,
    trackStyleHover: PropTypes.object,
    animateThumbStyleHover: PropTypes.func,
    animateTrackStyleHover: PropTypes.func,
    animateTrackStyleToggle: PropTypes.func,
    animateThumbStyleToggle: PropTypes.func,
    internalSpringSetting: PropTypes.object,
    internalHoverSpringSetting: PropTypes.object,
    thumbIcon: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    thumbAnimateRange: PropTypes.array,
  }

  static defaultProps = {
    value: false,
    onToggle: () => {},
    colors: defaultColors,
    passThroughInputProps: {},
    activeLabel: 'ON',
    containerStyle: emptyStyle,
    activeLabelStyle: emptyStyle,
    activeLabelStyleHover: emptyStyle,
    inactiveLabel: 'OFF',
    inactiveLabelStyle: emptyStyle,
    inactiveLabelStyleHover: emptyStyle,
    thumbStyle: emptyStyle,
    thumbStyleHover: emptyStyle,
    animateThumbStyleHover: () => { return {} },
    animateThumbStyleToggle: () => { return {} },
    trackStyle: emptyStyle,
    trackStyleHover: emptyStyle,
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

  _convertToRgb(color, defaultColor) {
    if (color.indexOf('#') != -1) {
      const rgbObj = hexToRGB(color)
      return `rgb(${rgbObj.r}, ${rgbObj.g}, ${rgbObj.b})`
    } else if (color.indexOf('rgb') == -1) {
      return defaultColor //something weird, so it's going to be defaulted
    } else {
      return color
    }
  }

  /**
   * Goes through all colors in obj and converts them to proper format or default
   * @param  {[type]} colors [description]
   * @return {[type]}        [description]
   */
  checkAllColors(colors) {
    Object.keys(colors).forEach((key) => {
      this.checkColors(colors, key)
    })
    return colors
  }

  /**
   * Make sure a color is an rgb or rgba value
   * @param  {[type]} colors [description]
   * @param  {[type]} key    [description]
   * @return {[type]}        [description]
   */
  checkColors(colors, key) {
    if (!colors[key]){
      colors[key] = defaultColors[key]
    } else if (!colors[key].hover) {
      if (!colors[key].base) {
        console.warn('Color prop should have a "base" style and a "hover" style!')
        colors[key] = defaultColors[key]
      } else {
        colors[key].base = this._convertToRgb(colors[key].base, defaultColors[key].base)
        colors[key].hover = colors[key].base
      }
    } else {
      colors[key].base = this._convertToRgb(colors[key].base, defaultColors[key].base)
      colors[key].hover = this._convertToRgb(colors[key].hover, defaultColors[key].hover)
    }
  }

  interpolateColorWithHover(colorNumber, activeKey, inactiveKey) {
    const colors = this.props.colors
    this.checkColors(colors, activeKey)
    this.checkColors(colors, inactiveKey)
    if (this.state.isHover) {
      return {
        backgroundColor: interpolateColor(
          colorNumber,
          colors[activeKey].hover,
          colors[inactiveKey].hover,
          0, 400
        )
      }
    } else {
      return {
        backgroundColor: interpolateColor(
          colorNumber,
          colors[activeKey].base,
          colors[inactiveKey].base,
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
  }

  render() {
    const SpringConfig = this.props.internalSpringSetting
    const HoverSpringConfig = this.props.internalHoverSpringSetting
    return (
      <Motion style={{
          opacity: spring(this.props.value ? 1 : 0, SpringConfig),
          left: spring(
            this.props.value ? this.props.thumbAnimateRange[1]*10 : this.props.thumbAnimateRange[0]*10,
            SpringConfig
          ),
          colorNumber: spring(this.props.value ? 0 : 400, SpringConfig),
          toggleNumber: spring(this.props.value ? 400 : 0, SpringConfig),
          hoverNumber: spring(this.state.isHover ? 400 : 0, HoverSpringConfig),
      }}>
      {({ opacity, left, colorNumber, hoverNumber, toggleNumber }) =>
        <div style={{
            ...this.makeStyle({
              ...reactToggle,
              ...this.props.containerStyle,
            })
          }}
          onMouseOver={this.onMouseOver.bind(this)}
          onMouseOut={this.onMouseOut.bind(this)}>
          <div style={{
              ...this.makeStyle({
                ...reactToggleTrack,
                ...this.props.trackStyle,
                ...this.interpolateColorWithHover(colorNumber, 'active', 'inactive'),
                ...this.props.animateTrackStyleToggle(toggleNumber/400.0),
              }, {
                ...this.props.trackStyleHover,
              ...this.props.animateTrackStyleHover(hoverNumber/400.0),
              }),
            }}>
            <div style={{
                ...this.makeStyle({
                  ...reactToggleOn,
                  ...this.props.activeLabelStyle,
                }, this.props.activeLabelStyleHover),
                opacity: opacity,
              }}>
              {this.props.activeLabel}
            </div>
            <div style={{
              ...this.makeStyle({
                ...reactToggleOff,
                ...this.props.inactiveLabelStyle,
              }, this.props.inactiveLabelStyleHover),
              opacity: 1 - opacity,
              }}>
              {this.props.inactiveLabel}
            </div>
          </div>
          <div style={reactThumbCenteringContainer}>
            <div style={{
                ...this.makeStyle({
                  ...reactToggleThumb,
                  ...this.props.thumbStyle,
                  ...this.interpolateColorWithHover(colorNumber, 'activeThumb', 'inactiveThumb'),
                  ...this.props.animateThumbStyleToggle(toggleNumber/400.0),
                }, {
                  ...this.props.thumbStyleHover,
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
            onClick={(evt) => {
              if (this.props.onClick) {
                this.props.onClick(evt)
              }

              this.props.onToggle(this.props.value)
            }}
            value={this.props.value}
            {...this.props.passThroughInputProps}
            />
        </div>
      }
    </Motion>
    )
  }
}
