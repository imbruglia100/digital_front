from flask import Blueprint, jsonify, request, render_template, redirect
from app.models import db
from ..aws import upload_file_to_s3, remove_file_from_s3, get_unique_filename
from ..forms.image_form import ImageForm

image_routes = Blueprint('image', __name__)

@image_routes.route('', methods=["POST"])
def upload_file():
    form = ImageForm()

    if form.validate_on_submit():

        image = form.data["image"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        print(upload)

        if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message (and we printed it above)
            return render_template("post_form.html", form=form, errors=[upload])

        url = upload["url"]
        new_image = Post(image= url)
        db.session.add(new_image)
        db.session.commit()
        return 

    if form.errors:
        print(form.errors)
        return render_template("post_form.html", form=form, errors=form.errors)

    return render_template("post_form.html", form=form, errors=None)
