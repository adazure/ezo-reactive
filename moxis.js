
const COMPONENTS = {};
const EXTENSIBLE_COMPONENT = {};

export default {
  add(name, action) {
    COMPONENTS[name] = action;
  },
  run() {
    window.addEventListener('load', function () {
      const useReady = [];
      const useTemplate = {};
      Object.keys(COMPONENTS).forEach(key => {
        EXTENSIBLE_COMPONENT[key] = new COMPONENTS[key]({
          useReady: (action) => {
            useReady.push(action);
          },
          useDispose: (action) => { },
          useTemplate: (content) => {
            useTemplate[key] = document.createElement('_').innerHTML = content;
          }
        });
        Object.defineProperty(EXTENSIBLE_COMPONENT[key], '$', {
          get() {
            return EXTENSIBLE_COMPONENT;
          }
        });
        EXTENSIBLE_COMPONENT[key].select = function (name) {
          return useTemplate[key].querySelector(name);
        }
      });

      for (let i = 0; i < useReady.length; i++) {
        useReady[i]();
      }
    });
  }
};