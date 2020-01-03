import React, {Component} from 'react';
import Aux from '../../Hoc/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 1,
            meat: 1,
        },
        totalPrice: 4.5,
        readyToOrder: true,
        purchasing: false,
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
        alert('You continue');
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing}
                        modalClosed={this.purchaseHandlerCancel}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        purchaseCanceled={this.purchaseHandlerCancel}
                        purchaseContinue={this.purchaseContinueHandler}
                        price={this.state.totalPrice}/>
                </Modal>
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
    }
}

export default BurgerBuilder;