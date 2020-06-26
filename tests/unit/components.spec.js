import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueDeprecate from '@/deprecate';

describe('Components', () => {

  function mountWithPluginSpy(component) {
    const installSpy = jest.spyOn(VueDeprecate, 'install');

    const localVue = createLocalVue()
    localVue.use(VueDeprecate);

    shallowMount(component, {
      localVue,
    });

    expect(installSpy).toHaveBeenCalled();
  }

  describe('Standard', () => {
    const standardComponent = {
      name: 'StandardComponent',
      data: function () {
        return {
          count: 0
        }
      },
      template: '<div>this is component {{ count }}</div>'
    };


    it('not call console warn if component is not deprecated', () => {
      console.warn = jest.fn();

      mountWithPluginSpy(standardComponent);

      expect(console.warn).not.toHaveBeenCalled();
    });
  });

  describe('Deprecated', () => {
    const deprecatedComponent = {
      name: 'DeprecatedComponent',
      deprecated: true,
      data: function () {
        return {
          count: 0
        }
      },
      template: '<div>this is deprecated component {{ count }}</div>'
    };


    it('call console warn if component is deprecated', () => {
      console.warn = jest.fn();

      mountWithPluginSpy(deprecatedComponent);

      expect(console.warn).toHaveBeenCalledTimes(1)
      expect(console.warn.mock.calls[0][0]).toContain('[DEPRECATED]');
      expect(console.warn.mock.calls[0][0]).toContain(deprecatedComponent.name);
    });
  });

  describe('Deprecated with message', () => {
    const deprecatedMsg = 'this is deprecated message';
    const deprecatedWithMessageComponent = {
      name: 'DeprecatedWithMessageComponent',
      deprecated: deprecatedMsg,
      data: function () {
        return {
          count: 0
        }
      },
      template: '<div>this is deprecated component {{ count }}</div>'
    };


    it('call console warn with specific message', () => {
      console.warn = jest.fn();

      mountWithPluginSpy(deprecatedWithMessageComponent);

      expect(console.warn.mock.calls[0][0]).toContain('[DEPRECATED]');
      expect(console.warn.mock.calls[0][0]).toContain(deprecatedMsg);
    });
  });
});
