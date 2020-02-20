const { Router } = require('express');
const router = Router();
const stripe = require('stripe')('sk_test_FJkbsAOSkVsqE6yNCQuv82bA00quRTJI4m');

router.get('/', (req, res) => {
    res.render('index');
});

router.post('/checkout', async(req, res) => {
    console.log(req.body);
    const customer = await stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    });
    const charge = await stripe.charges.create({
        amount: '6200',
        currency: 'usd',
        customer: customer.id,
        description: 'Entrada'
    });
    console.log(charge.id);

    res.render('download');

});



module.exports = router;