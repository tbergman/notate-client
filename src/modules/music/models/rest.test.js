// @flow

import Rest from 'modules/music/models/rest'

describe('rest', () => {
  it('should describe visible rests', () => {
    const rest = new Rest()
    expect(rest.toString()).toEqual(':q ##')
  })

  it('should describe invivisible rests', () => {
    const rest = new Rest().invisible()
    expect(rest.toString()).toEqual(':q #99#')
  })

  it('should describe rest durations', () => {
    const rest = new Rest().withDuration('w')
    expect(rest.toString()).toEqual(':w ##')
  })
})
