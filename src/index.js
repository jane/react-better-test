// @flow

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

const theme = {}

class TestRenderer {
  theme = null
  Router = null
  store = null

  withTheme(newTheme = theme) {
    this.theme = newTheme
    return this
  }

  withRouter(Router = MemoryRouter) {
    this.Router = Router
    return this
  }

  withStore(store) {
    this.store = store
    return this
  }

  withStoreData(data = {}) {
    return this.withStore(createStore(() => data))
  }

  _addRouter(C) {
    if (this.Router) {
      return <this.Router>{this._addStore(C)}</this.Router>
    }
    return this._addStore(C)
  }

  _addStore(C) {
    if (this.store) {
      return <Provider store={this.store}>{C}</Provider>
    }
    return C
  }

  _getStore() {
    if (this.store) {
      return { store: this.store }
    }
    return {}
  }

  _getTheme() {
    const context = shallowEnzyme(<ThemeProvider theme={this.theme} />)
      .instance()
      .getChildContext()
    return context
  }

  create(C) {
    return renderer
      .create(
        <ThemeProvider theme={this.theme}>{this._addRouter(C)}</ThemeProvider>
      )
      .toJSON()
  }

  mount(C, options = {}) {
    return mountEnzyme(
      <ThemeProvider theme={this.theme}>{this._addRouter(C)}</ThemeProvider>,
      options
    )
  }

  render(C) {
    return renderEnzyme(
      <ThemeProvider theme={this.theme}>{this._addRouter(C)}</ThemeProvider>
    )
  }

  shallow(C) {
    return shallowEnzyme(this.Router ? <this.Router>{C}</this.Router> : C, {
      context: {
        ...this._getTheme(),
        ...this._getStore(),
      },
    })
  }
}

const aRenderer = () => new TestRenderer().withTheme(theme)

export const create = (C) => aRenderer().create(C)
export const mount = (...params) => aRenderer().mount(...params)
export const render = (C) => aRenderer().render(C)
export const shallow = (C) => aRenderer().shallow(C)

export default aRenderer
