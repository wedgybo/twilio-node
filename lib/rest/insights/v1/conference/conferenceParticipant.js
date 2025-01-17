'use strict';

/* jshint ignore:start */
/**
 * This code was generated by
 * \ / _    _  _|   _  _
 *  | (_)\/(_)(_|\/| |(/_  v1.0.0
 *       /       /
 */
/* jshint ignore:end */

var Q = require('q');  /* jshint ignore:line */
var _ = require('lodash');  /* jshint ignore:line */
var util = require('util');  /* jshint ignore:line */
var Page = require('../../../../base/Page');  /* jshint ignore:line */
var deserialize = require(
    '../../../../base/deserialize');  /* jshint ignore:line */
var values = require('../../../../base/values');  /* jshint ignore:line */

var ConferenceParticipantList;
var ConferenceParticipantPage;
var ConferenceParticipantInstance;
var ConferenceParticipantContext;

/* jshint ignore:start */
/**
 * Initialize the ConferenceParticipantList
 *
 * @constructor Twilio.Insights.V1.ConferenceContext.ConferenceParticipantList
 *
 * @param {Twilio.Insights.V1} version - Version of the resource
 * @param {string} conferenceSid - The conference_sid
 */
/* jshint ignore:end */
ConferenceParticipantList = function ConferenceParticipantList(version,
    conferenceSid) {
  /* jshint ignore:start */
  /**
   * @function conferenceParticipants
   * @memberof Twilio.Insights.V1.ConferenceContext#
   *
   * @param {string} sid - sid of instance
   *
   * @returns {Twilio.Insights.V1.ConferenceContext.ConferenceParticipantContext}
   */
  /* jshint ignore:end */
  function ConferenceParticipantListInstance(sid) {
    return ConferenceParticipantListInstance.get(sid);
  }

  ConferenceParticipantListInstance._version = version;
  // Path Solution
  ConferenceParticipantListInstance._solution = {conferenceSid: conferenceSid};
  ConferenceParticipantListInstance._uri = `/Conferences/${conferenceSid}/Participants`;
  /* jshint ignore:start */
  /**
   * Streams ConferenceParticipantInstance records from the API.
   *
   * This operation lazily loads records as efficiently as possible until the limit
   * is reached.
   *
   * The results are passed into the callback function, so this operation is memory
   * efficient.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @function each
   * @memberof Twilio.Insights.V1.ConferenceContext.ConferenceParticipantList#
   *
   * @param {object} [opts] - Options for request
   * @param {string} [opts.participantSid] - The participant_sid
   * @param {string} [opts.label] - The label
   * @param {string} [opts.events] - The events
   * @param {number} [opts.limit] -
   *         Upper limit for the number of records to return.
   *         each() guarantees never to return more than limit.
   *         Default is no limit
   * @param {number} [opts.pageSize] -
   *         Number of records to fetch per request,
   *         when not set will use the default value of 50 records.
   *         If no pageSize is defined but a limit is defined,
   *         each() will attempt to read the limit with the most efficient
   *         page size, i.e. min(limit, 1000)
   * @param {Function} [opts.callback] -
   *         Function to process each record. If this and a positional
   *         callback are passed, this one will be used
   * @param {Function} [opts.done] -
   *          Function to be called upon completion of streaming
   * @param {Function} [callback] - Function to process each record
   */
  /* jshint ignore:end */
  ConferenceParticipantListInstance.each = function each(opts, callback) {
    if (_.isFunction(opts)) {
      callback = opts;
      opts = {};
    }
    opts = opts || {};
    if (opts.callback) {
      callback = opts.callback;
    }
    if (_.isUndefined(callback)) {
      throw new Error('Callback function must be provided');
    }

    var done = false;
    var currentPage = 1;
    var currentResource = 0;
    var limits = this._version.readLimits({
      limit: opts.limit,
      pageSize: opts.pageSize
    });

    function onComplete(error) {
      done = true;
      if (_.isFunction(opts.done)) {
        opts.done(error);
      }
    }

    function fetchNextPage(fn) {
      var promise = fn();
      if (_.isUndefined(promise)) {
        onComplete();
        return;
      }

      promise.then(function(page) {
        _.each(page.instances, function(instance) {
          if (done || (!_.isUndefined(opts.limit) && currentResource >= opts.limit)) {
            done = true;
            return false;
          }

          currentResource++;
          callback(instance, onComplete);
        });

        if (!done) {
          currentPage++;
          fetchNextPage(_.bind(page.nextPage, page));
        } else {
          onComplete();
        }
      });

      promise.catch(onComplete);
    }

    fetchNextPage(_.bind(this.page, this, _.merge(opts, limits)));
  };

  /* jshint ignore:start */
  /**
   * Lists ConferenceParticipantInstance records from the API as a list.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @function list
   * @memberof Twilio.Insights.V1.ConferenceContext.ConferenceParticipantList#
   *
   * @param {object} [opts] - Options for request
   * @param {string} [opts.participantSid] - The participant_sid
   * @param {string} [opts.label] - The label
   * @param {string} [opts.events] - The events
   * @param {number} [opts.limit] -
   *         Upper limit for the number of records to return.
   *         list() guarantees never to return more than limit.
   *         Default is no limit
   * @param {number} [opts.pageSize] -
   *         Number of records to fetch per request,
   *         when not set will use the default value of 50 records.
   *         If no page_size is defined but a limit is defined,
   *         list() will attempt to read the limit with the most
   *         efficient page size, i.e. min(limit, 1000)
   * @param {function} [callback] - Callback to handle list of records
   *
   * @returns {Promise} Resolves to a list of records
   */
  /* jshint ignore:end */
  ConferenceParticipantListInstance.list = function list(opts, callback) {
    if (_.isFunction(opts)) {
      callback = opts;
      opts = {};
    }
    opts = opts || {};
    var deferred = Q.defer();
    var allResources = [];
    opts.callback = function(resource, done) {
      allResources.push(resource);

      if (!_.isUndefined(opts.limit) && allResources.length === opts.limit) {
        done();
      }
    };

    opts.done = function(error) {
      if (_.isUndefined(error)) {
        deferred.resolve(allResources);
      } else {
        deferred.reject(error);
      }
    };

    if (_.isFunction(callback)) {
      deferred.promise.nodeify(callback);
    }

    this.each(opts);
    return deferred.promise;
  };

  /* jshint ignore:start */
  /**
   * Retrieve a single page of ConferenceParticipantInstance records from the API.
   *
   * The request is executed immediately.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @function page
   * @memberof Twilio.Insights.V1.ConferenceContext.ConferenceParticipantList#
   *
   * @param {object} [opts] - Options for request
   * @param {string} [opts.participantSid] - The participant_sid
   * @param {string} [opts.label] - The label
   * @param {string} [opts.events] - The events
   * @param {string} [opts.pageToken] - PageToken provided by the API
   * @param {number} [opts.pageNumber] -
   *          Page Number, this value is simply for client state
   * @param {number} [opts.pageSize] - Number of records to return, defaults to 50
   * @param {function} [callback] - Callback to handle list of records
   *
   * @returns {Promise} Resolves to a list of records
   */
  /* jshint ignore:end */
  ConferenceParticipantListInstance.page = function page(opts, callback) {
    if (_.isFunction(opts)) {
      callback = opts;
      opts = {};
    }
    opts = opts || {};

    var deferred = Q.defer();
    var data = values.of({
      'ParticipantSid': _.get(opts, 'participantSid'),
      'Label': _.get(opts, 'label'),
      'Events': _.get(opts, 'events'),
      'PageToken': opts.pageToken,
      'Page': opts.pageNumber,
      'PageSize': opts.pageSize
    });

    var promise = this._version.page({uri: this._uri, method: 'GET', params: data});

    promise = promise.then(function(payload) {
      deferred.resolve(new ConferenceParticipantPage(this._version, payload, this._solution));
    }.bind(this));

    promise.catch(function(error) {
      deferred.reject(error);
    });

    if (_.isFunction(callback)) {
      deferred.promise.nodeify(callback);
    }

    return deferred.promise;
  };

  /* jshint ignore:start */
  /**
   * Retrieve a single target page of ConferenceParticipantInstance records from the
   * API.
   *
   * The request is executed immediately.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @function getPage
   * @memberof Twilio.Insights.V1.ConferenceContext.ConferenceParticipantList#
   *
   * @param {string} [targetUrl] - API-generated URL for the requested results page
   * @param {function} [callback] - Callback to handle list of records
   *
   * @returns {Promise} Resolves to a list of records
   */
  /* jshint ignore:end */
  ConferenceParticipantListInstance.getPage = function getPage(targetUrl,
      callback) {
    var deferred = Q.defer();

    var promise = this._version._domain.twilio.request({method: 'GET', uri: targetUrl});

    promise = promise.then(function(payload) {
      deferred.resolve(new ConferenceParticipantPage(this._version, payload, this._solution));
    }.bind(this));

    promise.catch(function(error) {
      deferred.reject(error);
    });

    if (_.isFunction(callback)) {
      deferred.promise.nodeify(callback);
    }

    return deferred.promise;
  };

  /* jshint ignore:start */
  /**
   * Constructs a conference_participant
   *
   * @function get
   * @memberof Twilio.Insights.V1.ConferenceContext.ConferenceParticipantList#
   *
   * @param {string} participantSid - The participant_sid
   *
   * @returns {Twilio.Insights.V1.ConferenceContext.ConferenceParticipantContext}
   */
  /* jshint ignore:end */
  ConferenceParticipantListInstance.get = function get(participantSid) {
    return new ConferenceParticipantContext(
      this._version,
      this._solution.conferenceSid,
      participantSid
    );
  };

  /* jshint ignore:start */
  /**
   * Provide a user-friendly representation
   *
   * @function toJSON
   * @memberof Twilio.Insights.V1.ConferenceContext.ConferenceParticipantList#
   *
   * @returns Object
   */
  /* jshint ignore:end */
  ConferenceParticipantListInstance.toJSON = function toJSON() {
    return this._solution;
  };

  ConferenceParticipantListInstance[util.inspect.custom] = function inspect(depth,
      options) {
    return util.inspect(this.toJSON(), options);
  };

  return ConferenceParticipantListInstance;
};


