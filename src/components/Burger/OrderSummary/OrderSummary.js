import React from 'react';
import Aux from '../../../Hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredients = Object.keys(props.ingredients)
        .map(igKey => {
        return (
        <li key={igKey}>
            <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
        </li>);
        })
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>Delicious Burger with the following ingredients:</p>
            <ul>
                {ingredients}
            </ul>
            <p><strong>Total Price: {props.price}</strong></p>
            <Button clicked={props.purchaseCanceled} btnType="Danger">Cancel</Button>
            <Button clicked={props.purchaseContinue} btnType="Success">Continue to Checkout</Button>
        </Aux>
    );
};

export default orderSummary;