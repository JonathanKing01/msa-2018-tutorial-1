import * as React from 'react';
import { Link } from 'react-router-dom';
import {AppBar, Toolbar, Typography} from '@material-ui/core/';

export const Header: React.StatelessComponent<{}> = () => {
    return (
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="display2" color="inherit">
                        <Link style={{color: "white"}} to="/">Dictionary</Link>
                        <Link to="/Thesaurus"> Thesaurus </Link>
                    </Typography>
                </Toolbar>
            </AppBar>
    );
}
