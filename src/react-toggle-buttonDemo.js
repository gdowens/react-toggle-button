import React, { Component } from 'react';
import { render } from 'react-dom';
import ToggleButton, { ToggleStyle, rgb } from './react-toggle-button';
import { X, Check } from './iconExamples'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    fontFamily: 'Helvetica Neue',
  },
  exampleContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  titleStyle: {
    fontWeight: 500,
  },
  subTitleStyle: {
    fontWeight: 500,
  },
  exampleInternal: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  informationBlock: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleContainer: {
    height: 100,
    width: 800,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  descriptionStyle: {
    lineHeight: 1.5,
    fontWeight: 500,
    fontSize: 14,
    marginLeft: 50,
    width: 800,
    overflow: 'auto',
  },
  codeBlock: {
    display: 'flex',
    flex: 1,
    width: 800,
    overflow: 'auto',
    backgroundColor: '#f5f5f5',
    fontSize: 13,
    padding: 10,
    border: '1px solid #ccc',
    borderRadius: 4,
    marginBottom: -20,
  },

}

const codeExamples = [{
  // EXAMPLE 1
  code: `<ToggleButton
  checked={ self.state.checked || false }
  onToggle={(checked) => {
    self.setState({
      checked: !checked,
    })
  }} />`,
  description: `// ToggleButton requires only two props...


// 'checked', the state of the button.

// 'onToggle', called on each click, is given the current state
//  of the button.`,
  example: (self) => {
    return (
      <ToggleButton
        checked={self.state.checked}
        onToggle={(checked) => {
          self.setState({
            checked: !checked,
          })
        }} />
    )
  }
}, {
  // EXAMPLE 2
  code: `<ToggleButton
  unCheckedLabel={<X/>}
  checkedLabel={<Check/>}
  checked={self.state.checked}
  onToggle={(checked) => {
    self.setState({
      checked: !checked,
    })
  }} />`,
  description: `// Different labels example...

// 'uncheckedLabel' - a string or component to display when OFF.
// 'checkedLabel' - a string or component to display when ON.`,
  example: (self) => {
    return (
      <ToggleButton
        checked={self.state.checked2}
        unCheckedLabel={<X/>}
        checkedLabel={<Check/>}
        onToggle={(checked) => {
          self.setState({
            checked2: !checked,
          })
        }} />
    )
  }
}, {
  // EXAMPLE 3
  code: `// 'rgb' turns your colors into a hex value
import {rgb} from 'react-toggle-button'

  // ...

<ToggleButton
  unCheckedLabel={''}
  checkedLabel={''}
  colors={{
    checkedThumb: {
      base: rgb(250,250,250),
    },
    unCheckedThumb: {
      base: rgb(62,130,247),
    },
    checked: {
      base: rgb(207,221,245),
      hover: rgb(177, 191, 215),
    },
    unChecked: {
      base: rgb(65,66,68),
      hover: rgb(95,96,98),
    }
  }}
  trackStyles={new ToggleStyle(styles.trackStyle)}
  thumbStyle={new ToggleStyle(styles.thumbStyle)}
  thumbAnimateRange={[-10, 36]}
  thumbIcon={<ThumbIcon/>}
  checked={self.state.checked}
  onToggle={(checked) => {
    self.setState({
      checked: !checked,
    })
  }} />`,
  description: `// Material Design example...

// Your button can look very different, if you want.
`,
  example: (self) => {
    return (
      <ToggleButton
        checked={self.state.checked3}
        unCheckedLabel={''}
        checkedLabel={''}
        colors={{
          checkedThumb: {
            base: rgb(250,250,250),
          },
          unCheckedThumb: {
            base: rgb(62,130,247),
          },
          checked: {
            base: rgb(207,221,245),
            hover: rgb(177, 191, 215),
          },
          unChecked: {
            base: rgb(65,66,68),
            hover: rgb(95,96,98),
          }
        }}
        trackStyle={new ToggleStyle({
          height: 15,
        })}
        thumbStyle={new ToggleStyle({
          position: 'absolute',
          width: 30,
          height: 30,
          boxShadow: `0 0 2px rgba(0,0,0,.12),0 2px 4px rgba(0,0,0,.24)`
        })}
        thumbAnimateRange={[-10, 36]}
        thumbIcon={(
          <div style={{
            position: 'absolute',
            top: 5.5,
            left: 8,
          }}>
              <Check/>
          </div>)
        }
        onToggle={(checked) => {
          self.setState({
            checked3: !checked,
          })
        }} />
    )
  }
}, {
  // EXAMPLE 4
  code: `<ToggleButton
  // ... same props as above
  thumbStyle={new ToggleStyle(styles.thumbStyle, styles.thumbStyleHover)}
  animateThumbStyleHover={(n) => {
    return {
      boxShadow: \`0 0 \${2 + 4*n}px rgba(0,0,0,.16),0 \${2 + 3*n}px \${4 + 8*n}px rgba(0,0,0,.32)\`,
    }
  }} />`,
  description: `// Such hover, much wow!

// Hover and toggle animation props use a function
// that lets you interpolate your own styles.
`,
  example: (self) => {
    return (
      <ToggleButton
        checked={self.state.checked4}
        unCheckedLabel={''}
        checkedLabel={''}
        colors={{
          checkedThumb: {
            base: rgb(250,250,250),
          },
          unCheckedThumb: {
            base: rgb(62,130,247),
          },
          checked: {
            base: rgb(207,221,245),
            hover: rgb(177, 191, 215),
          },
          unChecked: {
            base: rgb(65,66,68),
            hover: rgb(95,96,98),
          }
        }}
        trackStyle={new ToggleStyle({
          height: 15,
        })}
        thumbStyle={new ToggleStyle({
          position: 'absolute',
          width: 30,
          height: 30,
          boxShadow: `0 0 2px rgba(0,0,0,.12),0 2px 4px rgba(0,0,0,.24)`,
          display: 'flex',
          borderRadius: 15,
          alignItems: 'center',
          justifyContent: 'center',
        }, {
          width: 32,
          height: 32,
        })}
        thumbAnimateRange={[-10, 36]}
        animateThumbStyleHover={(n) => {
          return {
            boxShadow: `0 0 ${2 + 4*n}px rgba(0,0,0,.16),0 ${2 + 3*n}px ${4 + 8*n}px rgba(0,0,0,.32)`,
          }
        }}
        thumbIcon={(
          <div>
              <Check/>
          </div>)
        }
        onToggle={(checked) => {
          self.setState({
            checked4: !checked,
          })
        }} />
    )
  }
},{
  // EXAMPLE 5
  code: `const borderRadiusStyle = new ToggleStyle({ borderRadius: 2 })

// ... some lines of code later

<ToggleButton
  checked={ self.state.checked || false }
  thumbStyle={borderRadiusStyle}
  trackStyle={borderRadiusStyle}
  onToggle={(checked) => {
    self.setState({
      checked: !checked,
    })
  }} />`,
  description: `// A square toggle, just for funsies...`,
  example: (self) => {
    return (
      <ToggleButton
        checked={self.state.checked5}
        thumbStyle={new ToggleStyle({
          borderRadius: 2,
        })}
        trackStyle={new ToggleStyle({
          borderRadius: 2,
        })}
        onToggle={(checked) => {
          self.setState({
            checked5: !checked,
          })
        }} />
    )
  }
}]

