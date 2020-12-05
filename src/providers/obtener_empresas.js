const { default: Axios } = require("axios");
const access_token = localStorage.getItem('access_token');
const  getEmpresas = async (setEmpresalist, empresalist, empresa, rutempresa) => {
    var config = {
      method: 'get',
      url: 'http://54.232.8.231/api/empresas/',
      headers: {
        "Authorization": `Bearer ${access_token}`,
      }
    };
    console.log("access token", access_token)
    Axios(config)
      .then(function (response) {
       
        const empresas = response.data
        setEmpresalist(empresas);
        const data_empresa = empresas.find(emp => emp.nombre === empresa["nombre"]);
        console.log(rutempresa)
      })
      .catch(function (error) {
 
        console.log(error);
      });


    
  }
  export default getEmpresas();