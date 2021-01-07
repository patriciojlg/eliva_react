import * as React from 'react';

import { DataGrid } from '@material-ui/data-grid';

import { makeStyles } from "@material-ui/core/styles";

import Axios from 'axios';
import { Icon, IconButton, Switch } from '@material-ui/core';
import mask_cl_peso from '../util/chileanpesomask';

const useStyles = makeStyles(theme => ({
    card: {
        overflow: "visible"
    },
    dataGrid:{
        backgroundColor: "white",
    },
    session: {
        position: "relative",
        zIndex: 4000,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column"
    },
    background: {
        backgroundColor: "white"
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

export default function Voucher({ date, setValue, rutempresa, voucherid, setVoucherid }) {


    const columns = [
        { field: 'folio', headerName: 'Folio', width: 70 },
        { field: 'periodo', headerName: 'Creado', width: 130 },
        { field: 'haber', headerName: 'Haber', width: 130 },
        { field: 'debe', headerName: 'Debe', width: 130 },
        { field: 'saldo', headerName: 'Saldo', width: 130 },
        { field: "n_detalle", headerName: "N Detalle", width: 130 },
        { field: 'cerrado', headerName: 'Cerrado', width: 130, }];
    const rows = [
    ];

    const [rowsvoucher, setRowsvoucher] = React.useState(rows)
    const [selection, setSelection] = React.useState(null);
    const [refresh, setRefresh] = React.useState(true);
    const [oldselection, setOldselection] = React.useState()
    const classes = useStyles();

    function string_to_date_iso(date_api) {
        var mydate = new Date(date_api);
        const date_iso = `${mydate.getDate()}/${mydate.getMonth() + 1}/${mydate.getFullYear()}`
        return date_iso
    }
    const postVoucher = async () => {
        const fecha_hoy = new Date()
        const date_iso = `${fecha_hoy.getDate()}/${fecha_hoy.getMonth() + 1}/${fecha_hoy.getFullYear()}`
        const data = { "fecha": date_iso, "rut": rutempresa }
        const api = await Axios.post("http://54.232.8.231/api/vouchers/", data);
        console.log(api.data, "RESP POST")
        setRefresh(!refresh)
    }
    const getVouchers = async () => {
        console.log(date, "esto es date")
        const date_iso = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
        console.log(date_iso, "y esto date iso")
        const data_params = { "fecha": date_iso, "rut": rutempresa }
        const api = await Axios.get("http://54.232.8.231/api/vouchers/", { params: data_params });
        const data = api.data;

        data.forEach(function (obj) {
            obj.n_detalle = obj.detail.length
            obj.id = obj._id
            // Pasa a iso tipo la fecha
            var date_temp = obj.periodo
            obj.periodo = string_to_date_iso(date_temp)
            delete obj._id
            // Calcula debe
            var debe = 0
            obj.detail.forEach(function (det) {
                debe += det.debe
            })
            obj.debe = debe
            // Calcula haber
            var haber = 0
            obj.detail.forEach(function (det) {
                haber += det.haber
            })
            obj.haber = haber
            // Calcula saldo
            obj.saldo = haber - debe
            if (obj.cerrado === true) {
                obj.cerrado = "Sí"
            }
            else {
                obj.cerrado = "No"
            }
            obj.debe = mask_cl_peso(obj.debe);
            obj.haber = mask_cl_peso(obj.haber);
            obj.saldo = mask_cl_peso(obj.saldo);

        })
        console.log("esto es data en voucher", data)
        setRowsvoucher(data)
    }

    const deleteVouchers = async () => {
        const data_params = { "id": voucherid }
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
    function eliminar_voucher(e) {
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

                <DataGrid 
                className={classes.dataGrid}
                rows={rowsvoucher}
                    columns={columns}
                    disableMultipleSelection={true}
                    pageSize={6}
                    onSelectionChange={(newSelection) => {
                        const row_data = rowsvoucher.filter(row => row.id == newSelection.rowIds)
                        const id = { ...row_data.id }
                        setSelection(null);
                        setVoucherid(row_data[0].id)
                        const rowid = { ...newSelection.rowIds }
                        console.log(oldselection, rowid)
                        if (rowid[0] == oldselection) {
                            setValue(1)
                        }
                        setOldselection(...newSelection.rowIds)
                    }} />
            </div>



        </React.Fragment>



    );
}