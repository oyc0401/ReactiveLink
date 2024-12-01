// 사용 예시
const state = makeState({ name: "Kim", age: 21 , array:[1, 2]});

// 상태 변경
state.changeState({ name: "hello", age: 12 , array:[1, 2]});

// 이벤트 매핑
state.bindEvents({
  changename: { action: "set", prop: "name" },
  getage: { action: "get", prop: "age" },
  changeage: { action: "set", prop: "age" },
  changeArray: { action: "set", prop: "array" },
});

// 이벤트 리스너 등록
state.on("changename", (name) => {
  console.log("이름이 변경되었습니다:", name);
});
state.on("getage", (age) => {
  console.log("나이에 접근했습니다:", age);
});

state.on("changename changeage", (val) => {
  console.log("변경되었습니다:", val);
});

state.on("changeArray", (val) => {
  console.log("배열 변경:", val);
});
// 상태 변경으로 이벤트 트리거
state.name = "Mike"; // 출력: 이름이 변경되었습니다: Mike

state.age; // 출력: 나이에 접근했습니다: 12

state.changeState({ name: "bar", age: 65 });

state.age; // 출력: 나이에 접근했습니다: 65

state.age=23;

state.array[1] = 6 // set 트랩 동작안함

state.array=[123];