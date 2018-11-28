// @flow

import * as React from 'react'
import 'jest-styled-components'
import { connect } from 'react-redux'
import { Link, HashRouter } from 'react-router-dom'
import styled from 'styled-components'
import renderer from '.'
import Adapter from 'enzyme-adapter-react-16'
import enzyme from 'enzyme'
enzyme.configure({ adapter: new Adapter() })

const theme = { foo: 'bar' }

// eslint-disable-next-line
const Sample = ({ data, dispatch, ...rest }) => (
  <div {...rest}>Data is: {data}</div>
)

describe('styled theme support', (): void => {
  const mount = renderer().mount
  const shallow = renderer().shallow
  const render = renderer().render
  const create = renderer().create
  const StyledSample = styled(Sample)`
    color: ${({ theme }: { theme: typeof theme }) => theme.foo};
  `

  xit('works with mount', (): void => {
    const component = mount(<StyledSample data="Hello" />)
    expect(component).toHaveStyleRule('color', theme.foo)
  })

  xit('works with shallow', (): void => {
    const component = shallow(<StyledSample data="Hello" />)
    expect(component).toHaveStyleRule('color', theme.foo)
  })

  test('works with render', (): void => {
    const component = render(<StyledSample data="Hello" />)
    expect(component).toMatchSnapshot('styled.render')
  })

  xit('works with create', (): void => {
    const component = create(<StyledSample data="Hello" />)
    expect(component).toHaveStyleRule('color', theme.foo)
  })
})

describe('supports router', (): void => {
  const render = renderer({ router: HashRouter })

  // these would fail without router
  it('works with mount', (): void => {
    render.mount(<Link to="/">A Link</Link>)
  })

  it('works with shallow', (): void => {
    render.shallow(<Link to="/">A Link</Link>)
  })

  it('works with render', (): void => {
    render.render(<Link to="/">A Link</Link>)
  })

  it('works with create', (): void => {
    render.create(<Link to="/">A Link</Link>)
  })
})

describe('supports Redux store data', (): void => {
  const render = renderer({ store: {} })

  const ConnectedSample = connect(
    () => ({ data: 'Cool!', dispatch: 'hi' }),
    null
  )(Sample)

  it('works with mount', (): void => {
    const component = render.mount(<ConnectedSample />)
    expect(component.text()).toEqual('Data is: Cool!')
  })

  it('works with shallow', (): void => {
    const component = render.shallow(<ConnectedSample />)
    expect(
      component
        .dive()
        .dive()
        .dive()
        .text()
    ).toEqual('Data is: Cool!')
  })

  it('works with render', (): void => {
    const component = render.render(<ConnectedSample />)
    expect(component.text()).toEqual('Data is: Cool!')
  })

  it('works with create', (): void => {
    const component = render.create(<ConnectedSample />)
    expect(component.children).toEqual(expect.arrayContaining(['Cool!']))
  })
})
