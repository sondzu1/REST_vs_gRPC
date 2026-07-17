import grpc from 'k6/net/grpc';
import { check } from 'k6';

const client = new grpc.Client();
client.load(['.'], 'user.proto');

export const options = {
    vus: 100,
    duration: '30s',
    summaryTrendStats: ['avg', 'min', 'med', 'max', 'p(95)', 'p(99)'],
};

export default function () {
    // gRPC tự động dùng HTTP/2 Multiplexing, giữ kết nối ổn định
    client.connect('127.0.0.1:50051', { plaintext: true });

    const response = client.invoke('user.UserService/GetUser', {});

    check(response, {
        'status is OK': (r) => r && r.status === grpc.StatusOK,
    });

    client.close();
}