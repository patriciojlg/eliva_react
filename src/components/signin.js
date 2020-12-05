import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import React, {useCallback} from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Axios from 'axios';
import { useHistory } from 'react-router'


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
        width: "100%",
        margin: "0 auto"
    },
    fullWidth: {
        width: "100%"
    },
    logo: {
        display: "flex",
        flexDirection: "column"
    }
}));

const Signin = () => {
   
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [authresponse, setAuthresponse] = React.useState("");
    function postLogin(){
        var data_login = {}
        data_login.username = username
        data_login.password = password
    console.log(data_login)
    Axios.post(`http://54.232.8.231/api/login/`, data_login)
    .then(response => {
        console.log(response)
        if (response.status == 200){
        setAuthresponse("Login correcto")
        localStorage.setItem('access_token',response.data.access_token)
        localStorage.setItem('refresh_token',response.data.refresh_token)
        window.location.reload()
    }
    else{
        setAuthresponse("Usuario o contraseña, incorrectos")
    }
    })
    .catch(error => {
    console.error('There was an error!', error);
     });
    }

    const classes = useStyles();
    return (
        <div className={classNames(classes.session, classes.background)}>
            <div className={classes.content}>
                <div className={classes.wrapper}>
                    <Card>
                        <CardContent>
                            <form>
                                <div
                                    className={classNames(classes.logo, `text-xs-center pb-xs`)}
                                >
                                    <h2>ELIVA</h2>
                                    <Typography variant="caption">
                                        Ingrese nombre de usuario y contraseña para continuar
                  </Typography>
                                </div>
                                <TextField
                                    id="username"
                                    onChange={(e) => setUsername(e.target.value)}
                                    label="Username"
                                    className={classes.textField}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    id="password"
                                    label="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={classes.textField}
                                    type="password"
                                    fullWidth
                                    margin="normal"
                                />
                                <FormControlLabel
                                    control={<Checkbox value="checkedA" />}
                                    label="Mantenerme logueado"
                                    className={classes.fullWidth}
                                />
                                <Button
                                    variant="contained"
                                    onClick={(e)=>postLogin()}
                                    color="primary"
                                    fullWidth
                      
                                >
                                    Ingresar
                </Button>
                                <div className="pt-1 text-md-center">
    <p>{authresponse}</p>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Signin;