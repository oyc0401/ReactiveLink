/**
 * @module StateStore
 * @description A reactive state management store with event handling capabilities
 */

class StateStore {
  /**
   * Creates a new StateStore instance
   * @param {Object} initialState - Initial state object
   */
  constructor(initialState = {}) {
    this.state = initialState;
    this.listeners = {};
    this.mappings = {};
  }

  /**
   * Updates multiple state properties at once
   * @param {Object} newState - Object containing new state values
   */
  changeState(newState) {
    Object.assign(this.state, newState);
  }

  /**
   * Registers event listeners
   * @param {string} eventNames - Space-separated event names
   * @param {Function} callback - Callback function to execute
   */
  on(eventNames, callback) {
    const events = eventNames.split(" ").filter((event) => event.trim() !== "");
    events.forEach((eventName) => {
      if (!this.listeners[eventName]) {
        this.listeners[eventName] = [];
      }
      this.listeners[eventName].push(callback);
    });
  }

  /**
   * Removes an event listener
   * @param {string} eventName - Name of the event
   * @param {Function} callback - Callback function to remove
   */
  off(eventName, callback) {
    if (this.listeners[eventName]) {
      this.listeners[eventName] = this.listeners[eventName].filter(
        (cb) => cb !== callback
      );
    }
  }

  /**
   * Emits an event with data
   * @param {string} eventName - Name of the event to emit
   * @param {*} data - Data to pass to event listeners
   */
  emit(eventName, data) {
    if (this.listeners[eventName]) {
      this.listeners[eventName].forEach((callback) => callback(data));
    }
  }

  /**
   * Binds property changes to events
   * @param {Object} mapping - Object containing event mappings
   */
  bindEvents(mapping) {
    for (const [eventName, action] of Object.entries(mapping)) {
      const { prop, action: actionType } = action;
      if (!this.mappings[prop]) {
        this.mappings[prop] = {};
      }
      this.mappings[prop][actionType] = eventName;
    }
  }
}

/**
 * Gets all reserved properties of the StateStore class
 * @param {Function} classConstructor - The class constructor
 * @returns {string[]} Array of reserved property names
 */
function getReservedProps(classConstructor) {
  const instanceProps = Object.getOwnPropertyNames(new classConstructor({}));
  const prototypeProps = Object.getOwnPropertyNames(classConstructor.prototype);
  return [...new Set([...instanceProps, ...prototypeProps])];
}

const RESERVED_PROPS = getReservedProps(StateStore);

/**
 * Creates a Proxy handler for the StateStore
 * @returns {Object} Proxy handler object
 */
function makeHandler() {
  return {
    get(target, prop) {
      if (RESERVED_PROPS.includes(prop)) {
        return Reflect.get(target, prop);
      }

      const result = Reflect.get(target.state, prop);
      const eventName = target.mappings[prop]?.get;
      if (eventName) {
        target.emit(eventName, result);
      }
      return result;
    },

    set(target, prop, value) {
      if (prop === "state" || RESERVED_PROPS.includes(prop)) {
        return Reflect.set(target, prop, value);
      }

      const result = Reflect.set(target.state, prop, value);
      const eventName = target.mappings[prop]?.set;
      if (eventName) {
        target.emit(eventName, value);
      }
      return result;
    },
  };
}

/**
 * Creates a new reactive state store
 * @param {Object} initialState - Initial state object
 * @returns {Proxy} Proxied StateStore instance
 */
function makeState(initialState) {
  const stateStore = new StateStore(initialState);
  const handler = makeHandler();
  return new Proxy(stateStore, handler);
}

export {makeState};