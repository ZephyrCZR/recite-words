import uniRequest from 'uni-request';

uniRequest.defaults.baseURL = 'http://127.0.0.1:5000';
uniRequest.defaults.headers.common['Authorization'] = AUTH_TOKEN;
uniRequest.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


// uniRequest.request(config)
// uniRequest.get(url[, config])
// uniRequest.delete(url[, config])
// uniRequest.head(url[, config])
// uniRequest.options(url[, config])
// uniRequest.post(url[, data[, config]])
// uniRequest.put(url[, data[, config]])
// uniRequest.patch(url[, data[, config]])

/*

uniRequest.post('/user', {   
        firstname : 'firstname',
        lastname : 'lastname'    
}).then(function (response) {
    console.log(response);
}).catch(function (error) {
    console.log(error);
});

// 向具有给定ID的用户发出请求
uniRequest.get('/user?id=12345')
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });

// 可选地，上面的请求也可以按照
uniRequest.get('/user', {
    data: {
        id: 'number'
    }
}).then(function (response) {
    console.log(response);
}).catch(function (error) {
    console.log(error);
});

// 想要使用 async/await？ 将`async`关键字添加到外部函数/method
async function getUser() {
    try {
        const response = await uniRequest.get('/user?ID=12345');
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}

*/