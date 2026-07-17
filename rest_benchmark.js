import http from 'k6/http';
import { check } from 'k6';

export const options = {
    vus: 100,
    duration: '30s',
    summaryTrendStats: ['avg', 'min', 'med', 'max', 'p(95)', 'p(99)'],
};

export default function () {
    // Đòn chí mạng: Ép REST phải mở lại kết nối TCP cho mỗi request
    const params = {
        headers: { 'Connection': 'close' },
    };
    
    const res = http.get('http://127.0.0.1:3000/users/1', params);
    check(res, {
        'is status 200': (r) => r.status === 200,
    });
}