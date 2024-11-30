/**
 * @module Types
 * @description TypeScript type definitions for the state management library
 */

export interface EventMapping {
  prop: string;
  action: 'get' | 'set';
}

export interface EventMappings {
  [key: string]: {
    [key: string]: string;
  };
}

export interface Listeners {
  [key: string]: Array<(data: any) => void>;
}

export interface StateStoreConstructor {
  new (initialState?: object): StateStore;
}

export interface StateStore {
  getState(): { [key: string]: any };
  getMappings(): EventMappings;
  changeState(newState: object): void;
  on(eventNames: string, callback: (data: any) => void): void;
  off(eventName: string, callback: (data: any) => void): void;
  emit(eventName: string, data: any): void;
  bindEvents(mapping: { [key: string]: EventMapping }): void;
}
