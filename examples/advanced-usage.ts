import {makeState} from '../src/index';

// 폼 상태 관리 예제
const formState = makeState({
    values: { username: '', email: '' },
    errors: {},
    isValid: true
});

// 이벤트 바인딩
formState.bindEvents({
    valuesChanged: { action: 'set', prop: 'values' },
    errorsChanged: { action: 'set', prop: 'errors' }
});

// 폼 값 유효성 검사
formState.on('valuesChanged', (values) => {
    const errors = {};
    
    if (!values.username) {
        errors.username = '사용자 이름을 입력하세요';
    }
    
    if (!values.email.includes('@')) {
        errors.email = '올바른 이메일 주소를 입력하세요';
    }
    
    formState.errors = errors;
    formState.isValid = Object.keys(errors).length === 0;
});

// 폼 테스트
console.log('초기 상태:', formState.values, formState.errors);

// 잘못된 데이터 입력
formState.values = { username: '', email: 'invalid-email' };
console.log('유효성 검사 결과:', formState.errors);

// 올바른 데이터 입력
formState.values = { username: 'user123', email: 'user@example.com' };
console.log('최종 상태:', formState.values, formState.errors, formState.isValid);
