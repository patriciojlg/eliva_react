import * as React from 'react';

import { DataGrid } from '@material-ui/data-grid';

import { makeStyles } from "@material-ui/core/styles";

import Axios from 'axios';
import { Icon, IconButton } from '@material-ui/core';
const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'rutEmpresa', headerName: 'Rut Empresa', width: 130 },
    { field: 'folio', headerName: 'Folio', width: 130 },
    { field: 'periodo', headerName: 'Periodo', width: 130 },
    { field: 'debe', headerName: 'Debe', width: 130 },
    { field: 'haber', headerName: 'Haber', width: 130 },
    { field: 'cerrado', headerName: 'Cerrado', width: 130 },
    { field: 'saldo', headerName: 'Saldo', width: 130 }
];

const rows = [
    { id: 5, rutEmpresa: '15.838.946-0', folio: '330-1', periodo: Date(), ultimaActualizacion: Date(), debe: 400, haber: 400, saldo: 0, cerrado: true },
    { id: 2, rutEmpresa: '15.838.946-0', folio: '330-2', periodo: Date() },
];
const useStyles = makeStyles(theme => ({
    card: {
        overflow: "visible"
    },
    session: {
        position: "relative",
        zIndex: 4000,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column"
    },
    background: {
        backgroundColor: theme.palette.primary.main
    },
    content: {
        padding: `40px ${theme.spacing(1)}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: "1 0 auto",
        flexDirection: "column",
        minHeight: "100%",
        textAlign: "center"
    },
    wrapper: {
        flex: "none",
        maxWidth: "400px",
        width: "90%",
        margin: "0 auto"
    },
    fullWidth: {
        width: "100%"
    },
    logo: {
        display: "flex",
        flexDirection: "column"
    },
    wrap_voucher: {
        marginTop: "10px",
        padding: "15px",
    }
}));

export default function Voucher({ date, setValue, rutempresa, voucherid, setVoucherid}) {

    const [rowsvoucher, setRowsvoucher] = React.useState(rows)
    const [selection, setSelection] = React.useState(null);
    const [refresh, setRefresh] = React.useState(true);
    const [oldselection, setOldselection] = React.useState()
    const classes = useStyles();
    
    const postVoucher = async () => {
        console.log(date, "esto es date")
        const date_iso = `${date.getDay()}/${date.getMonth() + 1}/${date.getFullYear()}`
        const data = { "fecha": date_iso, "rut": rutempresa }
        const api = await Axios.post("http://54.232.8.231/api/vouchers/", data);
        console.log(api.data,"RESP POST" )
        setRefresh(!refresh)
      }
    const getVouchers = async () => {
        console.log(date, "esto es date")
        const date_iso = `${date.getDay()}/${date.getMonth() + 1}/${date.getFullYear()}`
        const data_params = { "fecha": date_iso, "rut": rutempresa }
        const api = await Axios.get("http://54.232.8.231/api/vouchers/", { params: data_params });
        const data = api.data;
        data.forEach(function(obj){
            obj.id = obj._id
            delete obj._id
        })
        setRowsvoucher(data)
    }
    const updateVouchers = async() => {
        return
    }
    const deleteVouchers = async() =>{

            const data_params = { "id": voucherid}
            const api = await Axios.delete("http://54.232.8.231/api/vouchers/", { params: data_params });
            const data = api.data;
            console.log(data)
            setRefresh(!refresh)

    }

    React.useEffect(() => {
        getVouchers();
    }, [date, rutempresa, refresh])

    function agregar_voucher(e) {
        postVoucher()
        console.log(rowsvoucher)
    }
    function eliminar_voucher(e){
        deleteVouchers()
    }
    return (
        <React.Fragment>

            <div style={{ position: "relative", textAlign: "left" }}>
                <IconButton onClick={(e) => agregar_voucher(e)} aria-label="delete" className={classes.margin} size="small">
                    <Icon href={() => null} onClick={() => null} clickable color="primary">add_circle</Icon>
                    
                </IconButton>
                <IconButton onClick={(e) => eliminar_voucher(e)} aria-label="delete" className={classes.margin} size="small">
                <Icon href={() => null} onClick={() => null} clickable color="primary">delete_circle</Icon>
                </IconButton>
            </div>
            <div style={{ height: 420, width: '94.7%' }}>

                <DataGrid rows={rowsvoucher}
                    columns={columns}
                    disableMultipleSelection={true}
                    pageSize={6}
                    onSelectionChange={(newSelection) => {
                       
                        const row_data = rowsvoucher.filter(row => row.id == newSelection.rowIds)
                        const id = {...row_data.id}
                        setSelection(null);
                        setVoucherid(row_data[0].id)
                        const rowid = {...newSelection.rowIds}
                        console.log(oldselection, rowid)
                        if (rowid[0] == oldselection){
                            setValue(1)
                        }
                        setOldselection(...newSelection.rowIds)
                    }} />
            </div>



        </React.Fragment>



    );
}