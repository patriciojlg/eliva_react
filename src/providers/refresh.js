import Axios from 'axios';


function refresh_token() {
    const refresh_token = localStorage.getItem('refresh_token');
    var config_refresh = {
        method: 'post',
        url: 'http://54.232.8.231/api/refresh-token/',
        
    }
    Axios.post(config_refresh.url, {},{headers: { 'Authorization': `Bearer ${refresh_token}` }})
        .then(function (response) {
   
        if (response.status === 200) {    
            localStorage.setItem('access_token',response.data.access_token)
            localStorage.setItem('refresh_token',response.data.refresh_token)
       
        }
        else {
            localStorage.removeItem("access_token")
            localStorage.removeItem("refresh_token")
        }

    }).catch(error => {

     console.log(error, "ESTO ES ERROR")

    });

}

export default function test_session() {
    const access_token = localStorage.getItem('access_token');
    var config_test = {
        method: 'get',
        url: 'http://54.232.8.231/api/login/',
        headers: { 'Authorization': `Bearer ${access_token}` }
    }
    Axios.get(config_test.url, {headers: { 'Authorization': `Bearer ${access_token}` }} ).then(function (response) {
        if (response.status === 401) {
            refresh_token()
        }

    }).catch(error => {
        refresh_token()
     console.log(error, "ESTO ES ERROR")

    })
}




