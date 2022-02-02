import React from "react";
import AutocompleteForm from "../Autocomplete/AutocompleteForm";
import SECRETS from "../../Secrets/secrets";
import Box from "@material-ui/core/Box"
import Grid from '@mui/material/Grid';
import ResponsePage from "../ResponsePage/ResponsePage";
import Button from '@mui/material/Button';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';


export default class PrettyForm extends React.Component {
    constructor(props) {
        super(props)

        const autocompleteKey = Math.random().toString() // by setting a new key we remount the child component (resetting it)

        this.state = {
            autocompleteKey: autocompleteKey, // random key for remounting the Autocomplete element
            showForm: true,
            loading: false,
            antoQuery: {
                counties: undefined,
                maxCount: undefined
            }
        }

        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.resetPrettyForm = this.resetPrettyForm.bind(this)
    }

    /*
        HTTP request to the backend for pesticide counts & maxCount
        runs query like: http://<host>/query-pur-db?counties=[45]
        (ex: http://localhost:3001/query-pur-db?counties=[45])

        parameters:
            counties = [10, 11, ..., 58]
        returns:
            returnsType = {
                counties: [0, 0, 0, ...],
                maxCount: 0
            }
        * disregard the numerical values here, they are just placeholders
    */
    requestPesticideCounts(counties) {

        const url = process.env.NODE_ENV === 'production' ?
            `${SECRETS.ANTO_BACKEND_SERVER_API}query-pur-db?counties=[${counties}]` :
            `${SECRETS.ANTO_DEV_BACKEND_SERVER_API}query-pur-db?counties=[${counties}]`

        // console.log("initiated https request at", url)

        const fetchPesticideCount = fetch(url, {
            method: "GET",
            mode: "cors"
        })
            .then(response => {
                return response.text()
            })
            .then(responseAsText => {
                return responseAsText.replace('[', '').replace(']', '').split(',', )
            })
            .then(parsedText => {
                const parsedResponse = {
                    counties: parsedText.slice(0,-1),
                    maxCount: parsedText.slice(-1)
                }
                // console.log("url", url, "result", parsedResponse)
                return parsedResponse
            })
            .catch(error => {
                // console.log("url", url, "error", error)
                return {
                    counties: "0".repeat(counties.length).split("").map( parseFloat ),
                    maxCount: 0
                }
            })

        return fetchPesticideCount
    }

    // just used to simulate loading screen
    fakeRequestPesticideCounts(counties) {

        const fake = new Promise((resolve, reject) => {
            setTimeout(() => resolve({
                counties: [0, 0],
                maxCount: -1
            }), 3 * 1000)
        })

        return fake;
    }

    async handleFormSubmit(counties) {
        this.setState({
            loading: true
        })

        const pesticideCounts = await this.requestPesticideCounts(counties)
            // const pesticideCounts = await this.fakeRequestPesticideCounts(counties)

        this.setState({
            showForm: false,
            loading: false,
            antoQuery: {
                counties: pesticideCounts.counties,
                maxCount: pesticideCounts.maxCount
            }
        })
    }

    showFormPage(loading, autocompleteKey) {
        return <AutocompleteForm
            key={ autocompleteKey }
            loading={loading}
            onFormSubmit={this.handleFormSubmit}
        />;
    }

    showResponsePage(antoQuery) {
        return <ResponsePage
            antoQuery={antoQuery}
        />
    }

    resetPrettyForm() {

        const autocompleteKey = Math.random().toString() // by setting a new key we remount the child component (resetting it)
        console.log("key", autocompleteKey)

        this.setState({
            autocompleteKey: autocompleteKey,
            showForm: true,
            loading: false,
            antoQuery: {
                counties: undefined,
                maxCount: undefined
        }
    })
    }

    render() {
        const { showForm, loading, autocompleteKey, antoQuery } = this.state
        return (
                <Box sx={{
                    paddingTop: 70,
                    minWidth: 500,
                    justifyContent: 'center',
                }}>
                    <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2}>
                        <Grid item>
                        {
                            this.showFormPage(loading, autocompleteKey)
                        }
                        </Grid>
                        <Grid item>
                        {
                            showForm ? null :
                                this.showResponsePage(antoQuery)
                        }
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" onClick={this.resetPrettyForm}>
                                Reset
                            </Button>
                        </Grid>
                        <Grid item>
                            <Breadcrumbs aria-label="breadcrumb">
                                <Link underline="hover" color="inherit" href="https://tryanto.io/">
                                    Back to Anto.io
                                </Link>
                                <Link underline="hover" color="inherit" href="https://github.com/BPDanek">
                                    SRC
                                </Link>
                            </Breadcrumbs>
                        </Grid>
                    </Grid>
                </Box>
        );
    }
}