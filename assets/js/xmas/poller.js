;(function (window) {
  'use strict';

  var __LOG__ = window.__POLLER_DEBUG__;

  var DEFAULT_CONFIG = {
    url: null,
    onReady: true,
    multiVote: false,
    voted: false,
    points: false,
    validateConfig: function() {
      if (!Config.url) {
        var msg = 'PollerConfig.url property must be set.'
        msg    += " Make sure you've defined PollerConfig _before_ including poller.js"
        msg    += " Example: PollerConfig = { url: 'https://throwawaypoll.herokuapp.com' };"
        throw new Error(msg);
      }
    }
  };

  function buildResultUrl(url, id, points) {
    return url + '/result?question=' + id + '&points=' + points;
  }

  function formatAnswerParam(value) {
    if (Core.isPlainObject(value)) {
      Core.log('[formatAnswerParam] x/y point value:', value);
      return {
        points: true,
        x: value.x,
        y: value.y
      };
    } else {
      return {value: value};
    }
  }

  function Poller(options) {
    Core.log('[Poller] new with options', options);

    Config.validateConfig();

    var self = this;
    var opts = Core.merge(Config, options);

    self.voted = opts.voted;

    var id = opts.id;
    var multiVote = opts.multiVote;
    var resultUrl = buildResultUrl(Config.url, id, opts.points);
    var pollUrl = Config.url + '/poll';
    // Getters
    self.getId        = function() { return id;         };
    self.isMultiVote  = function() { return multiVote;  };
    self.isSingleVote = function() { return !multiVote; };
    self.pollUrl      = function() { return pollUrl;    };
    self.resultUrl    = function() { return resultUrl;  };
    self.hasVoted     = function() { return this.voted; };
  }

  Poller.prototype.submit = function(value, callback) {
    var self = this;
    var params = formatAnswerParam(value);
    params.question = self.getId();

    if (!self.hasVoted() || self.isMultiVote()) {
      Core.log('[Poller] submit: ', value);
      Core.getJSON(self.pollUrl(), params, callback);
    } else {
      Core.log('[Poller] submit ignored, already answered.');
    }
    self.voted = true;
  };

  Poller.prototype.result = function(callback) {
    Core.log('[Poller] result');
    Core.getJSON(this.resultUrl(), {}, callback);
  };

  var Core = {
    log: function() {
      if (__LOG__) {
        console.log.apply(console, arguments);
      }
    },
    isPlainObject: function(variable) {
      return $.isPlainObject(variable);
    },
    merge: function(obj1, obj2) {
      return $.extend(obj1, obj2);
    },
    getJSON: function(url, params, callback) {
      $.getJSON(url, params, function(json) {
        Core.log('[PollerCore] getJSON:', json);
        if (callback) {
          callback(json);
        }
      });
    }
  };

  var Config = Core.merge(DEFAULT_CONFIG, window.PollerConfig || {});

  window.PollerCore = Core;
  window.Poller = Poller;
  window.PollerConfig = Config;
}(window));
