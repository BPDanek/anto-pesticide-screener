import React from "react";
import Form from "./Form";
import SECRETS from "./secrets";
import Box from "@material-ui/core/Box"
import Card from "@material-ui/core/Card"
import Typography from "@material-ui/core/Typography"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import Button from "@material-ui/core/Button"

export default class PrettyForm extends React.Component {
    constructor(props) {
        super(props)

        this.handleFormSubmission = this.handleFormSubmission.bind(this)
        this.handleFormResponse = this.handleFormResponse.bind(this)

        this.state = {
            showLoading: false,     // show when loading
            showResponse: false, // show form by default, show form response when form returned
            response: "0",
            name: "Patient"
        }
    }

    //ex:
    /*
        hit the backend server for pesticide counts
        given counties = [10, 11, 58]

        runs query like: http://<host>/query-pur-db?counties=[45]
        (ex: http://localhost:3001/query-pur-db?counties=[45])

        returns { counties: [0, 0, 0, ...], maxCount: 0 }
        (we return this 0s object in the errr case, but there should be non-zero values in other cases.)
    */
    requestPesticideCounts(counties) {
        let url
        if (process.env.NODE_ENV === 'production') {
            url = `${SECRETS.ANTO_BACKEND_SERVER_API}query-pur-db?counties=[${counties}]`
        } else {
            url = `${SECRETS.ANTO_DEV_BACKEND_SERVER_API}query-pur-db?counties=[${counties}]`
        }

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
                return {
                    counties: parsedText.slice(0,-1),
                    maxCount: parsedText.slice(-1)
                }
            })
            .catch(error => {
                console.log("url", url, "error", error)
                return {
                    counties: "0".repeat(counties.length).split("").map( parseFloat ),
                    maxCount: 0
                }
            })

        return fetchPesticideCount
    }

    handleFormSubmission(name, counties) {
        this.setState({name: name, showLoading: true, showResponse: false })

        this.requestPesticideCounts(counties)
            .then(
                (response) => {
                    this.setState({
                        showLoading: false, showResponse: true, response: response
                    })
                },
                (error) => {
                    console.log(error)
                    this.setState({
                        showLoading: false, showResponse: true, response: {counties: [-1], maxCount: -1}
                    })
                })
    }


    handleFormResponse() {
        console.log("formHasResponded")
        this.setState({
            showLoading: false,
            showResponse: true
        })
    }

    //todo: https://mui.com/components/backdrop/
    loadingScreen() {
        return (
          <div>
              <p>Loading...</p>
          </div>
        );
    }

    showFormPage() {
        return (
            <div>
                <Form
                    onFormSubmit={this.handleFormSubmission}
                />
            </div>
        );
    }

    /*
        please hire an environmental scientist. This won't do at all.
    */
    computeCount(counties, maxCount) {
        console.log("count", counties, maxCount)
        const total = counties.reduce((runningTotal, currentCountyCount) => runningTotal + parseInt(currentCountyCount), 0)
        return total / (maxCount * counties.length)
    }

    showResponsePage() {
        const state = this.state
        console.log("", state)
        const card = (
            <React.Fragment>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} gutterBottom>
                        {this.state.name ? this.state.name : "Patient"}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {Math.floor(this.computeCount(state.response.counties, state.response.maxCount)*100)}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} >
                        Pesticides in your county.
                    </Typography>
                    {/*<Typography variant="body2">*/}
                    {/*    well meaning and kindly.*/}
                    {/*    <br />*/}
                    {/*    {'"a benevolent smile"'}*/}
                    {/*</Typography>*/}
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </React.Fragment>
        );

        return (
            <Box sx={{ minWidth: 275, display: 'flex', flexDirection: 'center', justifyContent: 'center'}}>
                <Card variant="outlined">{card}</Card>
            </Box>
        );
    }

    render() {
        const { showLoading, showResponse } = this.state
        console.log(this.state)

        return showLoading ?
            this.loadingScreen() :
            <div>
                {showResponse ? this.showResponsePage() : null}
                {this.showFormPage()}
            </div>

    }
}