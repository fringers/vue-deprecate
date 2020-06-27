import { shallowMount, createLocalVue, VueClass } from '@vue/test-utils';
import VueDeprecate from '@/deprecate';

describe('Components', () => {

  // TODO: fix types
  function mountWithPluginSpy(component: any) {
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
      const warnMock = jest.fn();
      console.warn = warnMock;

      mountWithPluginSpy(deprecatedComponent);

      expect(console.warn).toHaveBeenCalledTimes(1)
      expect(warnMock.mock.calls[0][0]).toContain('[DEPRECATED]');
      expect(warnMock.mock.calls[0][0]).toContain(deprecatedComponent.name);
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
      const warnMock = jest.fn();
      console.warn = warnMock;

      mountWithPluginSpy(deprecatedWithMessageComponent);

      expect(warnMock.mock.calls[0][0]).toContain('[DEPRECATED]');
      expect(warnMock.mock.calls[0][0]).toContain(deprecatedMsg);
    });
  });
});
