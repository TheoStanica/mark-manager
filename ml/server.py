from flask import Flask, request, jsonify
import json
import tensorflow.keras as keras
from keras.utils import pad_sequences
from keras.preprocessing.text import tokenizer_from_json
from transformers import PegasusTokenizer, TFPegasusForConditionalGeneration

saved_directory = './ml_models/summary'

tokenizer_summary = PegasusTokenizer.from_pretrained(saved_directory)
model_summary = TFPegasusForConditionalGeneration.from_pretrained(saved_directory)

with open('./ml_models/sentiment/tokenizer.json') as f:
    data = json.load(f)
    tokenizer = tokenizer_from_json(data)
model = keras.models.load_model('./ml_models/sentiment/sa_model.h5')

app = Flask(__name__)


def decode_sentiment(score):
    if score < 0.4:
        return "Negative"
    elif score > 0.6:
        return "Positive"
    else:
        return "Neutral"


@app.route('/api/ml/sentiment', methods=['POST'])
def predict_sentiment():
    input_text = request.json['message']
    if not isinstance(input_text, str):  # Check if input_text is a string
        return jsonify({'error': 'Invalid input text'}), 400
    input_sequence = pad_sequences(tokenizer.texts_to_sequences([input_text]),
                                   maxlen=30)
    score = model.predict(input_sequence)[0]
    sentiment = decode_sentiment(score)
    return jsonify({'sentiment': sentiment})


@app.route('/api/ml/summarize', methods=["POST"])
def summarize_text():
    input_text = request.json['message']
    if not isinstance(input_text, str):
        return jsonify({'error': 'Invalid input text'}), 400

    batch = tokenizer_summary(input_text, truncation=True, padding="longest", return_tensors="tf")
    translated = model_summary.generate(**batch, max_length=130)
    tgt_text = tokenizer_summary.batch_decode(translated, skip_special_tokens=True)
    return jsonify(tgt_text)


if __name__ == '__main__':
    # app.run(debug=True, host='0.0.0.0', port=3000)
    from waitress import serve

    serve(app, host="0.0.0.0", port=3000)
