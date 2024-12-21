import { CardContent, Dialog, Stack, Typography,Card } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import React from "react";


export default function PopUp (props){
    return(
        <Dialog
        open={props.open}
        onClose={props.handleClose}
        maxWidth={"auto"}
        scroll={"body"}
        PaperProps={{sx:{overflow:"auto"}}}
        >
          <Card>
            <CardContent style={{padding:"16px"}}>
                <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                    <Typography variant="modalTitle">{props.title}</Typography>
                    <CloseIcon onClick={props.handleClose} sx={{width:24,hight:24,color:"text.disabled",cursor:"pointer"}}/>
                </Stack>
                {
                    props.children
                }
            </CardContent>
            </Card>  
        </Dialog>
    )
}