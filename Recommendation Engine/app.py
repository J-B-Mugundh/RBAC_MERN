from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.preprocessing.text import Tokenizer

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the tokenizer and model
tokenizer = Tokenizer()
max_length = 50  # Assuming max sequence length used during training
model = tf.keras.models.load_model("my_model.h5")
label_mapping = {'Low': 0, 'Medium': 1, 'High': 2}

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    description = data['description']
    
    # Preprocess the new description
    new_sequence = tokenizer.texts_to_sequences([description])
    new_padded_sequence = pad_sequences(new_sequence, maxlen=max_length, padding='post')

    # Make prediction
    predicted_probabilities = model.predict(new_padded_sequence)
    predicted_label_index = np.argmax(predicted_probabilities)
    predicted_label = list(label_mapping.keys())[predicted_label_index]

    if predicted_label == 'High':
        fields_to_anonymize = ['Date and Time of Incident', 'Victim Name', 'Suspect Name', 'Charges', 'Arrest Information', 'Evidence', 'Location']
    elif predicted_label == 'Medium':
        fields_to_anonymize = ['Date and Time of Incident', 'Victim Name', 'Arrest Information', 'Evidence', 'Location']
    elif predicted_label == 'Low':
        fields_to_anonymize = ['Victim Name', 'Arrest Information', 'Evidence']

    return jsonify(fields_to_anonymize)

if __name__ == '__main__':
    app.run(debug=True)
