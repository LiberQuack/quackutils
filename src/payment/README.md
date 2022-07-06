## This doc is not complete

Reusing lib/payment

Server
- Make sure your project types implements this lib `PaymentUser` and `PaymentProduct`
- Create a `class PaymentService implements PaymentManager`
- Implement the abstract methods, your IDE will complain if you do not
- Make a new instance of your service `const paymentService = new PaymentService([new PaymentStripeProvider(...)])` (you can implement your own payment provider if you will)
- Expose `paymentService` methods in your web server
  - `paymentService.createCard`
  - `paymentService.updateDefaultCard`
  - `paymentService.calculateCheckout`
  - `paymentService.checkout`

Client  
//TODO