import * as React from 'react'
import { ThemeProvider } from 'styled-components'
import renderer from 'react-test-renderer'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'
import {
  mount as mountEnzyme,
  render as renderEnzyme,
  shallow as shallowEnzyme,
} from 'enzyme'

class TestRenderer {
  constructor({ theme = {}, router = MemoryRouter, store = {} }) {
    this.theme = theme
    this.Router = router
    this.store = createStore(() => store)
  }

  _addRouter = (C) => {
    if (this.Router) {
      return <this.Router>{this._addStore(C)}</this.Router>
    }
    return this._addStore(C)
  }

  _addStore = (C) => {
    if (this.store) {
      return <Provider store={this.store}>{C}</Provider>
    }
    return C
  }

  _getStore = () => {
    if (this.store) {
      return { store: this.store }
    }
    return {}
  }

  _getTheme = () => {
    const context = shallowEnzyme(<ThemeProvider theme={this.theme} />)
      .instance()
      .getChildContext()
    return context
  }

  create = (C) =>
    renderer
      .create(
        <ThemeProvider theme={this.theme}>{this._addRouter(C)}</ThemeProvider>
      )
      .toJSON()

  mount = (C, options = {}) =>
    mountEnzyme(
      <ThemeProvider theme={this.theme}>{this._addRouter(C)}</ThemeProvider>,
      options
    )

  render = (C) =>
    renderEnzyme(
      <ThemeProvider theme={this.theme}>{this._addRouter(C)}</ThemeProvider>
    )

  shallow = (C) =>
    shallowEnzyme(this.Router ? <this.Router>{C}</this.Router> : C, {
      context: {
        ...this._getTheme(),
        ...this._getStore(),
      },
    })
}

const r = (props = {}) => new TestRenderer(props)
export default r
