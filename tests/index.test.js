import { makeState } from '../index';
import {jest} from '@jest/globals'

describe('StateStore', () => {
  let state;

  beforeEach(() => {
    state = makeState({ name: 'Kim', age: 21 });
  });

  test('should create state store with initial values', () => {
    expect(state.state).toEqual({ name: 'Kim', age: 21 });
  });

  test('should change state using changeState method', () => {
    state.changeState({ name: 'Lee', age: 25 });
    expect(state.state).toEqual({ name: 'Lee', age: 25 });
  });

  test('should handle event listeners with on/off methods', () => {
    const mockCallback = jest.fn();
    state.on('test-event', mockCallback);
    state.emit('test-event', 'test-data');
    expect(mockCallback).toHaveBeenCalledWith('test-data');

    state.off('test-event', mockCallback);
    state.emit('test-event', 'test-data-2');
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  test('should handle multiple event listeners', () => {
    const mockCallback1 = jest.fn();
    const mockCallback2 = jest.fn();
    state.on('test-event', mockCallback1);
    state.on('test-event', mockCallback2);

    state.emit('test-event', 'test-data');
    expect(mockCallback1).toHaveBeenCalledWith('test-data');
    expect(mockCallback2).toHaveBeenCalledWith('test-data');
  });

  test('should handle space-separated event names', () => {
    const mockCallback = jest.fn();
    state.on('event1 event2', mockCallback);

    state.emit('event1', 'data1');
    state.emit('event2', 'data2');

    expect(mockCallback).toHaveBeenCalledTimes(2);
    expect(mockCallback).toHaveBeenNthCalledWith(1, 'data1');
    expect(mockCallback).toHaveBeenNthCalledWith(2, 'data2');
  });

  test('should handle property access and modification events', () => {
    const getCallback = jest.fn();
    const setCallback = jest.fn();

    state.bindEvents({
      nameGet: { action: 'get', prop: 'name' },
      nameSet: { action: 'set', prop: 'name' }
    });

    state.on('nameGet', getCallback);
    state.on('nameSet', setCallback);

    const name = state.name;
    state.name = 'Lee';

    expect(getCallback).toHaveBeenCalledWith('Kim');
    expect(setCallback).toHaveBeenCalledWith('Lee');
  });
});
