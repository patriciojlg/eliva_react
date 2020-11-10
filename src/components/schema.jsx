const valores_state = {
    sesion: {
        token: "",
        refresh_token: ""
    },
    empresas: [
        {
            nombre: "",
            rut: ""
        }
    ],
    periodo: {
        mes: 0,
        ano: 0
    },
    impuestos: {
        boletas_ventas: 0,
        facturas_ventas: 0,
        facturas_compras: 0,
        boletas_honorario: 0,
        ppm: 0,
        iut: 0,
        iva: 0,
    },
    historicos: {
        caja_chica: {
            actual: 0,
            uno_anterior: 0,
            dos_anterior: 0,
            tres_anterior: 0,
            cuatro_anterior: 0,
            cinco_anterior: 0,
            seis_anterior: 0
        },
        boletas_venta: {
            actual: 0,
            uno_anterior: 0,
            dos_anterior: 0,
            tres_anterior: 0,
            cuatro_anterior: 0,
            cinco_anterior: 0,
            seis_anterior: 0
        },
        facturas_venta: {
            actual: 0,
            uno_anterior: 0,
            dos_anterior: 0,
            tres_anterior: 0,
            cuatro_anterior: 0,
            cinco_anterior: 0,
            seis_anterior: 0
        },
        facturas_compra: {
            actual: 0,
            uno_anterior: 0,
            dos_anterior: 0,
            tres_anterior: 0,
            cuatro_anterior: 0,
            cinco_anterior: 0,
            seis_anterior: 0
        },
        boleta_honorario: {
            actual: 0,
            uno_anterior: 0,
            dos_anterior: 0,
            tres_anterior: 0,
            cuatro_anterior: 0,
            cinco_anterior: 0,
            seis_anterior: 0
        }
    }
}