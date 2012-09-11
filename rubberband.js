/**
* RubberBand
* A responsive web design tool
* ver - 0.1.8
* 11/09/2012
* Adam Johnston
* rubberband.adamjohnston.co.uk
*/

/**
 * Returns RubberBand for the user.
 * @param  {object}   window
 * @param  {object}   document  
 * @return {object}
 */
var rubberband = (function (window, document) {

  'use strict';

  var options = { hideColumns: false, hideLines: false, showAlways: false, mobileLandscape: 640, mobilePortrait: 480, tabletLandscape: 1024, tabletPortrait: 768 }, rbValue,

    /**
     * Converts a pixel value to an em value.
     * @param  {number}   px
     * @return {number}
     */
    pxToEm = function (px) {
      if (typeof px === 'number') {
        return px / rbValue.fontSize;
      }
    },

    /**
     * Returns a DOM element.
     * @param   {string}  element
     * @return  {object}
     */
    get = function (element) {
      return document.getElementById(element);
    },

    /**
     * Gets or sets a localStorage key, value
     * @param  {string}   key
     * @param  {boolean}  value
     * @return {string}
     */
    storage = function (key, value) {
      try {
        if (typeof value === 'boolean') {
          localStorage.setItem(key, value);
        } else {
          return localStorage.getItem(key);
        }
      } catch (error) {}
    },

    showAlways = function () {
      get('rb-tools').className += 'show';
    },

    addCSS = function () {
      document.getElementsByTagName('head')[0].insertAdjacentHTML('beforeend', ' <link rel="stylesheet" data-rel="RubberBand" href="http://adamjohnston.co.uk/rubberband/stylesheets/rubberband.min.css?v=1" media="screen" /><style data-rel="RubberBand">#rb-col-left div{right:-' + pxToEm(rbValue.lineHeight) / 2 + 'em}#rb-col-right div{left:-' + pxToEm(rbValue.lineHeight) / 2 + 'em}.rb-col{margin-left:-' + pxToEm(rbValue.lineHeight) / 2 + 'em}.rb-col div{border-width:0 ' + pxToEm(rbValue.lineHeight) / 2 + 'em}</style>');
    },

    addHTML = function () {
      document.body.insertAdjacentHTML('beforeend', '<div id="rb-cols"><div id="rb-col-left" class="rb-col"><div></div></div><div id="rb-col-2" class="rb-col"><div></div></div><div id="rb-col-3" class="rb-col"><div></div></div><div id="rb-col-4" class="rb-col"><div></div></div><div id="rb-col-5" class="rb-col"><div></div></div><div id="rb-col-6" class="rb-col"><div></div></div><div id="rb-col-7" class="rb-col"><div></div></div><div id="rb-col-8" class="rb-col"><div></div></div><div id="rb-col-centre" class="rb-col"><div></div></div><div id="rb-col-10" class="rb-col"><div></div></div><div id="rb-col-11" class="rb-col"><div></div></div><div id="rb-col-12" class="rb-col"><div></div></div><div id="rb-col-13" class="rb-col"><div></div></div><div id="rb-col-14" class="rb-col"><div></div></div><div id="rb-col-15" class="rb-col"><div></div></div><div id="rb-col-16" class="rb-col"><div></div></div><div id="rb-col-right" class="rb-col"><div></div></div></div><div id="rb-lines"></div><div id="rb-tools"><div id="rb-header"><img src="http://adamjohnston.co.uk/rubberband/images/logo.png" alt="RubberBand" width="152" height="51" /></div><div id="rb-guide-toggle"><h1>toggle guide</h1><div class="rb-wrapper"><button id="rb-guide-on" role="button">on</button><button id="rb-guide-off" role="button">off</button></div></div><div id="rb-view-toggle"><h1>toggle view</h1><div class="rb-wrapper"><button id="rb-view-desktop" title="view desktop" role="button"><img src="http://adamjohnston.co.uk/rubberband/images/buttons/desktop.png" alt="desktop" width="20" height="22" /></button><button id="rb-view-tablet-portrait" title="view tablet portrait" role="button"><img src="http://adamjohnston.co.uk/rubberband/images/buttons/tablet_portrait.png" alt="tablet portrait" width="20" height="22" /></button><button id="rb-view-tablet-landscape" title="view tablet landscape" role="button"><img src="http://adamjohnston.co.uk/rubberband/images/buttons/tablet_landscape.png" alt="tablet landscape" width="20" height="22" /></button><button id="rb-view-mobile-portrait" title="view mobile portrait" role="button"><img src="http://adamjohnston.co.uk/rubberband/images/buttons/mobile_portrait.png" alt="mobile portrait" width="20" height="22" /></button><button id="rb-view-mobile-landscape" title="view mobile landscape" role="button"><img src="http://adamjohnston.co.uk/rubberband/images/buttons/mobile_landscape.png" alt="mobile landscape" width="20" height="22" /></button></div></div><div id="rb-font-size-line-height"><h1>font-size / line-height</h1><p><span id="rb-font-size">?</span> / <span id="rb-line-height">?</span></p></div><div id="rb-width-height"><h1>width / height</h1><p><span id="rb-width">?</span> / <span id="rb-height">?</span></p></div><div id="rb-calculator"><h1>calculator</h1><div class="rb-wrapper"><input id="rb-desired-font-size" placeholder="??px" /><button id="rb-calculate" title="calculate" role="button"><img src="http://adamjohnston.co.uk/rubberband/images/buttons/calculate.png" alt="calculate" width="21" height="21" /></button></div><p>font-size : <span id="rb-new-font-size">?</span></p><p>line-height : <span id="rb-new-line-height">?</span></p><p>padding : <span id="rb-new-padding">?</span></p><p>single line : <span id="rb-new-single-line">?</span></p><textarea id="rb-new-css" placeholder="CSS will be generated here for easy copy and paste"></textarea></div></div>');
    },

    addLines = function () {
      var i = 1, lineHTML = '', numOfLines = (rbValue.winHeight > rbValue.docHeight) ? rbValue.winHeight : rbValue.docHeight;

      for (i; i <= Math.floor(numOfLines / rbValue.lineHeight); i += 1) {
        lineHTML += '<div>' + i + '</div>';
      }

      get('rb-lines').innerHTML = lineHTML;
    },

    addValues = function () {
      get('rb-width').innerHTML = rbValue.docWidth + 'px';
      get('rb-height').innerHTML = rbValue.winHeight + 'px';
      get('rb-font-size').innerHTML = rbValue.fontSize + 'px';
      get('rb-line-height').innerHTML = String(pxToEm(rbValue.lineHeight)).substr(0, 7) + 'em';
    },

    /**
     * Calculates the user input and outputs various calculations.
     * @param   {string}  userValue
     */
    calculate = function (userValue) {
      var userFontSize = parseInt(userValue, 10), newFontSize = userFontSize / rbValue.fontSize, multiplier = Math.round(newFontSize), newLineHeight = ((rbValue.fontSize / userFontSize) * rbValue.lineHeight * multiplier) / rbValue.fontSize,
        /**
         * Returns a formatted string suffixed with a unit.
         * @param   {number}   intValue
         * @param   {number}   limit
         * @param   {string}   unit
         * @return  {string}
         */
        stringFormat = function (intValue, limit, unit) {
          intValue = String(intValue).substr(0, limit);
          intValue = parseFloat(intValue);
          intValue = intValue.toString() + unit;
          return intValue;
        };

      if (userFontSize) {
        get('rb-new-font-size').innerHTML = stringFormat(newFontSize, 6, 'em');
        get('rb-new-line-height').innerHTML = stringFormat(newLineHeight, 6, 'em');
        get('rb-new-padding').innerHTML = stringFormat((newLineHeight / multiplier) / 2, 6, 'em');
        get('rb-new-single-line').innerHTML = stringFormat(rbValue.lineHeight / rbValue.fontSize / newFontSize, 6, 'em');
        get('rb-new-css').value = 'margin: ' + stringFormat((rbValue.lineHeight / rbValue.fontSize) / newFontSize, 6, 'em ') + '0; padding: 0 ' + stringFormat((newLineHeight / multiplier) / 2, 6, 'em; ') + 'font-size: ' + stringFormat(newFontSize, 6, 'em; ') + 'line-height: ' + stringFormat(newLineHeight, 6, 'em; ');
      } else {
        window.alert('Error! Please make sure you enter a number');
      }
    },

    /**
     * Toggles the RubberBand column and line guide.
     * @param  {boolean}  showGuide
     */
    guideToggle = function (showGuide) {
      var a = { rbCols: get('rb-cols'), rbLines: get('rb-lines') }, i, rbGuideOff = get('rb-guide-off'), rbGuideOn = get('rb-guide-on');

      if (showGuide) {
        rbGuideOn.className = 'rb-active';
        rbGuideOff.className = null;
      } else {
        rbGuideOff.className = 'rb-active';
        rbGuideOn.className = null;
      }

      for (i in a) {
        if (a.hasOwnProperty(i)) {
          if (showGuide) {
            a[i].style.opacity = 1;
            a[i].style.zIndex = 1000000;
          } else {
            a[i].style.opacity = 0;
            a[i].style.zIndex = -1;
          }
        }
      }

      storage('rbGuideOn', showGuide);
    },

    guideToggleCheck = function () {
      if (storage('rbGuideOn') === 'true') {
        guideToggle(true);
      } else {
        guideToggle(false);
      }
    },

    /**
     * Hides a specified RubberBand element.
     * @param   {string}  element
     */
    hideElement = function (element) {
      get('rb-' + element).style.display = 'none';
    },

    scrollBarAdjust = function (viewportSize) {
      var a = parseInt(viewportSize, 10);

      if (window.document.body.clientHeight > window.innerHeight) {
        a = a + 16;
      }

      return a;
    },

    /**
     * Overwrites any default options set by the user.
     * @param   {object}  userOptions
     */
    setOptions = function (userOptions) {
      if (typeof userOptions === 'object') {
        var i;

        for (i in userOptions) {
          if (userOptions.hasOwnProperty(i)) {
            options[i] = userOptions[i];
          }
        }

        (function () {
          var i;

          for (i in options) {
            if (options.hasOwnProperty(i)) {
              if (i === 'showAlways' && options[i] === true) {
                showAlways();
              } else if (i === 'hideColumns' && options[i] === true) {
                hideElement('cols');
              } else if (i === 'hideLines' && options[i] === true) {
                hideElement('lines');
              }
            }
          }
        }());

        return options;
      }
    },

    rbValues = function () {
      var fontSize = function() {
            var fontSize;

            try { 
              fontSize = window.getComputedStyle(document.body).fontSize;
            } catch (e) { 
              fontSize = document.body.currentStyle.fontSize;
            }

            return parseInt(fontSize, 10);
          },
          lineHeight = function () {
            var lineHeight;

            try {
              lineHeight = window.getComputedStyle(document.body).lineHeight;
            } catch (e) {
              lineHeight = document.body.currentStyle.lineHeight;
            }

            return parseInt(lineHeight, 10);
          };

      rbValue = { winHeight: window.innerHeight, docWidth: document.body.clientWidth, docHeight: document.body.clientHeight, fontSize: fontSize(), lineHeight: lineHeight() };
    },

    /**
     * Toggles the RubberBand viewport iframe.
     * @param   {boolean}  showView
     * @param   {number}   viewportSize
     */
    viewToggle = function (showView, viewportSize) {
      var a = { rbFrame: get('rb-frame'), rbOverlay: get('rb-overlay') }, i,
        viewStyling = function () {
          var a = get('rb-frame');

          if (a) {
            (function (callback) {
              a.hidden = true;
              callback();
            }(function () {
              a.style.width = scrollBarAdjust(viewportSize) + 'px';
              a.style.left = (((rbValue.docWidth - parseInt(viewportSize, 10)) / 2) / rbValue.docWidth) * 100 + '%';
              a.hidden = false;
            }));
          }
        };

      if (showView) {
        if (!get('rb-frame')) {
          document.body.insertAdjacentHTML('afterbegin', '<div id="rb-overlay"></div><iframe id="rb-frame" name="rb-frame" src="' + document.URL + '?id=rb-copy" width="0" height="0"></iframe>');
        }
      }

      viewStyling();

      for (i in a) {
        if (a.hasOwnProperty(i) && !showView) {
          try {
            document.body.removeChild(a[i]);
            storage('rbViewOn', false);
          } catch (errorA) {}
        }
      }

      try {
        localStorage.setItem('rbViewport', viewportSize);
      } catch (errorB) {}
    };

  window.onload = (function () { return [rbValues(), addCSS(), addHTML(), addValues(), addLines(), guideToggleCheck()]; }());

  window.onresize = function () { return [rbValues(), addValues(), addLines()]; };


  get('rb-guide-on').onclick = function () { guideToggle(true); };

  get('rb-guide-off').onclick = function () { guideToggle(false); };

  get('rb-view-desktop').onclick = function () { viewToggle(false, 0); };

  get('rb-view-mobile-landscape').onclick = function () { viewToggle(true, options.mobileLandscape); };

  get('rb-view-mobile-portrait').onclick = function () { viewToggle(true, options.mobilePortrait); };

  get('rb-view-tablet-landscape').onclick = function () { viewToggle(true, options.tabletLandscape); };

  get('rb-view-tablet-portrait').onclick = function () { viewToggle(true, options.tabletPortrait); };

  get('rb-calculate').onclick = function () { calculate(get('rb-desired-font-size').value); };

  get('rb-desired-font-size').onkeypress = function (e) {
    if (e.which === 13) {
      calculate(get('rb-desired-font-size').value);
    }
  };

  return {
    options: setOptions,
    init: (function () {
      var a, i, aTags = document.getElementsByTagName('a');

      try {
        a = localStorage.getItem('rbViewport');
      } catch (errorA) {}

      if (storage('rbViewOn') === 'true') {
        viewToggle(true, a);

        storage('rbViewOn', false);
      }

      if (window.name === 'rb-frame') {
        get('rb-view-toggle').style.visibility = 'hidden';
        get('rb-font-size-line-height').style.top = '-56px';
        get('rb-calculator').style.top = '-56px';
        get('rb-width-height').style.top = '-56px';

        for (i in aTags) {
          if (aTags.hasOwnProperty(i)) {
            aTags[i].href = '#';
          }
        }

        storage('rbViewOn', true);
      }

      return true;
    }())
  };

}(window, document));