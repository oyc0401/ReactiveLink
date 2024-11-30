/**
 * @module StateStore
 * @description A reactive state management store with event handling capabilities
 */

interface EventMapping {
  prop: string;
  action: 'get' | 'set';
}

interface EventMappings {
  [key: string]: {
    [key: string]: string;
  };
}

interface Listeners {
  [key: string]: Array<(data: any) => void>;
}

interface StateStoreConstructor {
  new (initialState?: object): StateStore;
}

export class StateStore {
  protected state: { [key: string]: any };
  protected listeners: Listeners;
  protected mappings: EventMappings;

  getState(): { [key: string]: any } {
    return this.state;
  }

  getMappings(): EventMappings {
    return this.mappings;
  }

  /**
   * Creates a new StateStore instance
   * @param initialState - Initial state object
   */
  constructor(initialState: object = {}) {
    this.state = initialState;
    this.listeners = {};
    this.mappings = {};
  }

  /**
   * Updates multiple state properties at once
   * @param newState - Object containing new state values
   */
  changeState(newState: object): void {
    Object.assign(this.state, newState);
  }

  /**
   * Registers event listeners
   * @param eventNames - Space-separated event names
   * @param callback - Callback function to execute
   */
  on(eventNames: string, callback: (data: any) => void): void {
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
   * @param eventName - Name of the event
   * @param callback - Callback function to remove
   */
  off(eventName: string, callback: (data: any) => void): void {
    if (this.listeners[eventName]) {
      this.listeners[eventName] = this.listeners[eventName].filter(
        (cb) => cb !== callback
      );
    }
  }

  /**
   * Emits an event with data
   * @param eventName - Name of the event to emit
   * @param data - Data to pass to event listeners
   */
  emit(eventName: string, data: any): void {
    if (this.listeners[eventName]) {
      this.listeners[eventName].forEach((callback) => callback(data));
    }
  }

  /**
   * Binds property changes to events
   * @param mapping - Object containing event mappings
   */
  bindEvents(mapping: { [key: string]: EventMapping }): void {
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
 * @param classConstructor - The class constructor
 * @returns Array of reserved property names
 */
function getReservedProps(classConstructor: StateStoreConstructor): string[] {
  const instanceProps = Object.getOwnPropertyNames(new classConstructor({}));
  const prototypeProps = Object.getOwnPropertyNames(classConstructor.prototype);
  return [...new Set([...instanceProps, ...prototypeProps])];
}

const RESERVED_PROPS = getReservedProps(StateStore);

/**
 * Creates a Proxy handler for the StateStore
 * @returns Proxy handler object
 */
function makeHandler(): ProxyHandler<StateStore> {
  return {
    get(target: StateStore, prop: string | symbol): any {
      if (typeof prop === 'string' && RESERVED_PROPS.includes(prop)) {
        return Reflect.get(target, prop);
      }

      const result = Reflect.get(target.getState(), prop);
      const eventName = target.getMappings()[prop as string]?.get;
      if (eventName) {
        target.emit(eventName, result);
      }
      return result;
    },

    set(target: StateStore, prop: string | symbol, value: any): boolean {
      if (prop === "state" || (typeof prop === 'string' && RESERVED_PROPS.includes(prop))) {
        return Reflect.set(target, prop, value);
      }

      const result = Reflect.set(target.getState(), prop, value);
      const eventName = target.getMappings()[prop as string]?.set;
      if (eventName) {
        target.emit(eventName, value);
      }
      return result;
    },
  };
}

/**
 * Creates a new reactive state store
 * @param initialState - Initial state object
 * @returns Proxied StateStore instance
 */
export function makeState<T extends object>(initialState: T): T & StateStore {
  const stateStore = new StateStore(initialState);
  const handler = makeHandler();
  return new Proxy(stateStore, handler) as T & StateStore;
}
