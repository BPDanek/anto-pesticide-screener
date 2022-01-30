import React from "react";
import AutocompleteForm from "../Autocomplete/AutocompleteForm";
import SECRETS from "../../Secrets/secrets";
import Box from "@material-ui/core/Box"
import Card from "@material-ui/core/Card"
import Typography from "@material-ui/core/Typography"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import Button from "@material-ui/core/Button"
import ResponsePage from "../ResponsePage/ResponsePage";

export default class PrettyForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            showForm: true,
            loading: false,
            antoQuery: {
                counties: undefined,
                maxCount: undefined
            }
        }

        this.handleFormSubmit = this.handleFormSubmit.bind(this)
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

    showResponsePage(patientName, antoQuery) {
        return <ResponsePage
            patientName={patientName}
            antoQuery={antoQuery}
        />
    }

    showFormPage(loading) {
        return <AutocompleteForm
            disable={loading}
            onFormSubmit={this.handleFormSubmit}
        />;
    }

    render() {
        const { showForm, loading, patientName, antoQuery } = this.state
        console.log("loading...", loading)
        return (
            <Box sx={{
                paddingTop: 70,
                minWidth: 500,
                display: 'flex',
                flexDirection: 'center',
                justifyContent: 'center',
            }}>
                {
                    showForm ?
                        this.showFormPage(loading) :
                        this.showResponsePage(patientName, antoQuery)
                }
            </Box>
        );
    }
}