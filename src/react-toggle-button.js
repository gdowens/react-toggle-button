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
    value: React.PropTypes.bool.isRequired,
    onToggle: React.PropTypes.func.isRequired,
    passThroughInputProps: React.PropTypes.object,
    onClick: React.PropTypes.func,
    colors: React.PropTypes.object,
    activeLabel: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object,
    ]),
    containerStyle: React.PropTypes.object,
    activeLabelStyle: React.PropTypes.object,
    activeLabelStyleHover: React.PropTypes.object,
    activeThumbStyle: React.PropTypes.object,
    activeThumbStyleHover: React.PropTypes.object,
    inactiveLabel: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object,
    ]),
    inactiveLabelStyle: React.PropTypes.object,
    inactiveLabelStyleHover: React.PropTypes.object,
    thumbStyle: React.PropTypes.object,
    thumbStyleHover: React.PropTypes.object,
    trackStyle: React.PropTypes.object,
    trackStyleHover: React.PropTypes.object,
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
    const { 
      internalSpringSetting,
      internalHoverSpringSetting,
      value,
      thumbAnimateRange,
      isHover,
      containerStyle,
      trackStyle,
      animateTrackStyleToggle,
      trackStyleHover,
      activeLabelStyle,
      activeLabelStyleHover,
      activeLabel,
      inactiveLabelStyle,
      inactiveLabelStyleHover,
      inactiveLabel,
      thumbStyle,
      animateThumbStyleHover,
      animateThumbStyleToggle,
      thumbIcon,
      onClick,
      onToggle,
      passThroughInputProps
     } = this.props;

    const SpringConfig = internalSpringSetting
    const HoverSpringConfig = internalHoverSpringSetting
    return (
      <Motion style={{
          opacity: spring(value ? 1 : 0, SpringConfig),
          left: spring(
            value ? thumbAnimateRange[1]*10 : thumbAnimateRange[0]*10,
            SpringConfig
          ),
          colorNumber: spring(value ? 0 : 400, SpringConfig),
          toggleNumber: spring(value ? 400 : 0, SpringConfig),
          hoverNumber: spring(this.state.isHover ? 400 : 0, HoverSpringConfig),
      }}>
      {({ opacity, left, colorNumber, hoverNumber, toggleNumber }) =>
        <div style={{
            ...this.makeStyle({
              ...reactToggle,
              ...containerStyle,
            })
          }}
          onMouseOver={this.onMouseOver.bind(this)}
          onMouseOut={this.onMouseOut.bind(this)}
          onClick={this.handleClick.bind(this)}>
          <div style={{
              ...this.makeStyle({
                ...reactToggleTrack,
                ...trackStyle,
                ...this.interpolateColorWithHover(colorNumber, 'active', 'inactive'),
                ...animateTrackStyleToggle(toggleNumber/400.0),
              }, {
                ...trackStyleHover,
              ...animateTrackStyleHover(hoverNumber/400.0),
              }),
            }}>
            <div style={{
                ...this.makeStyle({
                  ...reactToggleOn,
                  ...activeLabelStyle,
                }, activeLabelStyleHover),
                opacity: opacity,
              }}>
              {activeLabel}
            </div>
            <div style={{
              ...this.makeStyle({
                ...reactToggleOff,
                ...inactiveLabelStyle,
              }, inactiveLabelStyleHover),
              opacity: 1 - opacity,
              }}>
              {inactiveLabel}
            </div>
          </div>
          <div style={reactThumbCenteringContainer}>
            <div style={{
                ...this.makeStyle({
                  ...reactToggleThumb,
                  ...thumbStyle,
                  ...this.interpolateColorWithHover(colorNumber, 'activeThumb', 'inactiveThumb'),
                  ...animateThumbStyleToggle(toggleNumber/400.0),
                }, {
                  ...thumbStyleHover,
                  ...animateThumbStyleHover(hoverNumber/400.0),
                }),
                position: 'relative',
                left: Math.round(left/10.0),
              }}>
              {thumbIcon}
            </div>
          </div>
          <input
            ref={(c) => {
              this._input = c
            }}
            type="checkbox"
            style={reactToggleScreenReaderOnly}
            onClick={(evt) => {
              if (onClick) {
                onClick(evt)
              }

              onToggle(value)
            }}
            value={value}
            {...passThroughInputProps}
            />
        </div>
      }
    </Motion>
    )
  }
}
