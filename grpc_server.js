const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('user.proto', {});
const userProto = grpc.loadPackageDefinition(packageDefinition).user;

function getUser(call, callback) {
    callback(null, { id: '1', name: 'User 1', email: 'user1@example.com' });
}

const server = new grpc.Server();
server.addService(userProto.UserService.service, {
    GetUser: getUser // Gọi hàm lấy 1 User
});

server.bindAsync('127.0.0.1:50051', grpc.ServerCredentials.createInsecure(), () => {
    console.log("gRPC Server (1 User) đang chạy tại 127.0.0.1:50051");
});