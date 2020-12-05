import Axios from 'axios';

export default function pull_rpa({ setTitlemodal, setMessagemodal, date, rutempresa, setLoading, setRutempresa }) {
   function show_modal(title, message) {
      setTitlemodal(title)
      setMessagemodal(message)
      setLoading(true)

   }
   function restart_table() {
      // Reinicia la tabla al pegarle al hook
      const rut = rutempresa;
      setRutempresa("")
      setRutempresa(rut)
   }
   function month_zero() {
      const month2mod = date.getMonth()
      if (String(month2mod).length < 2) {
         return `0${month2mod + 1}`;
      } else {
         return month2mod + 1;
      }
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
   const ano = date.getFullYear()
   const mes = month_zero()
   const fecha = `01/${mes}/${ano}`

   if (rutempresa == null) {
      show_modal("Adverencia", "Faltó especificar una empresa")
      return null
   }
   if (URLactual == "/boletas-honorario") {
      show_modal("Espere", "Obteniendo datos")
      const data = { "rut": rutempresa, "ano": ano, "mes": mes };
      Axios.post(`http://54.232.8.231${map_urls[URLactual]}`, data)
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
   if (URLactual == "/") {
      setTitlemodal("Advertencia")
      setMessagemodal("Debes seleccionar un tipo de documento")
      setLoading(true)
      console.log("En principal")

      return null
   }
   if (URLactual == "/facturas-ventas") {
      show_modal("Espere", "Obteniendo datos")
      const data = { "rut": rutempresa, "fecha": fecha, "tipo": "venta" };
      Axios.post(`http://54.232.8.231${map_urls[URLactual]}`, data)
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
   if (URLactual == "/facturas-compras") {
      show_modal("Espere", "Obteniendo facturas de venta")

      const data = { "rut": rutempresa, "fecha": fecha, "tipo": "compra" };
      Axios.post(`http://54.232.8.231${map_urls[URLactual]}`, data)
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