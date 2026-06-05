import grpc from 'k6/net/grpc';
import { check, sleep } from 'k6';

const client = new grpc.Client();
client.load(['.'], 'user.proto');

export const options = {
  vus: 100,
  duration: '30s',
  // Yêu cầu k6 hiển thị p95 và p99
  summaryTrendStats: ['avg', 'min', 'med', 'max', 'p(95)', 'p(99)'],
};

export default function () {
  client.connect('127.0.0.1:50051', {
    plaintext: true
  });

  const data = { id: '1' };
  const response = client.invoke('UserService/GetUser', data);

  check(response, {
    'status is OK': (r) => r && r.status === grpc.StatusOK,
  });

  client.close();
  sleep(0.1);
}