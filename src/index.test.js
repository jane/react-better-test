// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import theme from 'assets/theme'

import renderer, { create, mount, render, shallow } from './test-renderer'

// eslint-disable-next-line
const Sample = ({ data, dispatch, ...rest }) => (
  <div {...rest}>Data is: {data}</div>
)

describe('styled theme support', (): void => {
  const StyledSample = styled(Sample)`
    color: ${({ theme }) => theme['foo']};
  `

  test('works with mount', (): void => {
    const component = mount(<StyledSample data="Hello" />)
    expect(component).toHaveStyleRule('color', theme['foo'])
  })
  test('works with shallow', (): void => {
    const component = shallow(<StyledSample data="Hello" />)
    expect(component).toHaveStyleRule('color', theme['foo'])
  })
  test('works with render', (): void => {
    const component = render(<StyledSample data="Hello" />)
    expect(component).toMatchSnapshot('styled.render')
  })
  test('works with create', (): void => {
    const component = create(<StyledSample data="Hello" />)
    expect(component).toHaveStyleRule('color', theme['foo'])
  })
})

describe('supports router', (): void => {
  const render = renderer().withRouter()

  // these would fail without router
  test('works with mount', (): void => {
    renderer.mount(<Link to="/">A Link</Link>)
  })
  test('works with shallow', (): void => {
    renderer.shallow(<Link to="/">A Link</Link>)
  })
  test('works with render', (): void => {
    renderer.render(<Link to="/">A Link</Link>)
  })
  test('works with create', (): void => {
    renderer.create(<Link to="/">A Link</Link>)
  })
})

describe('supports Redux store data', (): void => {
  const render = renderer().withStoreData()

  const ConnectedSample = connect(
    () => ({ data: 'Cool!', dispatch: 'hi' }),
    null
  )(Sample)

  test('works with mount', (): void => {
    const component = renderer.mount(<ConnectedSample />)
    expect(component.text()).toEqual('Data is: Cool!')
  })
  test('works with shallow', (): void => {
    const component = renderer.shallow(<ConnectedSample />)
    expect(component.dive().text()).toEqual('Data is: Cool!')
  })
  test('works with render', (): void => {
    const component = renderer.render(<ConnectedSample />)
    expect(component.text()).toEqual('Data is: Cool!')
  })
  test('works with create', (): void => {
    const component = renderer.create(<ConnectedSample />)
    expect(component.children).toEqual(expect.arrayContaining(['Cool!']))
  })
})

describe('supports populated Redux store data', (): void => {
  const render = renderer().withStoreData({ data: 'Magic!' })
  const ConnectedSample = connect(
    ({ data }) => ({ data }),
    null
  )(Sample)

  test('works with mount', (): void => {
    const component = renderer.mount(<ConnectedSample />)
    expect(component.text()).toEqual('Data is: Magic!')
  })
  test('works with shallow', (): void => {
    const component = renderer.shallow(<ConnectedSample />)
    expect(component.dive().text()).toEqual('Data is: Magic!')
  })
  test('works with render', (): void => {
    const component = renderer.render(<ConnectedSample />)
    expect(component.text()).toEqual('Data is: Magic!')
  })
  test('works with create', (): void => {
    const component = renderer.create(<ConnectedSample />)
    expect(component.children).toEqual(expect.arrayContaining(['Magic!']))
  })
})
