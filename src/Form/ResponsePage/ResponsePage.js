import React from "react";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";

/*
    please find an environmental scientist. This won't do at all.
*/
function computeCount(counties, maxCount) {

    try {
        const total = counties.reduce((runningTotal, currentCountyCount) => runningTotal + parseInt(currentCountyCount), 0)
        return total / (maxCount * counties.length);
    } catch (e) {
        return 0;
    }
}

// stateless componenet may as well be a function
function ResponsePage(props) {

    const antoQuery = props.antoQuery

    const card = (
        <React.Fragment>
            <CardContent>
                <Typography variant="h5" component="div">
                    {(computeCount(antoQuery.counties, antoQuery.maxCount)*100).toFixed(2)}
                </Typography>
                <Typography sx={{ mb: 1.5 }} >
                    Pesticide risk index.
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" href={"https://tryanto.io/"}>Learn More</Button>
            </CardActions>
        </React.Fragment>
    );

    return (
        <Card variant="outlined">{card}</Card>
    );
}

export default ResponsePage