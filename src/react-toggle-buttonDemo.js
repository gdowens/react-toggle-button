import React, { Component } from 'react';
import { render } from 'react-dom';
import ToggleButton from './react-toggle-button';
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
  value={ self.state.value || false }
  onToggle={(value) => {
    self.setState({
      value: !value,
    })
  }} />`,
  description: `// ToggleButton requires only two props...


// 'value', the state of the button.

// 'onToggle', called on each click, is given the current state
//  of the button.`,
  example: (self) => {
    return (
      <ToggleButton
        value={self.state.value}
        onToggle={(value) => {
          self.setState({
            value: !value,
          })
        }} />
    )
  }
}, {
  // EXAMPLE 2
  code: `<ToggleButton
  inactiveLabel={<X/>}
  activeLabel={<Check/>}
  value={self.state.value}
  onToggle={(value) => {
    self.setState({
      value: !value,
    })
  }} />`,
  description: `// Different labels example...

// 'inactiveLabel' - a string or component to display when OFF.
// 'activeLabel' - a string or component to display when ON.`,
  example: (self) => {
    return (
      <ToggleButton
        value={self.state.value2}
        inactiveLabel={<X/>}
        activeLabel={<Check/>}
        onToggle={(value) => {
          self.setState({
            value2: !value,
          })
        }} />
    )
  }
}, {
  // EXAMPLE 3
  code: `<ToggleButton
  inactiveLabel={''}
  activeLabel={''}
  colors={{
    activeThumb: {
      base: 'rgb(250,250,250)',
    },
    inactiveThumb: {
      base: 'rgb(62,130,247)',
    },
    active: {
      base: 'rgb(207,221,245)',
      hover: 'rgb(177, 191, 215)',
    },
    inactive: {
      base: 'rgb(65,66,68)',
      hover: 'rgb(95,96,98)',
    }
  }}
  trackStyle={styles.trackStyle}
  thumbStyle={styles.thumbStyle}
  thumbAnimateRange={[-10, 36]}
  thumbIcon={<ThumbIcon/>}
  value={self.state.value}
  onToggle={(value) => {
    self.setState({
      value: !value,
    })
  }} />`,
  description: `// Material Design example...

// Your button can look very different, if you want.
`,
  example: (self) => {
    return (
      <ToggleButton
        value={self.state.value3}
        inactiveLabel={''}
        activeLabel={''}
        colors={{
          activeThumb: {
            base: `rgb(250,250,250)`,
          },
          inactiveThumb: {
            base: `rgb(62,130,247)`,
          },
          active: {
            base: `rgb(207,221,245)`,
            hover: `rgb(177, 191, 215)`,
          },
          inactive: {
            base: `rgb(65,66,68)`,
            hover: `rgb(95,96,98)`,
          }
        }}
        trackStyle={{
          height: 15,
        }}
        thumbStyle={{
          position: 'absolute',
          width: 30,
          height: 30,
          boxShadow: `0 0 2px rgba(0,0,0,.12),0 2px 4px rgba(0,0,0,.24)`
        }}
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
        onToggle={(value) => {
          self.setState({
            value3: !value,
          })
        }} />
    )
  }
}, {
  // EXAMPLE 4
  code: `<ToggleButton
  // ... same props as above
  thumbStyle={styles.thumbStyle}
  thumbStyleHover={styles.thumbStyleHover}
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
        value={self.state.value4}
        inactiveLabel={''}
        activeLabel={''}
        colors={{
          activeThumb: {
            base: `rgb(250,250,250)`,
          },
          inactiveThumb: {
            base: `rgb(62,130,247)`,
          },
          active: {
            base: `rgb(207,221,245)`,
            hover: `rgb(177, 191, 215)`,
          },
          inactive: {
            base: `rgb(65,66,68)`,
            hover: `rgb(95,96,98)`,
          }
        }}
        trackStyle={{
          height: 15,
        }}
        thumbStyle={{
          position: 'absolute',
          width: 30,
          height: 30,
          boxShadow: `0 0 2px rgba(0,0,0,.12),0 2px 4px rgba(0,0,0,.24)`,
          display: 'flex',
          borderRadius: 15,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        thumbStyleHover={{
          width: 32,
          height: 32,
        }}
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
        onToggle={(value) => {
          self.setState({
            value4: !value,
          })
        }} />
    )
  }
},{
  // EXAMPLE 5
  code: `const borderRadiusStyle = { borderRadius: 2 }

// ... some lines of code later

<ToggleButton
  value={ self.state.value || false }
  thumbStyle={borderRadiusStyle}
  trackStyle={borderRadiusStyle}
  onToggle={(value) => {
    self.setState({
      value: !value,
    })
  }} />`,
  description: `// A square toggle, just for funsies...`,
  example: (self) => {
    return (
      <ToggleButton
        value={self.state.value5}
        thumbStyle={{
          borderRadius: 2,
        }}
        trackStyle={{
          borderRadius: 2,
        }}
        onToggle={(value) => {
          self.setState({
            value5: !value,
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
      value: false,
      value2: false,
      value3: false,
      value4: false,
      value5: false,
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
          {`import ToggleButton from 'react-toggle-button'

/**
 * 'react-toggle-button' PropTypes
 */
ToggleButton.propTypes = {
  //
  //
  // REQUIRED PROPS
  //
  //

  value: React.PropTypes.bool.isRequired,
  /**
   * Called during onClick
   * 1. triggers 'focus' and 'click' on internal checkbox
   * 2. calls onToggle(this.props.active)
   */
  onToggle: React.PropTypes.func.isRequired,

  //
  //
  // OPTIONAL PROPS
  //
  //
  /**
   * Object with four properties { active, inactive, activeThumb, inactiveThumb }
   *
   * each property should have a 'base' key and a 'hover' key
   * ( if hover is undefined, that property will use the base value )
   *
   */
  colors: React.PropTypes.object,


  /**
   * The label used inside the track, can also take a component
   *
   * activeLabel (defaultValue: 'ON')
   * inactiveLabel (defaultValue: 'OFF')
   */
  activeLabel: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object,
  ]),
  inactiveLabel: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object,
  ]),


  /**
   * These props specify style,
   * hover style is used during mouseOver event
   *
   *
   */
  activeLabelStyle: React.PropTypes.object,
  activeLabelStyleHover: React.PropTypes.object,
  activeThumbStyle: React.PropTypes.object,
  activeThumbStyleHover: React.PropTypes.object,
  inactiveLabelStyle: React.PropTypes.object,
  inactiveLabelStyleHover: React.PropTypes.object,
  thumbStyle: React.PropTypes.object,
  thumbStyleHover: React.PropTypes.object,
  trackStyle: React.PropTypes.object,
  trackStyleHover: React.PropTypes.object,


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

  /**
   * If you want to put some props on the underlying <input> element
   * you can pass them through this prop.
   *
   * Example:
   *
   *  passThroughInputProps={{
   *   	onChange: () => console.log('Hello!')
   *  }}
   *
   */
   passThroughInputProps: React.PropTypes.object,

}`}
        </pre>
      </div>
    )
  }
}

render(<ToggleButtonDemo />, document.getElementById('root'));
