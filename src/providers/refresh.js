import Axios from 'axios';


function refresh_token() {
    const refresh_token = localStorage.getItem('refresh_token');
    var config_refresh = {
        method: 'post',
        url: 'http://18.230.199.98/api/refresh-token/',
        headers: { 'Authorization': `Bearer ${refresh_token}` }
    }
    Axios(config_refresh).then(function (response) {
        if (response.code === 200) {
            const data_res = response.data;
            localStorage.setItem("access_token", data_res["access_token"])
            localStorage.setItem("refresh_token", data_res["refresh_token"])
        }
        else {
            localStorage.removeItem("access_token")
            localStorage.removeItem("refresh_token")
        }

    });

}

export default function test_session() {
    const access_token = localStorage.getItem('access_token');
    var config_test = {
        method: 'get',
        url: 'http://18.230.199.98/api/login/',
        headers: { 'Authorization': `Bearer ${access_token}` }
    }
    Axios(config_test).then(function (response) {
 
    }).catch(error=>{
        if (error.response.data["msg"] === "Token has expired") {
            refresh_token()
       }

    })
}