/* jshint ignore:start */
/**
 * Initialize the ConferenceParticipantPage
 *
 * @constructor Twilio.Insights.V1.ConferenceContext.ConferenceParticipantPage
 *
 * @param {V1} version - Version of the resource
 * @param {Response<string>} response - Response from the API
 * @param {ConferenceParticipantSolution} solution - Path solution
 *
 * @returns ConferenceParticipantPage
 */
/* jshint ignore:end */
ConferenceParticipantPage = function ConferenceParticipantPage(version,
    response, solution) {
  // Path Solution
  this._solution = solution;

  Page.prototype.constructor.call(this, version, response, this._solution);
};

_.extend(ConferenceParticipantPage.prototype, Page.prototype);
ConferenceParticipantPage.prototype.constructor = ConferenceParticipantPage;

/* jshint ignore:start */
/**
 * Build an instance of ConferenceParticipantInstance
 *
 * @function getInstance
 * @memberof Twilio.Insights.V1.ConferenceContext.ConferenceParticipantPage#
 *
 * @param {ConferenceParticipantPayload} payload - Payload response from the API
 *
 * @returns ConferenceParticipantInstance
 */
/* jshint ignore:end */
ConferenceParticipantPage.prototype.getInstance = function getInstance(payload)
    {
  return new ConferenceParticipantInstance(this._version, payload, this._solution.conferenceSid);
};

