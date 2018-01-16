/*
  new ProgressWidget({
    selector: '#test-counter',
    current: 690,
    target: 1000,
    text: 'registered',
    bgColor: 'pink',     // optional
    fillColor: 'black',  // optional
    textColor: 'green'   // optional
  });
*/
(function(window) {
  var progressTemplate = '<div class="counter-bg-base"> <div class="counter-bg-overlay"></div><div class="counter-bg-ring"> <p class="counter-number-large js-current-progress">0</p></div></div><p class="counter-summary"> <span class="primary-color js-current-progress">0</span>/<span id="js-counter-target"></span> <span id="js-counter-text"></span></p>';

  function calculateFillHeight(count, targetCount) {
    var pixelsPerPercentHeight = 2.61;
    var pixelOffsetBottom = 15;
    var maxHeight = 285;

    var percentFilled = (count / targetCount) * 100;
    var fillHeight = (percentFilled * pixelsPerPercentHeight) + pixelOffsetBottom;
    if (fillHeight > maxHeight || percentFilled >= 100) {
      return maxHeight;
    }
    return fillHeight;
  }

  function buildProgressWidget(selector, current, target, text, bgColor, fillColor, textColor) {
    var progressFillElement = document.querySelector(selector);
    if (progressFillElement === null) {
      console.log('[ProgressWidget] No element found for selector ', selector);
      return;
    }
    progressFillElement.innerHTML = progressTemplate;

    var backgroundElement = progressFillElement.querySelector('.counter-bg-base');
    var counterOverlayElement = progressFillElement.querySelector('.counter-bg-overlay');
    var counterElements = progressFillElement.querySelectorAll('.js-current-progress');
    var targetElement = progressFillElement.querySelector('#js-counter-target');
    var counterTextElement = progressFillElement.querySelector('#js-counter-text');
    var largeCounterElement = progressFillElement.querySelector('.counter-number-large');

    targetElement.innerText = target;
    counterTextElement.innerText = text;

    if (textColor) {
      largeCounterElement.style.color = textColor;
    }

    if (bgColor) {
      backgroundElement.style.backgroundColor = bgColor;
    }

    if (fillColor) {
      counterOverlayElement.style.backgroundColor = fillColor;
    }
    counterOverlayElement.style.height = calculateFillHeight(current, target) + 'px';

    counterElements.forEach(function(element) {
      element.innerText = current;
    });
  };

  window.ProgressWidget = function(options) {
    var selector = options.selector;
    var current = options.current;
    var target = options.target;
    var text = options.text;
    var bgColor = options.bgColor;
    var fillColor = options.fillColor;
    var textColor = options.textColor;

    buildProgressWidget(selector, current, target, text, bgColor, fillColor, textColor);
  }
})(window);
