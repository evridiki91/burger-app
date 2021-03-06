import React from 'react';
import classes from '../BuildControls/BuildControls.css';
import BuildControl from '../BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p className={classes.Price}>Current price: {props.totalPrice}</p>
        {controls.map(ctrl => (
           <BuildControl 
            key={ctrl.label} 
            ingredientLabel={ctrl.label}
            added={() => props.ingredientAdded(ctrl.type)}
            removed={() => props.ingredientRemoved(ctrl.type)}
            disabled={props.disabled[ctrl.type]}/> 
        ))}
        <button 
            className={classes.OrderButton}
            disabled={props.readyToOrder}
            onClick={props.clickOrderNow}>Place Order
        </button>
    </div>
);

export default buildControls; 