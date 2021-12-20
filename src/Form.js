import React from "react";
import SECRETS from "./secrets";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";


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

export default class Form extends React.Component {
    constructor(props) {
        super(props)

        // bind the handler functions to this class, so that when they are passed to children components
        // the function defined in this file.
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this)

        this.state = {
            name: "",
            counties: []
        }
    }

    makePretty(county) {
        return county.toLowerCase().replaceAll('_', ' ').replace(/^(.)|\s+(.)/g, c => c.toUpperCase())
    }

    handleNameChange(event) {
        const {value} = event.target
        this.setState({
            name: value,
            counties: this.state.counties,
        });
    }

    handleCheckBoxChange(event) {
        this.setState({
            name: this.state.name,
            counties: event.target.checked ?
                [...this.state.counties, COUNTIES[event.target.name]] :
                [...this.state.counties.filter(county => county !== COUNTIES[event.target.name])],
        });
    };

    render() {
        const { onFormSubmit } = this.props
        return (
            <form onSubmit={() => onFormSubmit(this.state.name, this.state.counties)}>
                <Grid container alignItems="center" justifyContent="center" direction="column">
                    <Grid item>
                        <TextField
                            id="name-input"
                            name="name"
                            label="Name"
                            type="text"
                            value={this.state.name}
                            onChange={this.handleNameChange}
                        />
                    </Grid>
                    <Grid container alignItems="center" justifyContent="center" direction="row">
                        <Grid item>
                            <FormGroup>
                                {
                                    Object.keys(COUNTIES).slice(0,15).map((county) => {
                                        return (
                                            <FormControlLabel
                                                key={COUNTIES[county]}
                                                id={`${county}-input`}
                                                name={county}
                                                value={this.state.counties}
                                                control={<Checkbox />}
                                                label={this.makePretty(county)}
                                                onChange={this.handleCheckBoxChange}
                                            />
                                        )
                                    })
                                }
                            </FormGroup>
                        </Grid>
                        <Grid item>
                            <FormGroup>
                                {
                                    Object.keys(COUNTIES).slice(15,30).map((county) => {
                                        return (
                                            <FormControlLabel
                                                key={COUNTIES[county]}
                                                id={`${county}-input`}
                                                name={county}
                                                value={this.state.counties}
                                                control={<Checkbox />}
                                                label={this.makePretty(county)}
                                                onChange={this.handleCheckBoxChange}
                                            />
                                        )
                                    })
                                }
                            </FormGroup>
                        </Grid>
                        <Grid item>
                            <FormGroup>
                                {
                                    Object.keys(COUNTIES).slice(30,45).map((county) => {
                                        return (
                                            <FormControlLabel
                                                key={COUNTIES[county]}
                                                id={`${county}-input`}
                                                name={county}
                                                value={this.state.counties}
                                                control={<Checkbox />}
                                                label={this.makePretty(county)}
                                                onChange={this.handleCheckBoxChange}
                                            />
                                        )
                                    })
                                }
                            </FormGroup>
                        </Grid>
                        <Grid item>
                            <FormGroup>
                                {
                                    Object.keys(COUNTIES).slice(45,58).map((county) => {
                                        return (
                                            <FormControlLabel
                                                key={COUNTIES[county]}
                                                id={`${county}-input`}
                                                name={county}
                                                value={this.state.counties}
                                                control={<Checkbox />}
                                                label={this.makePretty(county)}
                                                onChange={this.handleCheckBoxChange}
                                            />
                                        )
                                    })
                                }
                            </FormGroup>
                        </Grid>
                    </Grid>
                    <Button variant="contained" color="primary" type="submit">
                        Submit
                    </Button>
                </Grid>
            </form>
        )
    }
}