/* jshint ignore:start */
/**
 * Provide a user-friendly representation
 *
 * @function toJSON
 * @memberof Twilio.Insights.V1.ConferenceContext.ConferenceParticipantPage#
 *
 * @returns Object
 */
/* jshint ignore:end */
ConferenceParticipantPage.prototype.toJSON = function toJSON() {
  let clone = {};
  _.forOwn(this, function(value, key) {
    if (!_.startsWith(key, '_') && ! _.isFunction(value)) {
      clone[key] = value;
    }
  });
  return clone;
};

ConferenceParticipantPage.prototype[util.inspect.custom] = function
    inspect(depth, options) {
  return util.inspect(this.toJSON(), options);
};


/* jshint ignore:start */
/**
 * Initialize the ConferenceParticipantContext
 *
 * @constructor Twilio.Insights.V1.ConferenceContext.ConferenceParticipantInstance
 *
 * @property {string} participantSid - The participant_sid
 * @property {string} label - The label
 * @property {string} conferenceSid - The conference_sid
 * @property {string} callSid - The call_sid
 * @property {string} accountSid - The account_sid
 * @property {conference_participant.call_direction} callDirection -
 *          The call_direction
 * @property {string} from - The from
 * @property {string} to - The to
 * @property {conference_participant.call_state} callState - The call_state
 * @property {string} countryCode - The country_code
 * @property {boolean} isModerator - The is_moderator
 * @property {Date} joinTime - The join_time
 * @property {Date} leaveTime - The leave_time
 * @property {number} durationSeconds - The duration_seconds
 * @property {string} whisper - The whisper
 * @property {boolean} agentAudio - The agent_audio
 * @property {number} outboundQueueLength - The outbound_queue_length
 * @property {number} outboundTimeInQueue - The outbound_time_in_queue
 * @property {conference_participant.jitter_buffer_size} jitterBufferSize -
 *          The jitter_buffer_size
 * @property {boolean} isCoach - The is_coach
 * @property {string} coachedParticipants - The coached_participants
 * @property {conference_participant.region} participantRegion -
 *          The participant_region
 * @property {conference_participant.region} conferenceRegion -
 *          The conference_region
 * @property {conference_participant.call_type} callType - The call_type
 * @property {number} qualityIssues - The quality_issues
 * @property {object} properties - The properties
 * @property {object} events - The events
 * @property {object} metrics - The metrics
 * @property {string} url - The url
 *
 * @param {V1} version - Version of the resource
 * @param {ConferenceParticipantPayload} payload - The instance payload
 * @param {sid} conferenceSid - The conference_sid
 * @param {sid} participantSid - The participant_sid
 */
