import React, { useState } from "react";
import SECRETS from "./secrets";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";

// handleSubmit(data => {
//     let url
//     if (process.env.NODE_ENV === 'production') {
//         url = `${SECRETS.ANTO_BACKEND_SERVER_API}query-pur-db?counties=${data.counties}`
//     } else {
//         url = `${SECRETS.ANTO_DEV_BACKEND_SERVER_API}query-pur-db?counties=${data.counties}`
//     }
//     fetch(url, {
//         method: "GET",
//         mode: "cors"
//     })
//         .then(response => {console.log("response", response.text())})
//         .catch(error => {console.log("error", error)})
// })}>

// county_cd,couty_name
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
    YUBA: '58'
}

const defaultValues = {
    name: "",
    counties: []
};

const makePretty = (county) => {
    return county.toLowerCase().replaceAll('_', ' ').replace(/^(.)|\s+(.)/g, c => c.toUpperCase())
}

const Form = () => {
    const [formValues, setFormValues] = useState(defaultValues);

    const handleNameChange = (event) => {
        const {value} = event.target
        setFormValues({
            name: value,
            counties: formValues.counties
        });
    }

    const handleCheckBoxChange = (event) => {
        setFormValues({
            name: formValues.name,
            counties: event.target.checked ?
                [...formValues.counties, COUNTIES[event.target.name]] :
                [...formValues.counties.filter(county => county !== COUNTIES[event.target.name])]
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formValues);
    };
    return (
        <form onSubmit={handleSubmit}>
            <Grid container alignItems="center" justify="center" direction="column">
                <Grid item>
                    <TextField
                        id="name-input"
                        name="name"
                        label="Name"
                        type="text"
                        value={formValues.name}
                        onChange={handleNameChange}
                    />
                </Grid>
                <Grid item>
                    <FormGroup>
                    {
                        Object.keys(COUNTIES).map((county) => {
                            return (
                                <FormControlLabel
                                    id={`${county}-input`}
                                    name={county}
                                    value={formValues.counties}
                                    control={<Checkbox />}
                                    label={makePretty(county)}
                                    onChange={handleCheckBoxChange}
                                />
                            )
                        })
                    }
                    </FormGroup>
                </Grid>
                <Button variant="contained" color="primary" type="submit">
                    Submit
                </Button>
            </Grid>
        </form>
    );
};
export default Form;