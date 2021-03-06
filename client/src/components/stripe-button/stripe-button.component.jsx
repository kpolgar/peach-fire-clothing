import React from 'react';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import Logo from '../../assets/peach.png';
import axios from 'axios';
import { clearCart } from '../../redux/cart/cart.actions';

const StripeCheckoutButton = ({ price, clearCart }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_XlXHGLOsA96R20cDOrBKAteS00yED14F7q';

    const onToken = token => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        })
            .then(response => {
            alert('Payment successful');
            clearCart()

        })
            .catch(error => {
                console.log('Payment error: ', JSON.parse(error));
                alert(
                'There was an issue with your payment. Please make sure you use the provided credit card.'
            )
        })
    };

    return (
        <StripeCheckout 
            label='Pay Now'
            name='Peach Fire Clothing Ltd.'
            billingAddress
            shippingAddress
            image={Logo}
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
}

const mapDispatchToProps = dispatch => ({
    clearCart: () => dispatch(clearCart())
});


export default connect(
    null, mapDispatchToProps)(StripeCheckoutButton);