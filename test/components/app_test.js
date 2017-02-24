import {renderComponent, jQuery, expect} from '../test_helper';
import App from '../../src/components/app';
import TestUtils from 'react-addons-test-utils';
describe('App', () => {
  let component;
  let componentInstance
  describe('not logged', () => {
    beforeEach(() => {
      componentInstance = renderComponent(App)
      component = jQuery(componentInstance)
    });
    it('should display loading', () => {

      expect(component).to.exist;
    });
  })

  describe('logged', () => {
    beforeEach(() => {
      componentInstance = renderComponent(App)

      component = jQuery(componentInstance)
    });
    it('should display loading', () => {
     // console.log(component)
      expect(component).to.exist;
    });
  })

});
