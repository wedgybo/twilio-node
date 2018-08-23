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
var Page = require('../../../../../base/Page');  /* jshint ignore:line */
var values = require('../../../../../base/values');  /* jshint ignore:line */

var ExecutionContextList;
var ExecutionContextPage;
var ExecutionContextInstance;
var ExecutionContextContext;

/* jshint ignore:start */
/**
 * @description Initialize the ExecutionContextList
 *
 * @param {Twilio.Studio.V1} version - Version of the resource
 * @param {string} flowSid - Flow Sid.
 * @param {string} executionSid - Execution Sid.
 */
/* jshint ignore:end */
ExecutionContextList = function ExecutionContextList(version, flowSid,
                                                      executionSid) {
  /* jshint ignore:start */
  /**
   * @param {string} sid - sid of instance
   *
   * @returns {Twilio.Studio.V1.FlowContext.ExecutionContext.ExecutionContextContext}
   */
  /* jshint ignore:end */
  function ExecutionContextListInstance(sid) {
    return ExecutionContextListInstance.get(sid);
  }

  ExecutionContextListInstance._version = version;
  // Path Solution
  ExecutionContextListInstance._solution = {flowSid: flowSid, executionSid: executionSid};
  /* jshint ignore:start */
  /**
   * Constructs a execution_context
   *
   * @returns {Twilio.Studio.V1.FlowContext.ExecutionContext.ExecutionContextContext}
   */
  /* jshint ignore:end */
  ExecutionContextListInstance.get = function get() {
    return new ExecutionContextContext(
      this._version,
      this._solution.flowSid,
      this._solution.executionSid
    );
  };

  return ExecutionContextListInstance;
};


/* jshint ignore:start */
/**
 * Initialize the ExecutionContextPage
 *
 * @param {V1} version - Version of the resource
 * @param {Response<string>} response - Response from the API
 * @param {ExecutionContextSolution} solution - Path solution
 *
 * @returns ExecutionContextPage
 */
/* jshint ignore:end */
ExecutionContextPage = function ExecutionContextPage(version, response,
                                                      solution) {
  // Path Solution
  this._solution = solution;

  Page.prototype.constructor.call(this, version, response, this._solution);
};

_.extend(ExecutionContextPage.prototype, Page.prototype);
ExecutionContextPage.prototype.constructor = ExecutionContextPage;

/* jshint ignore:start */
/**
 * Build an instance of ExecutionContextInstance
 *
 * @param {ExecutionContextPayload} payload - Payload response from the API
 *
 * @returns ExecutionContextInstance
 */
/* jshint ignore:end */
ExecutionContextPage.prototype.getInstance = function getInstance(payload) {
  return new ExecutionContextInstance(
    this._version,
    payload,
    this._solution.flowSid,
    this._solution.executionSid
  );
};


/* jshint ignore:start */
/**
 * Initialize the ExecutionContextContext
 *
 * @property {string} accountSid - Account Sid.
 * @property {string} context - Flow state.
 * @property {string} flowSid - Flow Sid.
 * @property {string} executionSid - Execution Sid.
 * @property {string} url - The URL of this resource.
 *
 * @param {V1} version - Version of the resource
 * @param {ExecutionContextPayload} payload - The instance payload
 * @param {sid} flowSid - Flow Sid.
 * @param {sid} executionSid - Execution Sid.
 */
/* jshint ignore:end */
ExecutionContextInstance = function ExecutionContextInstance(version, payload,
    flowSid, executionSid) {
  this._version = version;

  // Marshaled Properties
  this.accountSid = payload.account_sid; // jshint ignore:line
  this.context = payload.context; // jshint ignore:line
  this.flowSid = payload.flow_sid; // jshint ignore:line
  this.executionSid = payload.execution_sid; // jshint ignore:line
  this.url = payload.url; // jshint ignore:line

  // Context
  this._context = undefined;
  this._solution = {flowSid: flowSid, executionSid: executionSid, };
};

Object.defineProperty(ExecutionContextInstance.prototype,
  '_proxy', {
  get: function() {
    if (!this._context) {
      this._context = new ExecutionContextContext(
        this._version,
        this._solution.flowSid,
        this._solution.executionSid
      );
    }

    return this._context;
  }
});

/* jshint ignore:start */
/**
 * fetch a ExecutionContextInstance
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed ExecutionContextInstance
 */
/* jshint ignore:end */
ExecutionContextInstance.prototype.fetch = function fetch(callback) {
  return this._proxy.fetch(callback);
};

/* jshint ignore:start */
/**
 * Produce a plain JSON object version of the ExecutionContextInstance for serialization.
 * Removes any circular references in the object.
 *
 * @returns Object
 */
/* jshint ignore:end */
ExecutionContextInstance.prototype.toJSON = function toJSON() {
  let clone = {};
  _.forOwn(this, function(value, key) {
    if (!_.startsWith(key, '_') && ! _.isFunction(value)) {
      clone[key] = value;
    }
  });
  return clone;
};


/* jshint ignore:start */
/**
 * Initialize the ExecutionContextContext
 *
 * @param {V1} version - Version of the resource
 * @param {sid} flowSid - Flow Sid.
 * @param {sid} executionSid - Execution Sid.
 */
/* jshint ignore:end */
ExecutionContextContext = function ExecutionContextContext(version, flowSid,
                                                            executionSid) {
  this._version = version;

  // Path Solution
  this._solution = {flowSid: flowSid, executionSid: executionSid, };
  this._uri = _.template(
    '/Flows/<%= flowSid %>/Executions/<%= executionSid %>/Context' // jshint ignore:line
  )(this._solution);
};

/* jshint ignore:start */
/**
 * fetch a ExecutionContextInstance
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed ExecutionContextInstance
 */
/* jshint ignore:end */
ExecutionContextContext.prototype.fetch = function fetch(callback) {
  var deferred = Q.defer();
  var promise = this._version.fetch({uri: this._uri, method: 'GET'});

  promise = promise.then(function(payload) {
    deferred.resolve(new ExecutionContextInstance(
      this._version,
      payload,
      this._solution.flowSid,
      this._solution.executionSid
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

module.exports = {
  ExecutionContextList: ExecutionContextList,
  ExecutionContextPage: ExecutionContextPage,
  ExecutionContextInstance: ExecutionContextInstance,
  ExecutionContextContext: ExecutionContextContext
};