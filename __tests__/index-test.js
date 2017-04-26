jest.unmock('../src/index');

import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import index from '../src/index'

describe('<index />', () => {
  it('', () => {
    renderer.create(
      <index />
    );
  });
});
