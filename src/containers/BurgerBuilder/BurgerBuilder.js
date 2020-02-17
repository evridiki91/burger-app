import React, {Component} from 'react';
import Aux from '../../Hoc/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../Hoc/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 1,
    meat: 2,
    bacon: 1,
}

class BurgerBuilder extends Component {
    // constructor(props){
    //     super(props);
    //     this.state ={...}
    // }
    state = {
        ingredients: null,
        totalPrice: 4.5,
        readyToOrder: true,
        purchasing: false,
        loading: false,
        error: false,
    }

    componentDidMount() {
        axios.get('https://react-burger-app-evi.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data})
            })
            .catch(error => {
                this.setState({error: true})
            })
    }

    addIngredientHandler = (type) => {
        const oldIngredientCount = this.state.ingredients[type];
        let newIngredientCount = oldIngredientCount + 1;
        let totalIngredients = this.state.totalIngredients;
        totalIngredients++;
        const newIngredients = {
            ...this.state.ingredients
        };
        newIngredients[type] = newIngredientCount;
        const oldPrice = this.state.totalPrice;
        const extraCost = INGREDIENT_PRICES[type];
        const newPrice = oldPrice + extraCost;
        this.setState({ingredients: newIngredients, totalPrice: newPrice});
        this.updatePurchaseState(newIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldIngredientCount = this.state.ingredients[type];
        if(oldIngredientCount <=0) return;
        let newIngredientCount = oldIngredientCount - 1;
        const newIngredients = {
            ...this.state.ingredients
        };
        newIngredients[type] = newIngredientCount;
        const oldPrice = this.state.totalPrice;
        const extraCost = INGREDIENT_PRICES[type];
        const newPrice = oldPrice - extraCost;
        this.setState({ingredients: newIngredients, totalPrice: newPrice});
        this.updatePurchaseState(newIngredients);
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum +el;
            }, 0);
        
        this.setState({readyToOrder: sum > 0})
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseHandlerCancel = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // alert('You continue');
        
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' +this.state.totalPrice)
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search:'?' + queryString,
        });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>The ingredients can't be loaded.</p> : <Spinner/>;
        
        if(this.state.ingredients)
        {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        readyToOrder={!this.state.readyToOrder}
                        clickOrderNow={this.purchaseHandler}
                        totalPrice={this.state.totalPrice}/>
                </Aux>
            );

            orderSummary = <OrderSummary 
            ingredients={this.state.ingredients}
            purchaseCanceled={this.purchaseHandlerCancel}
            purchaseContinue={this.purchaseContinueHandler}
            price={this.state.totalPrice}/>
        }

        if(this.state.loading){
            orderSummary = <Spinner/>;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing}
                        modalClosed={this.purchaseHandlerCancel}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);