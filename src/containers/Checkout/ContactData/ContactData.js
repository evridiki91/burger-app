import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css'
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postCode: ''
        },
        loading: false,
    }

    orderHandler = (event) => {
        event.preventDefault()
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.props.price,
            customer: {
                name: 'Evridiki Christodoulou',
                address: {
                    street: 'Bristol Street',
                    zipCode: 2405,
                    country: 'UK',
                },
                email: 'evridiki@gmail.com'
            },
            deliveryMethod: 'fastest',
        }
        axios.post('/orders.json', order) //need .json for firebase only endpoint
            .then(response => {
                console.log(response);
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error => {
                console.log(error);
                this.setState({loading: false});
            });
    }

    render() {
        let form = (
            <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
                    <input className={classes.Input} type="email" name="email" placeholder="Your Email address"/>
                    <input className={classes.Input} type="text" name="street" placeholder="Your Street Name"/>
                    <input className={classes.Input} type="text" name="postCode" placeholder="Your Post code"/>
                    <Button btnType="Success" clicked={this.orderHandler}>Submit Details</Button>
                </form>
        );
        if(this.state.loading){
          form = <Spinner/>  
        }
        return (
            <div className={classes.ContactData}>
                <h4>Type in your contact details</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;