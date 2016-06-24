jest.unmock('../src/index');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import index from '../src/index'

describe('<index />', () => {
  it('', () => {
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <index />
    );
    const dom = renderer.getRenderOutput();
    //expect(dom.props.//PROPS_NAME).toEqual('//TEXT');
  });
});
