from flask import Blueprint, request, jsonify
from models import db, Order
import stripe

payment_routes = Blueprint("payment_routes", __name__)
stripe.api_key ="pk_test_51QYyA5EA7NsVnLJaG3WNN5HBKOHVPjrdAcORKOEikcmAzFFo96r7tctJIxzgg3dRacsvsXrnuo5CZI5MK7oaHP4G00UnMfYLP1"

@payment_routes.route('/api/checkout',methods=['POST'])
def checkout():
    data =request.json

    try:
        #create payment intent
        intent = stripe.PaymentInent.create(
            amount=int(data['ammount']*100),
            currency='usd',
            payment_method=data['paymentMethodId'],
            confirmation_method='manual',
            confirm=True
        )
        #create order
        order = Order(status='pending',amount=data ['amount'])
        db.session.add(order)
        db.session.commit()
        return sonify({'success': True, 'orderId': order.id})
    except stripe.error.StripeError as e:
        return jsonify({'error': str(e)}), 400

@payment_routes.route('/api/status/<int:id>', methods=['GET'])
def status(id):
    order = Order.query.get(id)
    if order:
        return jsonify({'status': order.status})
    return jsonify({'error': 'Order not found'}), 404