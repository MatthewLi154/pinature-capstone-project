from flask import Blueprint, request
from app.models import User, Pin, db

pin_routes = Blueprint('pins', __name__)


@pin_routes.route('')
def pins():
    """
    Query for all pins and returns them in a list of pin dictionaries
    """
    pins = Pin.query.all()
    pins_dict = {}
    for pin in pins:
        pins_dict[pin.id] = pin.to_dict()
    return pins_dict

@pin_routes.route('/<id>')
def get_single_pin(id):
    pin = Pin.query.get(id)
    return pin.to_dict()


@pin_routes.route('', methods=['POST'])
def add_pin():
    """
    This route will take in pin data from pin-builder and store it into the database,
    then return json data of the pin
    """
    data = request.get_json()
    new_pin = Pin(**data)
    db.session.add(new_pin)
    db.session.commit()
    return new_pin.to_dict()


@pin_routes.route('/<id>', methods=['DELETE'])
def delete_pin(id):
    """
    This route will delete a pin by their pin id
    """
    pin = Pin.query.get(id)
    db.session.delete(pin)
    db.session.commit()
    return {"message": "Successfully deleted"}

@pin_routes.route('/profile/<profile_id>/pins/created')
def profile_pins(profile_id):
    """
    Query all pins created by user
    """
    pins = Pin.query.filter_by(profile_id=id).all()
    pins_dict = {}
    for pin in pins:
        pins_dict[pin.id] = pin.to_dict()
    return pins_dict
