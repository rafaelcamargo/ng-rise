(function (){
  'use strict';

  describe('Row Item', () => {
    const mock = angular.mock;
    let $componentController,
      controller,
      instatiateController;

    beforeEach(mock.module('app'));

    beforeEach(mock.inject($injector => {
      $componentController = $injector.get('$componentController');

      instatiateController = bindings => {
        controller = $componentController('nrRowItem', {}, bindings);
      }
    }));

    it('should set custom size to the row item if size is provided', () => {
      instatiateController({
        size: 3
      });
      controller.$onInit();
      expect(controller.sizeCssClass).toEqual('row-item-size-3');
    });

    it('should not set size to the row if no size is provided', () => {
      instatiateController();
      controller.$onInit();
      expect(controller.sizeCssClass).toEqual('');
    });

  });

}());
