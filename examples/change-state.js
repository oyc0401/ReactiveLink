import { makeState } from "../index.js";

// 초기 값을 가진 상태 스토어 생성
const state = makeState({ name: "Kim", age: 21 });

// 이벤트에 상태 프로퍼티 접근/변경 동작 바인딩
state.bindEvents({
  event1: { action: "set", prop: "name" }, // 'event1' -> name 변경
  event2: { action: "get", prop: "age" }, // 'event2' -> age 접근
});

// 상태 변경 이벤트 리스너 등록
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