/* jshint ignore:end */
ConferenceParticipantInstance = function ConferenceParticipantInstance(version,
    payload, conferenceSid, participantSid) {
  this._version = version;

  // Marshaled Properties
  this.participantSid = payload.participant_sid; // jshint ignore:line
  this.label = payload.label; // jshint ignore:line
  this.conferenceSid = payload.conference_sid; // jshint ignore:line
  this.callSid = payload.call_sid; // jshint ignore:line
  this.accountSid = payload.account_sid; // jshint ignore:line
  this.callDirection = payload.call_direction; // jshint ignore:line
  this.from = payload.from; // jshint ignore:line
  this.to = payload.to; // jshint ignore:line
  this.callState = payload.call_state; // jshint ignore:line
  this.countryCode = payload.country_code; // jshint ignore:line
  this.isModerator = payload.is_moderator; // jshint ignore:line
  this.joinTime = deserialize.iso8601DateTime(payload.join_time); // jshint ignore:line
  this.leaveTime = deserialize.iso8601DateTime(payload.leave_time); // jshint ignore:line
  this.durationSeconds = deserialize.integer(payload.duration_seconds); // jshint ignore:line
  this.whisper = payload.whisper; // jshint ignore:line
  this.agentAudio = payload.agent_audio; // jshint ignore:line
  this.outboundQueueLength = deserialize.integer(payload.outbound_queue_length); // jshint ignore:line
  this.outboundTimeInQueue = deserialize.integer(payload.outbound_time_in_queue); // jshint ignore:line
  this.jitterBufferSize = payload.jitter_buffer_size; // jshint ignore:line
  this.isCoach = payload.is_coach; // jshint ignore:line
  this.coachedParticipants = payload.coached_participants; // jshint ignore:line
  this.participantRegion = payload.participant_region; // jshint ignore:line
  this.conferenceRegion = payload.conference_region; // jshint ignore:line
  this.callType = payload.call_type; // jshint ignore:line
  this.qualityIssues = deserialize.integer(payload.quality_issues); // jshint ignore:line
  this.properties = payload.properties; // jshint ignore:line
  this.events = payload.events; // jshint ignore:line
  this.metrics = payload.metrics; // jshint ignore:line
  this.url = payload.url; // jshint ignore:line

  // Context
  this._context = undefined;
  this._solution = {
    conferenceSid: conferenceSid,
    participantSid: participantSid || this.participantSid,
  };
};

