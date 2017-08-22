(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.bemFactory = {})));
}(this, (function (exports) { 'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

function computeModifiers(blockElement, modifiers) {
    return modifiers.map(function (m) {
        if ((typeof m === 'undefined' ? 'undefined' : _typeof(m)) === 'object') {
            var result = [];
            for (var k in m) {
                if (m.hasOwnProperty(k)) {
                    var v = m[k];
                    if (v) {
                        result.push(blockElement + '--' + k);
                    }
                }
            }
            return result.join(' ');
        }
        return blockElement + '--' + m;
    }).join(' ');
}

function bem(blockElement) {
    for (var _len = arguments.length, modifiers = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        modifiers[_key - 1] = arguments[_key];
    }

    var computedModifiers = computeModifiers(blockElement, modifiers);
    if (!computedModifiers) {
        return blockElement;
    }
    return blockElement + ' ' + computedModifiers;
}

var bemFactory = {
    block: function block(blockName) {
        var factory = function factory(elementName) {
            for (var _len2 = arguments.length, modifiers = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                modifiers[_key2 - 1] = arguments[_key2];
            }

            var blockElement = elementName ? blockName + '__' + elementName : blockName;
            return bem.apply(undefined, [blockElement].concat(modifiers));
        };
        factory.themed = function (theme) {
            return bemFactory.block(blockName + '--t-' + theme);
        };
        factory.add = function () {
            for (var _len3 = arguments.length, classNames = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                classNames[_key3] = arguments[_key3];
            }

            var className = classNames.join(' ');
            if (!className) {
                return factory;
            }
            return function () {
                return classNames + ' ' + factory.apply(undefined, arguments);
            };
        };
        return factory;
    },
    qa: function qa(blockName) {
        return bemFactory.block(blockName);
    }
};

exports.bem = bem;
exports['default'] = bemFactory;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.umd.js.map
