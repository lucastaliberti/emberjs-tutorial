import Ember from 'ember'
import { test } from 'qunit'
import moduleForAcceptance from 'emberjs-tutorial/tests/helpers/module-for-acceptance'

let StubMapsService = Ember.Service.extend({
  getMapElement(){
    return document.createElement('div')
  }
})

moduleForAcceptance('Acceptance | list rentals',{
  beforeEach(){
    this.application.register('service:stubMaps', StubMapsService)
    this.application.inject('component:location-map', 'maps', 'service:stubMaps')
  }
});

test('should list available rentals', (assert) => {
  visit('/')
  andThen(()=>{
    assert.equal(find('.listing').length, 3, 'should see 3 listings')
  })
})

test('should link the information about the company', (assert) => {
  visit('/')
  click('a:contains("About")')
  andThen(()=>{
    assert.equal(currentURL(), '/about', 'should navigate to about')
  })
})

test('should link to contact information', (assert) => {
  visit('/')
  click('a:contains("Contact")')
  andThen(()=>{
    assert.equal(currentURL(), '/contact', 'should navigate to contact')
  })
})

test('should filter the list of rentals by city', (assert) => {
  visit('/')
  fillIn('.list-filter input','seattle')
  keyEvent('.list-filter input','keyup',69)
  andThen(() => {
    assert.equal(find('.results .listing').length, 1, 'should show 1 listing')
    assert.equal(find('.listing .location:contains("Seattle")').length, 1, 'should contain 1 listing with location Seattle')
  })
})
