import Mock from "mockjs";

let loginData = Mock.mock({
   'status|1': ['200', '403', '502'],
    message: 'message',
    result: 'result'
});

export {loginData};