from app import db


class Friend(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(100), nullable=False)
  role = db.Column(db.String(120), nullable=False)
  description = db.Column(db.Text, nullable=False)
  gender = db.Column(db.String(10), nullable=False)
  img_url = db.Column(db.String(200), nullable=True)

  def __init__(self, name, role, description, gender, img_url) -> None:
    self.name = name
    self.role = role
    self.description = description
    self.gender = gender
    self.img_url = img_url

  def to_json(self):
    return {
      "id": self.id,
      "name": self.name,
      "role": self.role,
      "description": self.description,
      "gender": self.gender,
      "imgUrl": self.img_url,
    }