const makeBlock = (self, _example, i) => {
  const {
    code,
    example,
    description,
    title,
  } = _example
  return (
    <div key={i} style={styles.exampleContainer}>
      <h2 style={styles.subTitleStyle}>{title}</h2>
      <div style={styles.exampleInternal}>
        <pre style={styles.descriptionStyle}>
          {description}
        </pre>
        <div style={styles.informationBlock}>
          <div style={styles.toggleContainer}>
            {example(self)}
          </div>
          <pre style={styles.codeBlock}>
            {code}
          </pre>
        </div>
      </div>
    </div>
  )
}


class ToggleButtonDemo extends Component {

  constructor(props) {
    super(props)
    this.state = {
      checked: false,
      checked2: false,
      checked3: false,
      checked4: false,
      checked5: false,
    }
  }

  render() {
    return (
      <div style={styles.container}>
        <pre style={{...styles.codeBlock, width: 145, marginBottom: 20 }}>
          {`react-toggle-button`}
        </pre>
        <div style={{maxWidth: 500, lineHeight: 1.5, fontSize: 16, fontWeight: 500, marginBottom: 10,}}>
          {`A highly customizable and portable toggle button for React.`}
        </div>
        <pre style={{...styles.codeBlock, width: 500, marginBottom: 20 }}>
          {`//  Easy to install and works out-of-the-box

//  Change a few things, or change everything

//  Uses react-motion for animating toggle.

//  Animates hover states too!

//  Quacks like an <input> checkbox, if that's your thing.

//  Sticks to the UI stuff (Redux approved!)
`}
        </pre>
        <h1 style={styles.titleStyle}>Install</h1>
        <pre style={{...styles.codeBlock, marginBottom: 20}}>
          {`npm install react-toggle-button`}
        </pre>
        <pre style={{...styles.codeBlock, marginTop: 0, marginBottom: 60}}>
          {`//ES6
import ToggleButton from 'react-toggle-button'

//ES5
var ToggleButton = require('react-toggle-button')`}
        </pre>
        <h1 style={styles.titleStyle}> Examples </h1>
        {codeExamples.map((example, i) => {
          return makeBlock(this, example, i)
        })}
        <div style={{marginBottom: 50}}/>
        <h1 style={styles.subTitleStyle}> React Toggle Button API </h1>
        <pre style={{...styles.codeBlock, marginBottom: 20}}>
          {`import ToggleButton, {
  /**
   * colors props need to be in hex, use this to conveniently enter rgb
   * values.
   */
  rgb,
  /**
   * Use for style props
   *
   * new ToggleStyle(activeStyle)
   * new ToggleStyle(activeStyle, hoverStyle)
   */
  ToggleStyle,
}

/**
 * 'react-toggle-button' PropTypes
 */
ToggleButton.propTypes = {
  //
  //
  // REQUIRED PROPS
  //
  //

  checked: React.PropTypes.bool.isRequired,
  /**
   * Called during onClick
   * 1. triggers 'focus' and 'click' on internal checkbox
   * 2. calls onToggle(this.props.checked)
   */
  onToggle: React.PropTypes.func.isRequired,

  //
  //
  // OPTIONAL PROPS
  //
  //
  /**
   * Object with four properties { checked, unChecked, checkedThumb, unCheckedThumb }
   *
   * each property should have a 'base' key and a 'hover' key
   * ( if hover is undefined, that property will use the base value )
   *
   */
  colors: React.PropTypes.object,


  /**
   * The label used inside the track, can also take a component
   *
   * checkedLabel (defaultValue: 'ON')
   * unCheckedLabel (defaultValue: 'OFF')
   */
  checkedLabel: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object,
  ]),
  unCheckedLabel: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object,
  ]),


  /**
   * These props require a ToggleStyle
   * eg. new ToggleStyle(activeStyle, hoverStyle)
   *
   */
  checkedLabelStyle: React.PropTypes.instanceOf(ToggleStyle),
  checkedThumbStyle: React.PropTypes.instanceOf(ToggleStyle),
  unCheckedLabelStyle: React.PropTypes.instanceOf(ToggleStyle),
  thumbStyle: React.PropTypes.instanceOf(ToggleStyle),
  trackStyle: React.PropTypes.instanceOf(ToggleStyle),


  /**
   * These props take a function that receives a real number [0, 1] and
   * returns an interpolated style.
   *
   * No Hover -> Hover :  0 -> 1 : No Toggle -> Toggle
   */
  animateThumbStyleHover: React.PropTypes.func,
  animateTrackStyleHover: React.PropTypes.func,
  animateTrackStyleToggle: React.PropTypes.func,
  animateThumbStyleToggle: React.PropTypes.func,


  /**
   * passes through internal spring settings for react-motion
   * { stiffness, damping }
   */
  internalSpringSetting: React.PropTypes.object,
  internalHoverSpringSetting: React.PropTypes.object,


  /**
   * Optional if one wants an icon inside the thumb, take a string or component
   */
  thumbIcon: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object,
  ]),


  /**
   * The range to move the thumb on toggle [starting, ending]
   */
  thumbAnimateRange: React.PropTypes.array,
}`}
        </pre>
      </div>
    )
  }
}

render(<ToggleButtonDemo />, document.getElementById('root'));
