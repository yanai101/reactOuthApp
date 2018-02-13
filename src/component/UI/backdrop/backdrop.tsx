import * as React from 'react';

import classes from './backdrop.scss';

const Backdrop: React.SFC<BackDropPrpos> = (props)  => (
    // tslint:disable-next-line:jsx-self-close
    props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null
);

Backdrop.defaultProps = {
    show: true
};

interface BackDropPrpos {
    clicked: any ;
    show: boolean;
}

export default Backdrop;