Object.defineProperty(ConferenceParticipantInstance.prototype,
  '_proxy', {
    get: function() {
      if (!this._context) {
        this._context = new ConferenceParticipantContext(
          this._version,
          this._solution.conferenceSid,
          this._solution.participantSid
        );
      }

      return this._context;
    }
});

/* jshint ignore:start */
/**
 * fetch a ConferenceParticipantInstance
 *
 * @function fetch
 * @memberof Twilio.Insights.V1.ConferenceContext.ConferenceParticipantInstance#
 *
 * @param {object} [opts] - Options for request
 * @param {string} [opts.events] - The events
 * @param {string} [opts.metrics] - The metrics
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed ConferenceParticipantInstance
 */
/* jshint ignore:end */
ConferenceParticipantInstance.prototype.fetch = function fetch(opts, callback) {
  return this._proxy.fetch(opts, callback);
};

/* jshint ignore:start */
/**
 * Provide a user-friendly representation
 *
 * @function toJSON
 * @memberof Twilio.Insights.V1.ConferenceContext.ConferenceParticipantInstance#
 *
 * @returns Object
 */
/* jshint ignore:end */
ConferenceParticipantInstance.prototype.toJSON = function toJSON() {
  let clone = {};
  _.forOwn(this, function(value, key) {
    if (!_.startsWith(key, '_') && ! _.isFunction(value)) {
      clone[key] = value;
    }
  });
  return clone;
};

ConferenceParticipantInstance.prototype[util.inspect.custom] = function
    inspect(depth, options) {
  return util.inspect(this.toJSON(), options);
};


/* jshint ignore:start */
/**
 * Initialize the ConferenceParticipantContext
 *
 * @constructor Twilio.Insights.V1.ConferenceContext.ConferenceParticipantContext
 *
 * @param {V1} version - Version of the resource
 * @param {sid} conferenceSid - The conference_sid
 * @param {sid} participantSid - The participant_sid
 */
/* jshint ignore:end */
ConferenceParticipantContext = function ConferenceParticipantContext(version,
    conferenceSid, participantSid) {
  this._version = version;

  // Path Solution
  this._solution = {conferenceSid: conferenceSid, participantSid: participantSid, };
  this._uri = `/Conferences/${conferenceSid}/Participants/${participantSid}`;
};

/* jshint ignore:start */
/**
 * fetch a ConferenceParticipantInstance
 *
 * @function fetch
 * @memberof Twilio.Insights.V1.ConferenceContext.ConferenceParticipantContext#
 *
 * @param {object} [opts] - Options for request
 * @param {string} [opts.events] - The events
 * @param {string} [opts.metrics] - The metrics
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed ConferenceParticipantInstance
 */
/* jshint ignore:end */
ConferenceParticipantContext.prototype.fetch = function fetch(opts, callback) {
  if (_.isFunction(opts)) {
    callback = opts;
    opts = {};
  }
  opts = opts || {};

  var deferred = Q.defer();
  var data = values.of({'Events': _.get(opts, 'events'), 'Metrics': _.get(opts, 'metrics')});

  var promise = this._version.fetch({uri: this._uri, method: 'GET', params: data});

  promise = promise.then(function(payload) {
    deferred.resolve(new ConferenceParticipantInstance(
      this._version,
      payload,
      this._solution.conferenceSid,
      this._solution.participantSid
    ));
  }.bind(this));

  promise.catch(function(error) {
    deferred.reject(error);
  });

  if (_.isFunction(callback)) {
    deferred.promise.nodeify(callback);
  }

  return deferred.promise;
};

/* jshint ignore:start */
/**
 * Provide a user-friendly representation
 *
 * @function toJSON
 * @memberof Twilio.Insights.V1.ConferenceContext.ConferenceParticipantContext#
 *
 * @returns Object
 */
/* jshint ignore:end */
ConferenceParticipantContext.prototype.toJSON = function toJSON() {
  return this._solution;
};

ConferenceParticipantContext.prototype[util.inspect.custom] = function
    inspect(depth, options) {
  return util.inspect(this.toJSON(), options);
};

module.exports = {
  ConferenceParticipantList: ConferenceParticipantList,
  ConferenceParticipantPage: ConferenceParticipantPage,
  ConferenceParticipantInstance: ConferenceParticipantInstance,
  ConferenceParticipantContext: ConferenceParticipantContext
};
