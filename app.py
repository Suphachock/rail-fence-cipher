from flask import (
    Flask, render_template, request, Markup
)

app = Flask(__name__)


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/submit', methods=['GET', 'POST'])
def encoder():
    if request.method == "POST":
        text = request.form['text'].strip()
        keys = request.form['keys']

        def fence_pattern(rails, message_size):
            r = 2 * (rails - 1)
            return sorted(((z % r) if (z % r) < rails else r - (z % r), z) for z in range(message_size))

        def encode(msg, rails):
            return ''.join(msg[i] for _, i in fence_pattern(rails, len(msg)))
        data = encode(text, int(keys))
        return(data)
    return render_template('index.html')


if __name__ == "__main__":
    app.run(debug=True)
