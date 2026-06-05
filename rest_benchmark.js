import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 100,
  duration: '30s',
  // Yêu cầu k6 hiển thị p95 và p99
  summaryTrendStats: ['avg', 'min', 'med', 'max', 'p(95)', 'p(99)'],
};

export default function () {
  const res = http.get('http://localhost:3000/users/1');
  check(res, {
    'is status 200': (r) => r.status === 200,
  });
  sleep(0.1);
}