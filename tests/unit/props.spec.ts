import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueDeprecate from '@/deprecate';


describe('Props', () => {

  // TODO: fix types
  function mountWithPluginSpy(component: any, propsData?: any) {
    const installSpy = jest.spyOn(VueDeprecate, 'install');

    const localVue = createLocalVue()
    localVue.use(VueDeprecate);
    localVue.config.devtools = true;

    shallowMount(component, {
      localVue,
      propsData,
    });

    expect(installSpy).toHaveBeenCalled();
  }

  describe('Without props', () => {
    const componentWithoutProps = {
      name: 'ComponentWithoutProps',
      data: function () {
        return {
          count: 0
        }
      },
      template: '<div>this is component {{ count }}</div>'
    };

    it('not call console warn if no props in component', () => {
      console.warn = jest.fn();

      mountWithPluginSpy(componentWithoutProps);

      expect(console.warn).not.toHaveBeenCalled();
    })
  });


  describe('With array props', () => {
    const componentWithArrayProps = {
      name: 'ComponentWithArrayProps',
      props: ['title'],
      data: function () {
        return {
          count: 0
        }
      },
      template: '<div>this is component {{ count }}</div>'
    };

    it('not call console warn if not used array props in component', () => {
      console.warn = jest.fn();

      mountWithPluginSpy(componentWithArrayProps);

      expect(console.warn).not.toHaveBeenCalled();
    });

    it('not call console warn if used array props in component', () => {
      console.warn = jest.fn();

      mountWithPluginSpy(componentWithArrayProps, {
        title: 'this is title',
      });

      expect(console.warn).not.toHaveBeenCalled();
    });
  });

  describe('With props object', () => {
    const deprecatedMsg = 'this is deprecated message';
    const componentWithObjectProps = {
      name: 'ComponentWithObjectProps',
      props: {
        title: String,
        likes: Number,
        deprecatedProp: {
          type: String,
          deprecated: true,
        },
        isPublished: Boolean,
        deprecatedPropWithDefaultVal: {
          type: Boolean,
          default: true,
          deprecated: true,
        },
        deprecatedPropWithMsg: {
          type: Number,
          deprecated: deprecatedMsg,
        },
      },
      data: function () {
        return {
          count: 0
        }
      },
      template: '<div>this is component {{ count }}</div>'
    };

    it('not call console warn if not used props in component', () => {
      console.warn = jest.fn();

      mountWithPluginSpy(componentWithObjectProps);

      expect(console.warn).not.toHaveBeenCalled();
    });

    it('not call console warn if used not deprecated props in component', () => {
      console.warn = jest.fn();

      mountWithPluginSpy(componentWithObjectProps, {
        title: 'title',
        likes: 8,
      });

      expect(console.warn).not.toHaveBeenCalled();
    });

    it('call console warn if used deprecated prop', () => {
      const warnMock = jest.fn();
      console.warn = warnMock;

      mountWithPluginSpy(componentWithObjectProps, {
        deprecatedProp: 'value'
      });

      expect(warnMock).toHaveBeenCalledTimes(1);
      expect(warnMock.mock.calls[0][0]).toContain('[DEPRECATED]');
      expect(warnMock.mock.calls[0][0]).toContain(componentWithObjectProps.name);
      expect(warnMock.mock.calls[0][0]).toContain('deprecatedProp');
    });

    it('call console warn if used deprecated prop with default value', () => {
      const warnMock = jest.fn();
      console.warn = warnMock;

      mountWithPluginSpy(componentWithObjectProps, {
        deprecatedPropWithDefaultVal: true,
      });

      expect(warnMock).toHaveBeenCalledTimes(1);
      expect(warnMock.mock.calls[0][0]).toContain('[DEPRECATED]');
      expect(warnMock.mock.calls[0][0]).toContain(componentWithObjectProps.name);
      expect(warnMock.mock.calls[0][0]).toContain('deprecatedPropWithDefaultVal');
    });

    it('call console warn with specific message if used deprecated prop with message', () => {
      const warnMock = jest.fn();
      console.warn = warnMock;

      mountWithPluginSpy(componentWithObjectProps, {
        deprecatedPropWithMsg: 6,
      });

      expect(warnMock.mock.calls[0][0]).toContain('[DEPRECATED]');
      expect(warnMock.mock.calls[0][0]).toContain(deprecatedMsg);
    });
  });

})
