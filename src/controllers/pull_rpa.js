import Axios from 'axios';

export default function pull_rpa({setTitlemodal, setMessagemodal, date, rutempresa, setLoading, setRutempresa }) {
function show_modal(title, message)
{
   setTitlemodal(title)
   setMessagemodal(message)
   setLoading(true)

}
function restart_table(){
   // Reinicia la tabla al pegarle al hook
   const rut = rutempresa;
   setRutempresa("")
   setRutempresa(rut)
}

if (rutempresa == null){
   show_modal("Adverencia", "Faltó especificar una empresa")
   return null
}
   const URLactual = window.location.pathname;
   const map_urls = {
      "/boletas-honorario": "/api/bh-ano/",
      "/facturas-ventas": "/api/dte-mes/",
      "/boletas-ventas": "/api/dte-mes/",
      "/facturas-compras": "/api/dte-mes/"
   }
   const tipo = {
      "/boletas-honorario": "",
      "/facturas-ventas": "venta",
      "/boletas-ventas": "venta",
      "/facturas-compras": "compra",
   }
   const data = {}
   if (URLactual == "/boletas-honorario") {
   
      show_modal("Espere", "Obteniendo datos")
      const ano = date.getFullYear()
      const mes = date.getMonth() + 1
      const data = { "rut": rutempresa, "ano": ano, "mes": mes };
      Axios.post(`http://18.230.199.98${map_urls[URLactual]}`, data)
      .then(function (response) {
         setLoading(false)
         console.log(JSON.stringify(response.data));
         restart_table()
      })
      .catch(function (error) {
         console.log(error);
      });
      return null;
   }
 if (URLactual == "/"){
   setTitlemodal("Advertencia")
   setMessagemodal("Debes seleccionar un tipo de documento")
   setLoading(true)
   console.log("En principal")

return null
 }
 if (URLactual == "/facturas-ventas"){
   show_modal("Espere", "Obteniendo datos")
   const ano = date.getFullYear()
   const mes = date.getMonth() + 1
   const fecha =`01/${mes}/${ano}` 
   const data = {"rut": rutempresa, "fecha":fecha, "tipo": "venta"};
   Axios.post(`http://18.230.199.98${map_urls[URLactual]}`, data)
   .then(function (response) {
      setLoading(false)
      console.log(JSON.stringify(response.data));
      restart_table()
   })
   .catch(function (error) {
      console.log(error);
   });
   return null;
 }
 if (URLactual == "/facturas-compras"){
   show_modal("Espere", "Obteniendo facturas de venta")
   const ano = date.getFullYear()
   const mes = date.getMonth() + 1
   const fecha =`01/${mes}/${ano}` 
   const data = {"rut": rutempresa, "fecha":fecha, "tipo": "venta"};
   Axios.post(`http://18.230.199.98${map_urls[URLactual]}`, data)
   .then(function (response) {
      setLoading(false)
      console.log(JSON.stringify(response.data));
      restart_table()
   })
   .catch(function (error) {
      console.log(error);
   });
   return null;
 }




   console.log(URLactual);
   return null
}