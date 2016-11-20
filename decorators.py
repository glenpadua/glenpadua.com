from flask_login import current_user

def admin_only(f):
    """Returns 404 if the user is not an admin."""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not current_user.is_admin():
            abort(403)
        return f(*args, **kwargs)
    return decorated_function

def logout_required(f, target):
    """Redirects to target if logged in"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if current_user.is_authenticated():
            return redirect(url_for(target))
        return f(*args, **kwargs)
    return decorated_function

