import React, { useState, useEffect} from "react";
import { InputLeftElement, Grid, GridItem } from '@chakra-ui/react';
import { Input, InputGroup, Button, Text } from '@chakra-ui/react';
import { Select } from '@chakra-ui/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from '@fortawesome/free-regular-svg-icons'
import { useNavigate } from "react-router-dom";
import { queries_api } from "../utils/axios-apis";
import Swal from "sweetalert2";

export default function PaymentForm({onChange}: {onChange: any}) {

    const [number, setNumber] = useState('');
    const [expiryMM, setExpiryMM] = useState('');
    const [expiryYY, setExpiryYY] = useState('');
    const [cvc, setCVC] = useState('');
    const [dynamic, setdynamic] = useState('');
    const [show, setShow] = React.useState(false);
    const [bank, setBank] = useState('0');

    const navigate = useNavigate();
    const handleClick = () => setShow(!show);

    const checkCard = () => number.substring(0,1) === "3" || number.substring(0,1) === "4" || number.substring(0,1) === "5" ? true : false;
    const getFranchise = () => {
        if(number.substring(0,1) === "3") return "AmericanExpress";
        if(number.substring(0,1) === "4") return "Visa";
        if(number.substring(0,1) === "5") return "Mastercard";
    }
    /* Tomado de: https://stackoverflow.com/questions/64573035/type-dispatchsetstateactionany-is-not-assignable-to-type-values-stri */
    function withEvent(func: Function): React.ChangeEventHandler<any> {
        return (event: React.ChangeEvent<any>) => {
            const { target } = event;
            func(target.value);
        };
    }

    const sendTo = async () => {
        if((number.length === 16 || number.length === 15) && (expiryMM.length === 2 && +expiryMM >= 1 && +expiryMM <= 12) && expiryYY.length === 2 && (cvc.length === 3 || cvc.length === 4)){
            if(checkCard()){
                await queries_api.post('/api/metodos/',{
                    id : localStorage.getItem('user'),
                    nombre: "Tarjeta de crédito",
                    saldo: 0 || undefined,
                    userId: localStorage.getItem('user'),
                    bancoId: bank,
                    tipo: getFranchise(),
                    numero: number,
                    CVC: cvc,
                }).then((res) => {
                    navigate("/profile");
                })
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'The type of card is invalid, must be Visa, MasterCard or American Express',
                })
            }
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'The data entered is invalid',
            })
        }
    }

    useEffect(() => {
        onChange({
            cardNumber: number,
            expire: expiryMM + '/' + expiryYY,
            cvc: cvc,
            // company: company,
        });
    }, [number, expiryMM, expiryYY, cvc]);
    /* */
    return (

        <div className="PaymentForm">
            <Grid
                templateAreas=
                {`"header header"
                "nav main"
                "nav footer"`
                }
                paddingTop={25}
                paddingLeft={25}
                paddingBottom={50}
                paddingRight={25}
                marginTop="103px"
                h='200px'
                templateRows='repeat(5, 1fr)'
                templateColumns='repeat(6, 1fr)'
                id="gridForm"
            >
                <GridItem colStart={1} gridRowStart={1} colEnd={7} area={'header'}>
                    <div className="Payment-CN-text">
                        <h4 style={{ fontSize: 20 }}><b>Credit card Number</b></h4>
                        <Text color="gray.500" marginBottom={2}>Enter the 13-16 digits of your card.</Text>
                        <div className="Payment">
                            <div className="Payment-CN">
                                <h4>
                                    <InputGroup>
                                        <InputLeftElement pointerEvents='none' children={<FontAwesomeIcon id="credit-card" icon={faCreditCard} />} />
                                        <Input
                                            id="cardNumberInput"
                                            value={number}
                                            placeholder={'4901 4901 4901 4901'}
                                            onChange={withEvent(setNumber)}
                                            size='lg'
                                            type="number"
                                            borderRadius="10px" _placeholder={{
                                                color: '#FFFFFF'
                                            }}
                                            color='white' />
                                    </InputGroup>


                                </h4>
                            </div>
                        </div>
                    </div>
                </GridItem>
                <GridItem colStart={1} colEnd={3} gridRowStart={2} marginRight={10}>
                    <div className="Payment-CVC-text">
                        <h4><b>CVC number</b></h4>
                        <Text color="gray.500">Enter the 3 or 4 digit of your card</Text>
                    </div>
                </GridItem>
                <GridItem colStart={1} colEnd={3} gridRowStart={3} >
                    <div className="Payment-expiry-text">
                        <h4><b>Expiration date</b></h4>
                        <Text color="gray.500">Enter the expiration date</Text>
                    </div>
                </GridItem>
                <GridItem colStart={1} colEnd={3} gridRowStart={4} >
                    <div className="Payment-dynamic-text">
                        <h4><b>Bank</b></h4>
                        <Text color="gray.500">Select the bank linked to </Text>
                    </div>
                </GridItem>

                <GridItem colSpan={5} colStart={3} colEnd={7} gridRowStart={1} >

                </GridItem>
                <GridItem colSpan={5} colStart={3} colEnd={7} gridRowStart={2} >
                    <div className="Payment">
                        <h4>
                            <InputGroup size='lg' >

                                <Input
                                    onChange={(event) => {
                                        if(event.target.value.length > 4){
                                            event.target.value = "000";
                                        }else{
                                            setCVC(event.target.value)
                                        } 
                                    }}
                                    placeholder={'321'}
                                    type="number"
                                    _placeholder={{
                                        color: '#FFFFFF'
                                    }}
                                    size='lg'
                                    color='white'
                                    borderRadius="10px" />
                            </InputGroup>
                        </h4>
                    </div>

                </GridItem>
                <GridItem colSpan={1} colStart={3} colEnd={4} gridRowStart={3} >
                    <div className="Payment">
                        <div>
                            <h4>

                                <Input
                                    value={expiryMM}
                                    placeholder={'MM'}
                                    onChange={withEvent(setExpiryMM)}
                                    size='lg'
                                    type="number"
                                    max={12}
                                    min={1}
                                    borderRadius="10px" _placeholder={{
                                        color: '#FFFFFF'
                                    }} color='white' />
                            </h4>

                        </div>
                    </div>
                </GridItem>
                <GridItem colSpan={1} colStart={4} gridRowStart={3} >
                    <div className="Payment">
                        <div>
                            <h4>
                                <Text style={{ fontSize: 35 }} align='center' paddingTop={2}>/</Text>
                            </h4>

                        </div>
                    </div>
                </GridItem>
                <GridItem colSpan={1} colStart={5} gridRowStart={3} >
                    <div className="Payment">
                        <div>
                            <h4>

                                <Input
                                    value={expiryYY}
                                    placeholder={'YY'}
                                    onChange={withEvent(setExpiryYY)}
                                    size='lg'
                                    type="number"
                                    max={99}
                                    min={1}
                                    borderRadius="10px" _placeholder={{
                                        color: '#FFFFFF'
                                    }} color='white' />
                            </h4>

                        </div>
                    </div>
                </GridItem>
                <GridItem colSpan={5} colStart={3} colEnd={7} gridRowStart={4} >
                    <div className="Payment">
                        <h4>
                            <Select id="selectBank" placeholder='Select option' onChange={(event) => setBank(event.target.value) }>
                                <option value='0'>East Bank</option>
                                <option value='1'>Western Bank</option>
                            </Select>
                        </h4>
                    </div>
                </GridItem>

                <GridItem gridRowStart={5} colStart={1} colEnd={7} >
                    <Button boxShadow='2xl' bgColor={'#6ffd69'} color='white' width='100%' padding='4px' size='lg' onClick={async () => sendTo()}>
                        <b>Add method</b>
                    </Button>
                </GridItem>
            </Grid>

        </div>);
}