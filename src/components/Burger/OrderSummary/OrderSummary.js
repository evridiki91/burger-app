import React,{Component} from 'react';
import Aux from '../../../Hoc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    componentDidUpdate() {
        console.log("[OrderSummary Will update")
    }
    render () {
        const ingredients = Object.keys(this.props.ingredients)
                .map(igKey => {
                return (
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
                </li>);
                })

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>Delicious Burger with the following ingredients:</p>
                <ul>
                    {ingredients}
                </ul>
                <p><strong>Total Price: {this.props.price}</strong></p>
                <Button clicked={this.props.purchaseCanceled} btnType="Danger">Cancel</Button>
                <Button clicked={this.props.purchaseContinue} btnType="Success">Continue to Checkout</Button>
            </Aux>
        );
    }
};

export default OrderSummary;