
const COMPONENTS = {};
const EXTENSIBLE_COMPONENT = {};
const STORE = {};


if (typeof Array.isArray === 'undefined') {
  Array.isArray = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  }
};

Object.prototype.isObject = function (obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}


function StoreObserve() {
  const data = [];
  this.add = function (action) {
    data.push(action);
  }
  this.update = function (content) {
    if (data.length) {
      data.forEach(item => item(content));
    }
  }
}

function StoreDataParse(key, data, parentName = 'data') {
  if (Object.isObject(data)) {
    Object.keys(data).forEach(item => {
      StoreDataParse(key, data[item], parentName + '.' + item);
    });
  }
  else if (Array.isArray(data)) {
    for (var i = 0; i < data.length; i++) {
      StoreDataParse(key, data[i], parentName + '.' + i)
    }
  } else {
    StoreUpdate(key, parentName, data)
  }
}

function StoreUpdate(key, name, content) {
  if (STORE[key] && STORE[key][name]) {
    STORE[key][name].update(content);
  }
}

function _useTemplate(key, elements) {
  const storePoint = STORE[key] = {};
  ['Text', 'Html', 'Value', 'Click', 'Change', 'Input', 'Keyup'].forEach(item => {
    const name = item.toLowerCase();
    const models = elements.querySelectorAll(`[use-${name}]`);
    if (models && models.length) {

      const action = eval(`_useTemplate${item}`);
      const isCustom = ['Click', 'Change', 'Input', 'Keyup'].includes(item);
      models.forEach(model => {
        if (isCustom) {
          action(model, EXTENSIBLE_COMPONENT[key][model.getAttribute(`use-${item.toLowerCase()}`)]);
        } else {
          const point = storePoint[model.getAttribute(`use-${name}`)] = new StoreObserve();
          point.add((content) => action(model, content))
        }
      });
    }
  });
  const placeElement = document.querySelector(`[use-template=${key}]`);
  if (placeElement) {
    placeElement.replaceWith(elements.children[0]);
  }
}

function _useTemplateValue(element, content) {
  element.value = content;
}

function _useTemplateText(element, content) {
  element.innerText = content;
}

function _useTemplateHtml(element, content) {
  element.innerHTML = content;
}

function _useTemplateClick(element, action) {
  element.addEventListener('click', action);
}


export default {
  add(name, action) {
    COMPONENTS[name] = action;
  },
  run() {
    window.addEventListener('load', function () {
      const useReady = [];
      const useData = [];
      const useTemplate = [];
      Object.keys(COMPONENTS).forEach(key => {
        const x = new COMPONENTS[key]({
          useReady: (action) => {
            useReady.push(action);
          },
          useTemplate: (content) => {
            let root = document.createElement('_');
            root.innerHTML = content;
            useTemplate.push(() => _useTemplate(key, root));
          },
          useData: (data) => {
            useData.push(() => StoreDataParse(key, data));
          }
        });

        console.log(x);

        EXTENSIBLE_COMPONENT[key] = x;

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
        useTemplate[i] && useTemplate[i]();
        useData[i] && useData[i]();
      }
    });
  }
};