# react-better-test

Better React test utils
[![npm version](https://img.shields.io/npm/v/react-better-test.svg)](https://npm.im/react-better-test) [![CircleCI](https://circleci.com/gh/jane/react-better-test.svg?style=svg)](https://circleci.com/gh/jane/react-better-test) [![Coverage Status](https://coveralls.io/repos/github/jane/react-better-test/badge.svg?t=fFbtGF)](https://coveralls.io/github/jane/react-better-test)

--------

## Installation

`npm i -D react-better-test styled-components react-test-renderer redux react-redux react-router enzyme`.

## Usage

```javascript
import renderer from 'react-better-test'
import 'jest-styled-components'
import Adapter from 'enzyme-adapter-react-16'
import enzyme from 'enzyme'
enzyme.configure({ adapter: new Adapter() })

// ...
expect(renderer.create(<Foo />)).toMatchSnapshot()
expect(renderer.mount(<SomeStyledComponent />)).toHaveStyleRule('color', 'blue')
```

See the tests for full usage examples.

### TODO:

* Finish Flow
* Fix skipped tests

## License

[MIT](./LICENSE.md)
