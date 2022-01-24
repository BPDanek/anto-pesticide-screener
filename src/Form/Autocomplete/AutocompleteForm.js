import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Autocomplete from '@mui/material/Autocomplete';


// county_cd, couty_name
const COUNTIES = {
    ALAMEDA: "01",
    ALPINE: "02",
    AMADOR: "03",
    BUTTE: "04",
    CALAVERAS: "05",
    COLUSA: "06",
    CONTRA_COSTA: "07",
    DEL_NORTE: "08",
    EL_DORADO: "09",
    FRESNO: "10",
    GLENN: "11",
    HUMBOLDT: "12",
    IMPERIAL: "13",
    INYO: "14",
    KERN: "15",
    KINGS: "16",
    LAKE: "17",
    LASSEN: "18",
    LOS_ANGELES: "19",
    MADERA: "20",
    MARIN: "21",
    MARIPOSA: "22",
    MENDOCINO: "23",
    MERCED: "24",
    MODOC: "25",
    MONO: "26",
    MONTEREY: "27",
    NAPA: "28",
    NEVADA: "29",
    ORANGE: "30",
    PLACER: "31",
    PLUMAS: "32",
    RIVERSIDE: "33",
    SACRAMENTO: "34",
    SAN_BENITO: "35",
    SAN_BERNARDINO: "36",
    SAN_DIEGO: "37",
    SAN_FRANCISCO: "38",
    SAN_JOAQUIN: "39",
    SAN_LUIS_OBISPO: "40",
    SAN_MATEO: "41",
    SANTA_BARBARA: "42",
    SANTA_CLARA: "43",
    SANTA_CRUZ: "44",
    SHASTA: "45",
    SIERRA: "46",
    SISKIYOU: "47",
    SOLANO: "48",
    SONOMA: "49",
    STANISLAUS: "50",
    SUTTER: "51",
    TEHAMA: "52",
    TRINITY: "53",
    TULARE: "54",
    TUOLUMNE: "55",
    VENTURA: "56",
    YOLO: "57",
    YUBA: "58"
}

const COUNTIES_STR = [
    "Alameda",
    "Alpine",
    "Amador",
    "Butte",
    "Calaveras",
    "Colusa"
]

export default class AutoCompleteForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phrase: "",
            guess: ""
        };

        // if we don't bind this it won't work as an onChange handler
        this.handleCountyChange = this.handleCountyChange.bind(this)
    }

    guessWordFromCountySet(candidate) {
        let bestGuess = {
            "value": 1000, // doesn't have to be MAXINT, this function is run per character.
            "index": undefined
        }
        candidate = candidate.toLowerCase()
        for (let word_index = 0; word_index < COUNTIES_STR; word_index++) {
            const newDiff = Math.abs(candidate - COUNTIES_STR[word_index])
            console.log("newDiff", newDiff)
            if (newDiff < bestGuess["value"]) {
                bestGuess["value"] = newDiff
                bestGuess["index"] = word_index
            }
        }
        console.log("best guess", bestGuess)
    }

    z
    handleCountyChange(event) {
        console.log(event.target.textContent)
    }

    render() {
        return (
            <form onSubmit={() => console.log(this.state)}>
                <Grid container alignItems="center" justifyContent="center" direction="column">
                    <Grid item>
                        <Autocomplete
                            disablePortal
                            id="auto"
                            options={COUNTIES_STR}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Counties" />}
                            onChange={this.handleCountyChange}
                        />
                    </Grid>
                </Grid>
            </form>
        )
    }
}