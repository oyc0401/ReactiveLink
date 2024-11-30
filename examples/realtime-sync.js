import {makeState} from '../src/index.js';

// 채팅 상태 관리 예제
const chatState = makeState({
    messages: [],
    users: [],
    isConnected: false
});

// 이벤트 바인딩
chatState.bindEvents({
    messagesUpdated: { action: 'set', prop: 'messages' },
    usersChanged: { action: 'set', prop: 'users' },
    connectionChanged: { action: 'set', prop: 'isConnected' }
});

// 메시지 수신 시뮬레이션
function simulateMessageReceived(message) {
    chatState.messages = [...chatState.messages, message];
}

// 사용자 목록 업데이트 시뮬레이션
function simulateUsersUpdate(users) {
    chatState.users = users;
}

// 이벤트 리스너 등록
chatState.on('messagesUpdated', (messages) => {
    console.log('새로운 메시지:', messages[messages.length - 1]);
});

chatState.on('usersChanged', (users) => {
    console.log('활성 사용자 수:', users.length);
});

// 실시간 업데이트 시뮬레이션
console.log('=== 실시간 채팅 시뮬레이션 ===');

simulateMessageReceived({ user: 'User1', text: '안녕하세요!' });
simulateUsersUpdate(['User1', 'User2']);
simulateMessageReceived({ user: 'User2', text: '반갑습니다!' });
