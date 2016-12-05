from . import db
from sqlalchemy.sql import func

class BaseModel(db.Model):
    __abstract__ = True

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    status = db.Column(db.Integer, default=0, nullable=False)
    # Possible values
    # 1. 'active' - default value
    # 2. 'deleted'
    created_at = db.Column(db.DateTime, server_default=func.now())
    deleted_at = db.Column(db.DateTime)

