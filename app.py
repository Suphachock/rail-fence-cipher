import json
from flask import (
    Flask, render_template, request, Markup
)

app = Flask(__name__)


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


def encryptRailFence(text, key):

    rail = [['\n' for i in range(len(text))]
            for j in range(key)]

    # to find the direction
    dir_down = False
    row, col = 0, 0

    for i in range(len(text)):

        if (row == 0) or (row == key - 1):
            dir_down = not dir_down

        rail[row][col] = text[i]
        col += 1

        if dir_down:
            row += 1
        else:
            row -= 1

    result = []
    for i in range(key):
        for j in range(len(text)):
            if rail[i][j] != '\n':
                result.append(rail[i][j])
    return("" . join(result))


@app.route('/submit/<string:mytext>/<string:mykey>', methods=['GET', 'POST'])
def submit(mytext, mykey):
    if request.method == "POST":
        text = json.loads(mytext).strip()
        keys = json.loads(mykey)
        print(text, keys, "<----------------------")

        # text = request.form['text'].strip()
        # text = "ggggggggggggg"
        # keys = request.form['keys']
        data = encryptRailFence(text, int(keys))
        print(data)
        return(data)
    return render_template('index.html')


if __name__ == "__main__":
    app.run(debug=True)
