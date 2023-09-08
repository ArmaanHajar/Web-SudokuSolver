from flask import Flask
from views import views
from boardGenerator import generate_easy_board, generate_medium_board, generate_hard_board, generate_expert_board

app = Flask(__name__)
app.register_blueprint(views, url_prefix="/views")

if __name__ == '__main__':
    app.run(debug="true", port=8000)