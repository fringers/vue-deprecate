import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueDeprecate from '@/deprecate';

describe('Options', () => {

  const deprecatedComponent = {
    name: 'DeprecatedComponent',
    deprecated: true,
    props: {
      deprecatedProp: { deprecated: true },
    },
    template: '<div>this is component</div>'
  };

  // TODO: fix types
  function mountWithPluginSpy(component: any, options?: any) {
    const installSpy = jest.spyOn(VueDeprecate, 'install');

    const localVue = createLocalVue()
    localVue.use(VueDeprecate, options);

    shallowMount(component, {
      localVue,
      propsData: {
        deprecatedProp: 'some value',
      }
    });

    expect(installSpy).toHaveBeenCalled();
  }

  describe('enabledOnProduction', () => {
    const OLD_ENV = process.env;

    beforeEach(() => {
      jest.resetModules();
      process.env = { ...OLD_ENV };
      delete process.env.NODE_ENV;
    });

    afterEach(() => {
      process.env = OLD_ENV;
    });

    it('log warnings if no options and not production', () => {
      const warnMock = jest.fn();
      console.warn = warnMock;

      mountWithPluginSpy(deprecatedComponent);

      expect(warnMock).toHaveBeenCalledTimes(2);
    });

    it('log warnings if other options and not production', () => {
      const warnMock = jest.fn();
      console.warn = warnMock;

      mountWithPluginSpy(deprecatedComponent, {
        someProp: 'value',
      });

      expect(warnMock).toHaveBeenCalledTimes(2);
    });

    it('log warnings if enabledOnProduction=true and not production', () => {
      const warnMock = jest.fn();
      console.warn = warnMock;

      mountWithPluginSpy(deprecatedComponent, {
        enabledOnProduction: true,
      });

      expect(warnMock).toHaveBeenCalledTimes(2);
    });

    it('log warnings if enabledOnProduction=false and not production', () => {
      const warnMock = jest.fn();
      console.warn = warnMock;

      mountWithPluginSpy(deprecatedComponent, {
        enabledOnProduction: false,
      });

      expect(warnMock).toHaveBeenCalledTimes(2);
    });

    it('no warnings if no options and production', () => {
      const warnMock = jest.fn();
      console.warn = warnMock;

      process.env.NODE_ENV = 'production';
      mountWithPluginSpy(deprecatedComponent);

      expect(warnMock).not.toHaveBeenCalled();
    });

    it('no warnings if other options and production', () => {
      const warnMock = jest.fn();
      console.warn = warnMock;

      process.env.NODE_ENV = 'production';
      mountWithPluginSpy(deprecatedComponent, {
        someProp: 'value',
      });

      expect(warnMock).not.toHaveBeenCalled();
    });

    it('log warnings if enabledOnProduction=true and production', () => {
      const warnMock = jest.fn();
      console.warn = warnMock;

      process.env.NODE_ENV = 'production';
      mountWithPluginSpy(deprecatedComponent, {
        enabledOnProduction: true,
      });

      expect(warnMock).toHaveBeenCalledTimes(2);
    });

    it('no warnings if enabledOnProduction=false and production', () => {
      const warnMock = jest.fn();
      console.warn = warnMock;

      process.env.NODE_ENV = 'production';
      mountWithPluginSpy(deprecatedComponent, {
        enabledOnProduction: false,
      });

      expect(warnMock).not.toHaveBeenCalled();
    });
  });
});
