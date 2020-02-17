import React from 'react';
import classes from '../Burger/Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import {withRouter} from 'react-router-dom';

const burger = (props) => {
    let ingredientsArray = Object.keys(props.ingredients)
    .map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_,i)=>{
            return <BurgerIngredient key={igKey + i} type={igKey}/>
        })
    })
    .reduce((arr, el) => {
        return arr.concat(el); 
    }, []);

    if(ingredientsArray.length === 0){
        ingredientsArray = <p>Please add ingredients!</p>
    }
    console.log(ingredientsArray);
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {ingredientsArray}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default withRouter(burger);