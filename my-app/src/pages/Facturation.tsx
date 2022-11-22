import React, { useEffect, useState } from "react";
import { GridItem, SimpleGrid, Container, Text, Button, Grid } from '@chakra-ui/react';
import {useLocation} from 'react-router-dom';
import {security_api} from "../utils/axios-apis";



export default function Facturacion() {
    /* Inputs :  */
    const [titular, setTt] = useState("");
    const [Tel, setTel] = useState("");
    const [dir, setDir] = useState("");
    const [em, setEmail] = useState("");

    useEffect(() => {
        const id = localStorage.getItem('user');
        security_api.get(`/api/users/${id}`).then((res) => {
            setTt(res.data.user.name);
            setEmail(res.data.user.email);
            setTel(res.data.phone || "(+57) 3333333333");
            setDir(res.data.address || "Tv 5 #1-2");
        })
    },[])



    /* Show : */
    const [show, setShow] = useState(false)

    const location = useLocation();

    const bill = JSON.parse(localStorage.getItem('bill') || '{}');

    const {company, orderNumber, product, total} = bill;
    const {cardNumber, cvc, expire} = location.state.paymentMethod;

    return (
        <div className="OrderProgress">
            <Grid templateColumns="repeat(2, 1fr)" templateRows="repeat(2, 1fr)" gap={6}>
                <GridItem color="white" colStart={1} rowStart={1} rowSpan={1} padding={5}>
                    <Container bg="gray.600">
                        <Text padding={2} fontSize={20} align={"center"}>Informacion facturación</Text>
                        <SimpleGrid columns={2} spacing={15} padding={6} paddingBottom={8}>
                            <Text color="gray.300">Número de Tarjeta</Text>
                            <Text>{cardNumber}</Text>
                            <Text color="gray.300">Titular</Text>
                            <Text>{titular}</Text>
                            <Text color="gray.300">Teléfono</Text>
                            <Text>{Tel}</Text>
                            <Text color="gray.300">Dirección factura</Text>
                            <Text>{dir}</Text>
                            <Text color="gray.300">E-mail factura</Text>
                            <Text>{em}</Text>
                        </SimpleGrid>
                    </Container>
                </GridItem>
                <GridItem color="white" colStart={1} rowStart={2} rowSpan={1} padding={5}>
                    <Container bg="gray.600">
                        <Text padding={2} fontSize={20} align={"center"}>Resumen de la Orden</Text>
                        <SimpleGrid columns={2} spacing={15} padding={6} paddingBottom={8}>
                            <Text color="gray.300">Compañia</Text>
                            <Text>{company}</Text>
                            <Text color="gray.300">Numero de Orden</Text>
                            <Text>{orderNumber}</Text>
                            <Text color="gray.300">Productos</Text>
                            <Text>{product}</Text>
                            <Text color="gray.300">Total</Text>
                            <Text>{total}</Text>
                        </SimpleGrid>
                    </Container>
                </GridItem>
                <GridItem colStart={2} rowSpan={2} boxSize="fit-content"  height= "100%" width="100%">
                    <Container centerContent fontSize ={24} padding={6} gap ={14}>
                        <Text >Obteniendo datos de Facturacion</Text>
                        <Text >Informacion siendo procesada</Text>
                        <Text >Confirmando datos</Text>
                        <Text >Enviando datos al banco</Text>
                        <Text >Procesando pago</Text>
                        <Text >Pago confirmado</Text>
                    </Container>
                    <Button style={{alignSelf:'flex-end',marginBottom:"-100px"}}boxShadow='2xl' bgColor={'#e60000'} color='white' width='100%' padding='4px' size='lg'>
                        <b>Cancelar</b>
                    </Button>
                </GridItem>
            </Grid>
        </div>)
        ;

}