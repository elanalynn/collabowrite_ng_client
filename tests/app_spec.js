describe('Stories Route', function() {
  var story = element(by.model('first'))

  beforeEach(function() {
    // where does browser come from?
    browser.get('http://localhost:3000/api/v1')
  })

  it('should list all stories', function() {
    expect(storyCollection.count()).toEqual(3)
  })
})
