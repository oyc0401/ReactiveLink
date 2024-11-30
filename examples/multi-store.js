import {makeState} from '../src/index.js';

// 사용자 상태 스토어
const userState = makeState({
    currentUser: null,
    preferences: { theme: 'light' }
});

// 장바구니 상태 스토어
const cartState = makeState({
    items: [],
    total: 0
});

// 이벤트 바인딩
userState.bindEvents({
    userChanged: { action: 'set', prop: 'currentUser' },
    preferencesChanged: { action: 'set', prop: 'preferences' }
});

cartState.bindEvents({
    itemsChanged: { action: 'set', prop: 'items' },
    totalChanged: { action: 'set', prop: 'total' }
});

// 장바구니 변경 시 총액 자동 계산
cartState.on('itemsChanged', (items) => {
    const total = items.reduce((sum, item) => sum + item.price, 0);
    cartState.total = total;
});

// 사용자 상태에 따른 장바구니 동기화
userState.on('userChanged', (user) => {
    if (user) {
        console.log(`${user.name}의 장바구니 로드 중...`);
        // 사용자별 장바구니 데이터 로드 시뮬레이션
        cartState.items = [
            { id: 1, name: '상품 A', price: 1000 },
            { id: 2, name: '상품 B', price: 2000 }
        ];
    } else {
        console.log('장바구니 초기화');
        cartState.items = [];
    }
});

console.log('=== 다중 스토어 연동 테스트 ===');

// 사용자 로그인 시뮬레이션
userState.currentUser = { id: 1, name: 'Kim' };
console.log('장바구니 총액:', cartState.total);

// 사용자 로그아웃 시뮬레이션
userState.currentUser = null;
console.log('장바구니 총액:', cartState.total);
