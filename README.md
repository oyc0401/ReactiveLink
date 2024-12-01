# Reactive Link

JavaScript 애플리케이션을 위한 가볍고 반응형 상태 관리 라이브러리로, 이벤트 처리 기능을 제공합니다.

## 설치

```bash
npm install https://github.com/oyc0401/ReactiveLink.git
```

## Usage

```javascript
import { makeState } from 'reactive-link';

// 초기 값을 가진 상태 스토어 생성
const state = makeState({ name: 'Kim', age: 21 });

// 상태 변경 이벤트 리스너 등록
state.on('nameChanged', (newName) => {
  console.log('이름이 변경되었습니다:', newName);
});

// 프로퍼티 접근 및 변경에 이벤트 바인딩
state.bindEvents({
  nameChanged: { action: 'set', prop: 'name' },
  ageAccessed: { action: 'get', prop: 'age' }
});

// 상태 프로퍼티 업데이트
state.name = 'Lee';  // 'nameChanged' 이벤트 트리거

// 상태 프로퍼티 접근
console.log(state.age);  // 'ageAccessed' 이벤트 트리거

// 여러 프로퍼티를 한 번에 업데이트
state.changeState({ name: 'Park', age: 25 });

```

## API Reference

### `makeState(initialState)`
초기 상태를 가진 새로운 반응형 상태 스토어를 생성합니다.

### StateStore 클래스

#### `changeState(newState)`
여러 상태 프로퍼티를 한 번에 업데이트합니다.

#### `on(eventNames, callback)`
이벤트 리스너를 등록합니다. 공백으로 구분된 여러 이벤트 이름을 지원합니다.

```javascript
state.on('event1 event2', (data) => {
  console.log('Event received:', data);
});
```

#### `off(eventName, callback)`
이벤트 리스너를 제거합니다.

#### `bindEvents(mapping)`
프로퍼티 변경을 이벤트에 바인딩합니다.

```javascript
state.bindEvents({
  nameChanged: { action: 'set', prop: 'name' },
  ageAccessed: { action: 'get', prop: 'age' }
});
```

## 예제

### 기본 사용법
```javascript
const state = makeState({ count: 0 });

state.on('countChanged', (newValue) => {
  console.log('카운트가 변경되었습니다:', newValue);
});

state.bindEvents({
  countChanged: { action: 'set', prop: 'count' }
});

state.count++; // 출력: 카운트가 변경되었습니다: 1
```

### 여러 이벤트 처리
```javascript
const state = makeState({ user: { name: 'Kim', age: 21 } });

state.on('userUpdated nameChanged', (data) => {
  console.log('사용자 데이터가 변경되었습니다:', data);
});

state.bindEvents({
  userUpdated: { action: 'set', prop: 'user' },
  nameChanged: { action: 'set', prop: 'name' }
});

state.changeState({ user: { name: 'Lee', age: 25 } });
```

## License

MIT
