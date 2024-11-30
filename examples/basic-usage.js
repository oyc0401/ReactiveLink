import {makeState} from '../src/index.js';

// 기본 상태 관리 예제
const counterState = makeState({
    count: 0,
    message: ''
});

// 이벤트 리스너 등록
counterState.on('countChanged', (newValue) => {
    console.log('카운트가 변경되었습니다:', newValue);
    counterState.message = `현재 카운트: ${newValue}`;
});

// 이벤트와 속성 연결
counterState.bindEvents({
    countChanged: { action: 'set', prop: 'count' }
});

// 상태 변경 테스트
console.log('초기 카운트:', counterState.count);
counterState.count += 1;
console.log('상태 메시지:', counterState.message);

// 여러 속성 동시 변경
counterState.changeState({
    count: 5,
    message: '카운트를 5로 설정했습니다.'
});

console.log('최종 상태:', counterState.count, counterState.message);
