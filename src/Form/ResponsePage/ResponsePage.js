import React from "react";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";

export default class ResponsePage extends React.Component {

    constructor(props) {
        super(props);
    }

    /*
        please find an environmental scientist. This won't do at all.
    */
    computeCount(counties, maxCount) {
        try {
            const total = counties.reduce((runningTotal, currentCountyCount) => runningTotal + parseInt(currentCountyCount), 0)
            return total / (maxCount * counties.length)
        } catch (e) {
            return 0
        }
    }

    render() {

        const { patientName, antoQuery } = this.props

        const card = (
            <React.Fragment>
                <CardContent>
                    <Typography sx={{ width: 500, fontSize: 14 }} gutterBottom>
                        {patientName ? patientName : "Patient"}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {(this.computeCount(antoQuery.counties, antoQuery.maxCount)*100).toFixed(2)}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} >
                        Pesticide risk index.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </React.Fragment>
        );

        return (
            <Card variant="outlined">{card}</Card>
        );
    }
}