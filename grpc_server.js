const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Nạp file contract
const PROTO_PATH = path.join(__dirname, 'user.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true, longs: String, enums: String, defaults: true, oneofs: true
});
const userProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

// Triển khai logic cho hàm GetUser
server.addService(userProto.UserService.service, {
  GetUser: (call, callback) => {
    callback(null, {
      id: call.request.id,
      name: 'Sinh vien',
      email: 'sinhvien@ptit.edu.vn'
    });
  }
});

// Chạy server tại cổng 50051
server.bindAsync('127.0.0.1:50051', grpc.ServerCredentials.createInsecure(), () => {
  console.log('[gRPC] Server đang chạy tại 127.0.0.1:50051');
});