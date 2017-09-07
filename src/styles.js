export const reactToggle = {
  display: '-webkit-flex',
  width: 52,
  WebkitAlignItems: 'center',
  WebkitJustifyContent: 'flex-start',
  position: 'relative',
  cursor: 'pointer',
  backgroundColor: 'transparent',
  border: 0,
  padding: 0,
  WebkitTouchCallout: 'none',
  WebkitUserSelect: 'none',
  KhtmlUserSelect: 'none',
  MozUserSelect: 'none',
  msUserSelect: 'none',
  userSelect: 'none',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',
  WebkitTapHighlightColor: 'transparent',
}

const toggleLabelBase = {
  fontSize: 11,
  display: '-webkit-flex',
  WebkitAlignItems: 'center',
  WebkitJustifyContent: 'center',
  fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
}

export const reactToggleScreenReaderOnly = {
  border: 0,
  clip: 'rect(0 0 0 0)',
  height: 1,
  margin: -1,
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  width: 1,
}

export const reactToggleTrack = {
  width: '52px',
  height: '20px',
  padding: 0,
  borderRadius: '26px',
  display: '-webkit-flex',
  WebkitAlignItems: 'center',
  WebkitJustifyContent: 'center',
}

export const reactToggleOn = {
  ...toggleLabelBase,
  position: 'relative',
  color: '#FAFAFA',
  marginTop: 'auto',
  marginBottom: 'auto',
  lineHeight: 0,
  opacity: 0,
  width: 26,
  height: 20,
  left: 4,
}

export const reactToggleOff = {
  ...toggleLabelBase,
  position: 'relative',
  color: 'rgba(255,255,255,0.6)',
  bottom: '0px',
  marginTop: 'auto',
  marginBottom: 'auto',
  paddingRight: 5,
  lineHeight: 0,
  width: 26,
  height: 20,
}

export const reactToggleThumb = {
  width: '18px',
  height: '18px',
  display: '-webkit-flex',
  WebkitAlignSelf: 'center',
  boxShadow: '0 0 0 1px rgba(0,0,0,0.3)',
  borderRadius: '50%',
  WebkitBoxSizing: 'border-box',
  MozBoxSizing: 'border-box',
  boxSizing: 'border-box',
}

export const reactThumbCenteringContainer = {
  position: 'absolute',
  height: '100%',
  top: 0,
  left: 0,
  display: '-webkit-flex',
  WebkitFlex: 1,
  flex: 1,
  WebkitAlignSelf: 'stretch',
  WebkitAlignItems: 'center',
  WebkitJustifyContent: 'flex-start',
}
