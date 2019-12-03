import React, {Component} from 'react';
import Aux from '../../Hoc/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    // constructor(props){
    //     super(props);
    //     this.state ={...}
    // }
    state = {
        ingredients: {
            salad: 2,
            bacon: 1,
            cheese: 2,
            meat: 2,
        },
        totalPrice: 4,
    }

    addIngredientHandler = (type) => {
        const oldIngredientCount = this.state.ingredients[type];
        let newIngredientCount = oldIngredientCount + 1;
        const newIngredients = {
            ...this.state.ingredients
        };
        newIngredients[type] = newIngredientCount;
        const oldPrice = this.state.totalPrice;
        const extraCost = INGREDIENT_PRICES[type];
        const newPrice = oldPrice + extraCost;
        this.setState({ingredients: newIngredients, totalPrice: newPrice});
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
    }

    render() {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;