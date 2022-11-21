import React, { useState, useEffect } from "react";
import { GridItem, Input, Button, Grid } from '@chakra-ui/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKeyboard, fa1, fa2, fa3, fa4, fa5, fa6, fa7, fa8, fa9, fa0, faDeleteLeft, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

export default function Numpad({ setCVC }) {
    /* Inputs :  */
    const [pad, setPd] = useState("");
    /* Show : */
    const [show, setShow] = useState(false)
    /* Update textbox :  */
    const handleChange = (e) => {
        setCVC(pad.concat(e));
        setPd(pad.concat(e));
    }
    /* Delete last number : */
    const deleteA = () => {
        setCVC(pad.slice(0, -1));
        setPd(pad.slice(0, -1));
    }
    const theme = {

        Button:{
            colorScheme: 'blue',
        },

}
   
    return (
<>
            {!show ?<Button size='lg' onClick={() => setShow(!show)}>
                {<FontAwesomeIcon icon={faKeyboard} />}
            </Button> : null}
            <div className="Numpad"  style={{zIndex:2,position:'sticky',borderRadius: 8,fontSize:20,background:'#1f1f1f',width:'fit-content',height:'fit-content'}}>
            {show ? <>{/*
                {/* Preview inputs :  */}
                {/* Numpad Header doesn't update with changes made on Keyboard*/}
                <GridItem w='25%' h='10' area="header">{pad}</GridItem>
                {/* Numpad logic :  */}
                <div className="Padss">
                    <form>
                        <Input placeholder={pad} />
                    </form>
                    <Grid className="Keys" h="200px" w="150px"
                        /* Rows and Columns */
                        templateRows="repeat(4, 1fr)" templateColumns="repeat(3,1fr)"
                        gap={1}>
                        {/* */}
                        <GridItem><Button name="7" onClick={(e) => handleChange("7")}>
                            <FontAwesomeIcon icon={fa7} />
                        </Button></GridItem>
                        <GridItem><Button name="8" onClick={(e) => handleChange("8")}>
                            <FontAwesomeIcon icon={fa8} />
                        </Button></GridItem>
                        <GridItem><Button name="9" onClick={(e) => handleChange("9")}>
                            <FontAwesomeIcon icon={fa9} />
                        </Button></GridItem>

                        <GridItem><Button name="4" onClick={(e) => handleChange("4")}>
                            <FontAwesomeIcon icon={fa4} />
                        </Button></GridItem>
                        <GridItem><Button name="5" onClick={(e) => handleChange("5")}>
                            <FontAwesomeIcon icon={fa5} />
                        </Button></GridItem>
                        <GridItem><Button name="6" onClick={(e) => handleChange("6")}>
                            <FontAwesomeIcon icon={fa6} />
                        </Button></GridItem>
                        <GridItem>
                            <Button  name="1" onClick={(e) => handleChange("1")}>
                                <FontAwesomeIcon icon={fa1} />
                            </Button>
                        </GridItem>
                        <GridItem><Button name="2" onClick={(e) => handleChange("2")}>
                            <FontAwesomeIcon icon={fa2} />
                        </Button></GridItem>
                        <GridItem><Button name="3" onClick={(e) => handleChange("3")}>
                            <FontAwesomeIcon icon={fa3} />
                        </Button></GridItem>
                        <GridItem w='100%' h='10' bg="blue.300"><Button className="highlight " onClick={deleteA}>
                            <FontAwesomeIcon icon={faDeleteLeft} />
                        </Button></GridItem>
                        <GridItem><Button name="0" onClick={(e) => handleChange("0")}>
                            <FontAwesomeIcon icon={fa0} />
                        </Button></GridItem>
                        <GridItem w='100%' h='10' bg="green.300"><Button className="highlight" onClick={() => setShow(!show)}>
                            <FontAwesomeIcon icon={faCheckCircle} />
                        </Button></GridItem>
                    </Grid>
                </div>
            </> : null}
        </div></>  )
    ;
     
}