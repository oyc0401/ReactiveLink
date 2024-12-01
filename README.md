# Reactive Link

반응형 이벤트 처리를 제공하는 JavaScript 상태관리 라이브러리 입니다.

## 설치

```bash
npm install https://github.com/oyc0401/ReactiveLink.git
```

## Usage

```javascript
import { makeState } from 'reactive-link';

// 기본 상태 관리 예제
const counterState = makeState({ count: 0 });

// 이벤트와 속성 연결
counterState.bindEvents({
    countChanged: { action: 'set', prop: 'count' }
});

// 이벤트 리스너 등록
counterState.on('countChanged', (newValue) => {
    console.log('카운트가 변경되었습니다:', newValue);
});

// 상태 변경 테스트
console.log('초기 카운트:', counterState.count);
counterState.count += 1; // 출력: 카운트가 변경되었습니다

```

## API Reference

### `makeState(initialState)`
초기 상태를 가진 새로운 반응형 상태 스토어를 생성합니다.

### StateStore 클래스

#### `bindEvents(mapping)`
프로퍼티 변경을 이벤트에 바인딩합니다.

```javascript
state.bindEvents({
  event1: { action: 'set', prop: 'name' },
  event2: { action: 'get', prop: 'age' }
});
```

#### `on(eventNames, callback)`
이벤트 리스너를 등록합니다. 공백으로 구분된 여러 이벤트 이름을 지원합니다.

```javascript
state.on('event1 event2', (data) => {
  console.log('Event received:', data);
});
```

#### `off(eventName, callback)`
이벤트 리스너를 제거합니다.

#### `changeState(newState)`
여러 상태 프로퍼티를 한 번에 업데이트합니다.
이때 이벤트는 발생시키지 않습니다.

## 예제

### 기본 사용법
```javascript
const state = makeState({ count: 0 });

state.bindEvents({
  countChanged: { action: 'set', prop: 'count' }, // 'countChanged' -> count 변경
});

state.on('countChanged', (newValue) => {
  console.log('카운트가 변경되었습니다:', newValue);
});

// 상태 변경 (트리거: countChanged)
state.count++; // 출력: 카운트가 변경되었습니다: 1
```

### 여러 이벤트 처리
```javascript
const state = makeState({ name: "Kim", age: 21 });


state.bindEvents({
  event1: { action: "set", prop: "name" }, // 'event1' -> name 변경
  event2: { action: "get", prop: "age" }, // 'event2' -> age 접근
});

state.on("event1", (newName) => {
  console.log("이름이 변경되었습니다:", newName);
});

// 여러 이벤트에 하나의 리스너 등록
state.on("event1 event2", (value) => {
  console.log("이벤트 발생:", value);
});

// 상태 프로퍼티 업데이트 (트리거: event1)
state.name = "Lee";

// 상태 프로퍼티 접근 (트리거: event2)
console.log(state.age);

// 여러 상태를 한 번에 업데이트 (이벤트 트리거 X)
state.changeState({ name: "Park", age: 25 });

/**
 * < 출력 >
 * 이름이 변경되었습니다: Lee
 * 이벤트 발생: Lee
 * 이벤트 발생: 21
 * 21
**/

```

## License

MIT
