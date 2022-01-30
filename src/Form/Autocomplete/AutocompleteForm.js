import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Button from "@mui/material/Button";

// county_cd, county_name
const COUNTIES = {
    "Alameda": "01",
    "Alpine": "02",
    "Amador": "03",
    "Butte": "04",
    "Calaveras": "05",
    "Colusa": "06",
    "Contra Costa": "07",
    "Del Norte": "08",
    "El Dorado": "09",
    "Fresno": "10",
    "Glenn": "11",
    "Humbolt": "12",
    "Imperial": "13",
    "Inyo": "14",
    "Kern": "15",
    "Kings": "16",
    "Lake": "17",
    "Lassen": "18",
    "Los Angeles": "19",
    "Madera": "20",
    "Marin": "21",
    "Mariposa": "22",
    "Mendocino": "23",
    "Merced": "24",
    "Modoc": "25",
    "Mono": "26",
    "Monterey": "27",
    "Napa": "28",
    "Nevada": "29",
    "Orange": "30",
    "Placer": "31",
    "Plumas": "32",
    "Riverside": "33",
    "Sacramento": "34",
    "San Benito": "35",
    "San Bernardino": "36",
    "San Diego": "37",
    "San Francisco": "38",
    "San Joaquin": "39",
    "San Luis Obispo": "40",
    "San Mateo": "41",
    "Santa Barbara": "42",
    "Santa Clara": "43",
    "Santa Cruz": "44",
    "Shasta": "45",
    "Sierra": "46",
    "Siskiyou": "47",
    "Solano": "48",
    "Sonoma": "49",
    "Stanislaus": "50",
    "Sutter": "51",
    "Tehma": "52",
    "Trinity": "53",
    "Tulare": "54",
    "Toulomne": "55",
    "Ventura": "56",
    "Yolo": "57",
    "Yuba": "58"
}

export default class AutoCompleteForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phrase: "",
            guess: "",
            counties: []
        };

        // if we don't bind this it won't work as an onChange handler
        this.handleCountySelect = this.handleCountySelect.bind(this);
    }

    handleCountySelect(event, value) {
        this.setState({
            counties: value
        })
    }

    render() {
        const { disable, onFormSubmit } = this.props
        const { counties } = this.state
        const style = {
            fontSize: 28
        }

        return (
            <form onSubmit={() => console.log(this.state)}>
                <Grid container alignItems="center" justifyContent="center" direction="column">
                    <Grid item>
                        <Box>
                            <Typography sx={style} variant="h4" component="div" gutterBottom={true}>
                                Submit counties you frequent
                            </Typography>
                            <Typography sx={style} variant="h4" component="div" gutterBottom={true}>
                                Envíe los condados que frecuenta
                            </Typography>
                            <Typography sx={style} variant="h4" component="div" gutterBottom={true}>
                                提交您经常使用的县
                            </Typography>
                        </Box>
                        <Autocomplete
                            multiple
                            disablePortal
                            disabled={disable}
                            id="auto"
                            options={Object.keys(COUNTIES)}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Counties" />}
                            onChange={this.handleCountySelect}
                        />
                        <Button // todo: add color themes next time
                            variant="contained"
                            onClick={() => {
                                onFormSubmit(counties.map((countyStr) => COUNTIES[countyStr]))
                            }}
                            sx={{ marginTop: 2 }}
                            // color='primary'
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>

        )
    }
}