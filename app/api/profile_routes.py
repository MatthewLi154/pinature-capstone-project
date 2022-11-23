from flask import Blueprint, request
from app.models import User, Pin

profile_routes = Blueprint('profiles', __name__)


@profile_routes.route('')
def profiles():
    """
    Query and return all profiles
    """
    profiles = User.query.all()
    profiles_dict = {}
    for profile in profiles:
        profiles_dict[profile.id] = profile.to_dict()
    return profiles_dict


@profile_routes.route('/<id>/pins/created')
def profile_pins(id):
    """
    Query all pins created by user
    """
    pins = Pin.query.filter_by(profile_id=id).all()
    pins_dict = {}
    for pin in pins:
        pins_dict[pin.id] = pin.to_dict()
    return pins_dict


@profile_routes.route('/<id>')
def get_single_profile(id):
    """
    Query for single profile information
    """
    profile = User.query.get(id)
    return profile.to_dict()