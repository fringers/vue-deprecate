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
  function mountWithPluginSpy(component: any, options?: any, devtools: boolean = true) {
    const installSpy = jest.spyOn(VueDeprecate, 'install');

    const localVue = createLocalVue()
    localVue.use(VueDeprecate, options);
    localVue.config.devtools = devtools;

    shallowMount(component, {
      localVue,
      propsData: {
        deprecatedProp: 'some value',
      }
    });

    expect(installSpy).toHaveBeenCalled();
  }

  describe('enabledOnProduction', () => {
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

      mountWithPluginSpy(deprecatedComponent, undefined, false);

      expect(warnMock).not.toHaveBeenCalled();
    });

    it('no warnings if other options and production', () => {
      const warnMock = jest.fn();
      console.warn = warnMock;

      mountWithPluginSpy(deprecatedComponent,
          {
            someProp: 'value',
          },
          false
      );

      expect(warnMock).not.toHaveBeenCalled();
    });

    it('log warnings if enabledOnProduction=true and production', () => {
      const warnMock = jest.fn();
      console.warn = warnMock;

      mountWithPluginSpy(deprecatedComponent,
          {
            enabledOnProduction: true,
          },
          false
      );

      expect(warnMock).toHaveBeenCalledTimes(2);
    });

    it('no warnings if enabledOnProduction=false and production', () => {
      const warnMock = jest.fn();
      console.warn = warnMock;

      mountWithPluginSpy(deprecatedComponent,
          {
            enabledOnProduction: false,
          },
          false
      );

      expect(warnMock).not.toHaveBeenCalled();
    });
  });
});
