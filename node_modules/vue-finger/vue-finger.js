;(function () {

  var vueFinger = {}
  var AlloyFinger = typeof require === 'function'
    ? require('alloyfinger')
    : window.AlloyFinger
  var gestures = {
    touchstart: 'touchStart',
    touchmove: 'touchMove',
    touchend: 'touchEnd',
    touchcancel: 'touchCancel',
    multipointstart: 'multipointStart',
    multipointend: 'multipointEnd',
    tap: 'tap',
    doubletap: 'doubleTap',
    longtap: 'longTap',
    singletap: 'singleTap',
    rotate: 'rotate',
    pinch: 'pinch',
    pressmove: 'pressMove',
    swipe: 'swipe'
  }

  if (!AlloyFinger) {
    throw new Error('[vue-touch] cannot locate alloyfinger.')
  }

  // exposed global options
  vueFinger.config = {}
  vueFinger.install = function (Vue) {
    Vue.directive('finger', {
      bind: function (el, binding) {
        var event = binding.arg
        var fn = binding.value
        var gs = Object.keys( gestures )
        var recognizerType, i
        if (!event) {
          console.warn('[vue-finger] event type argument is required.')
        } else if (typeof fn !== 'function') {
          console.warn(
            '[vue-finger] invalid handler function for v-finger: ' +
            event + '="' + fn
          )
          return
        } else {
          for (i = 0; i < gs.length; i++) {
            if (event.indexOf(gs[i]) === 0) {
              recognizerType = gestures[gs[i]]
              break
            }
          }
          if (!recognizerType) {
            console.warn('[vue-finger] invalid event type: ' + event)
            return
          }
        }

        // built-in event
        if (!el.alloyfinger) {
          el.alloyfinger = new AlloyFinger(el, _defineProperty({}, recognizerType, fn))
        } else {
          el.alloyfinger[recognizerType] = fn
        }
      },

      unbind: function (el) {
        el.alloyfinger = null
      }
    })
  }

  /**
   * Register a custom event.
   *
   * @param {String} event
   * @param {Object} options - a Hammer.js recognizer option object.
   *                           required fields:
   *                           - type: the base recognizer to use for this event
   */

  function _defineProperty (obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true })
    } else {
      obj[key] = value;
    }
    return obj
  }

  if (typeof exports == "object") {
    module.exports = vueFinger
  } else if (typeof define == "function" && define.amd) {
    define([], function(){ return vueFinger })
  } else if (window.Vue) {
    window.VueFinger = vueFinger
    Vue.use(vueFinger)
  }

})()
