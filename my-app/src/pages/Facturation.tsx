import React, { useEffect, useState } from "react";
import { GridItem, SimpleGrid, Container, Text, Grid } from '@chakra-ui/react';
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import {useLocation} from 'react-router-dom';
import {security_api, buy_api} from "../utils/axios-apis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";



export default function Facturacion() {
    /* Inputs :  */
    const location = useLocation();
    const navigate = useNavigate();
    const amount = localStorage.getItem("amount") || "100000";
    const [titular, setTt] = useState("");
    const [Tel, setTel] = useState("");
    const [dir, setDir] = useState("");
    const [em, setEmail] = useState("");
    const [cuotas, setCuotas] = useState("0");
    const [sede,setSede] = useState("");
    const [estado, setEstado] = useState([true,""]);
    const [error,setError] = useState(false);
    const {cardNumber, cvc, expire, id, tipo} = location.state.paymentMethod;

    const [stage , setStage] = useState(1);

    const getFranchise = () => {
            switch(cardNumber){
                case '2':
                    case '5':
                        return "Master Card";
                case '3':
                    return "Visa";
                default:
                    return "American Express";
            }
    }

    useEffect(() => {
        const idUser = localStorage.getItem('user');
        security_api.get(`/api/users/${idUser}`).then((res) => {
            console.log(res);
            setTt(res.data.user.name);
            setEmail(res.data.user.email);
            setTel(res.data.user.nrotelefono || "(+57) 3333333333");
            setDir(res.data.user.direccion || "Tv 5 #1-2");
            let cuotasT = 1;
            let sedeT = "";
            Swal.fire({
                title: 'Enter the site of the university',
                input: 'select',
                inputOptions: {
                    sincelejo: "Sincelejo",
                    monteria: "Montería",
                    bogota: 'Bogota',
                    barranquilla: 'Barranquilla',
                    cartagena: 'Cartegena',
                    santamarta: 'Santa Marta'
                },
                inputPlaceholder: 'Enter your site of the university',
                showCancelButton: false,
        }).then((res) => {
            setSede(res.value || "Bogota");
            sedeT = res.value || "Bogota";
            Swal.fire({
                title: 'Enter the number of fees',
                input: 'number',
                showCancelButton: false,
                confirmButtonText: 'Ok',
                showLoaderOnConfirm: true,
            }).then((res) => {
                cuotasT = parseInt(res.value || "1");
                setCuotas(res.value || 1);
                buy_api.post('/api/transaccion/', {
                    monto: parseInt(amount),
                    sede: sedeT || "Bogota",
                    franquicia: getFranchise(),
                    nroCuotas: tipo === "PSE" ? 1 : cuotasT,
                    userid: parseInt(localStorage.getItem('user') || "1"),
                    metodoId: parseInt(id || "1"), 
                }).then((res) => {
                    console.log(res);
                    if(res.data.transaccion.estado === "Rechazado") {
                        console.log(res.data.message);
                        setEstado([false,res.data.message]);
                    }
                }).catch((err) => {
                    setError(true);
                    if(err.response.data.message === "Servicio Transferencia not available"){
                        Swal.fire({
                            title: 'Error',
                            text: 'The service is not available at this time',
                            icon: 'error',
                            confirmButtonText: ':('
                        }).then((res) => {
                            navigate('/profile');
                        });
                    }else if(err.response.data.message === "Monto must be greater than 0"){
                        Swal.fire({
                            title: 'Error',
                            text: 'The amount must be greather than 0 ',
                            icon: 'error',
                            confirmButtonText: ':/'
                        }).then((res) => {
                            navigate('/profile');
                        });
                    }
                });
            });
        });
        })
    },[])

    useEffect(() => {
        if(sede !== "" && cuotas !== "0"){
            if(stage < 6 && !error){
                setTimeout(() => {
                    setStage(1+stage);
                }, 2000);
            }
            if(stage === 6){
                if(estado[0] === true){
                Swal.fire({
                    title: 'Transaction completed successfully',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                    showLoaderOnConfirm: true,
                }).then((res) => {
                    navigate('/profile');
                })
                }else{
                    Swal.fire({
                        title: 'Transaction rejected',
                        icon: 'error',
                        text: estado[1].toString(),
                        confirmButtonText: ':(',
                        showLoaderOnConfirm: true,
                    }).then((res) => {
                        navigate('/profile');
                    })
                }
            }
        }
    },[stage,sede,cuotas])

    const bill = JSON.parse(localStorage.getItem('bill') || '{}');

    const {company, orderNumber, product} = bill;

    return (
        <div className="OrderProgress">
            <Grid templateColumns="repeat(2, 1fr)" templateRows="repeat(2, 1fr)" gap={6}>
                <GridItem color="white" colStart={1} rowStart={1} rowSpan={1} padding={5}>
                    <Container bg="rgba(6,5,5,0.6)">
                        <Text padding={2} fontSize={20} align={"center"}>Informacion facturación</Text>
                        <SimpleGrid columns={2} spacing={15} padding={6} paddingBottom={8}>
                            <Text color="rgba(255,255,255,0.6)">Número de Tarjeta</Text>
                            <Text>{cardNumber}</Text>
                            <Text color="rgba(255,255,255,0.6)">Titular</Text>
                            <Text>{titular}</Text>
                            <Text color="rgba(255,255,255,0.6)">Teléfono</Text>
                            <Text>{Tel}</Text>
                            <Text color="rgba(255,255,255,0.6)">Dirección factura</Text>
                            <Text>{dir}</Text>
                            <Text color="rgba(255,255,255,0.6)">E-mail factura</Text>
                            <Text>{em}</Text>
                        </SimpleGrid>
                    </Container>
                </GridItem>
                <GridItem color="white" colStart={1} rowStart={2} rowSpan={1} padding={5}>
                    <Container bg="rgba(6,5,5,0.6)">
                        <Text padding={2} fontSize={20} align={"center"}>Resumen de la Orden</Text>
                        <SimpleGrid columns={2} spacing={15} padding={6} paddingBottom={8}>
                            <Text color="rgba(255,255,255,0.6)">Compañia</Text>
                            <Text>{company}</Text>
                            <Text color="rgba(255,255,255,0.6)">Numero de Orden</Text>
                            <Text>{orderNumber}</Text>
                            <Text color="rgba(255,255,255,0.6)">Productos</Text>
                            <Text>{product}</Text>
                            <Text color="rgba(255,255,255,0.6)">Total</Text>
                            <Text>{amount}</Text>
                        </SimpleGrid>
                    </Container>
                </GridItem>
                <GridItem colStart={2} rowSpan={2} boxSize="fit-content"  height= "100%" width="100%">
                    <Container centerContent fontSize ={24} padding={6} gap ={14}>
                        <div className="step">
                            <Text color={stage >= 1 ? "green" : "black" }>Obteniendo datos de Facturacion</Text>
                            <FontAwesomeIcon color={stage >= 1 ? "green" : "black" } icon={faCheckCircle}></FontAwesomeIcon>
                        </div>
                        <div className="step">
                            <Text color={stage >= 2 ? "green" : "black" }>Informacion siendo procesada</Text>
                            <FontAwesomeIcon color={stage >= 2 ? "green" : "black" } icon={faCheckCircle}></FontAwesomeIcon>
                        </div>
                        <div className="step">
                            <Text color={stage >= 3 ? "green" : "black" }>Confirmando datos</Text>
                            <FontAwesomeIcon color={stage >= 3 ? "green" : "black" } icon={faCheckCircle}></FontAwesomeIcon>
                        </div>
                        <div className="step">
                            <Text color={stage >= 4 ? "green" : "black" }>Enviando datos al banco</Text>
                            <FontAwesomeIcon color={stage >= 4 ? "green" : "black" } icon={faCheckCircle}></FontAwesomeIcon>
                        </div>
                        <div className="step">
                            <Text color={stage >= 5 ? "green" : "black" }>Procesando pago</Text>
                            <FontAwesomeIcon color={stage >= 5 ? "green" : "black" } icon={faCheckCircle}></FontAwesomeIcon>
                        </div>
                        <div className="step">
                            <Text color={stage >= 6 ? "green" : "black" }>Pago confirmado</Text>                            
                            <FontAwesomeIcon color={stage >= 6 ? "green" : "black" } icon={faCheckCircle}></FontAwesomeIcon>
                        </div>
                    </Container>
                </GridItem>
            </Grid>
        </div>)
        ;

}