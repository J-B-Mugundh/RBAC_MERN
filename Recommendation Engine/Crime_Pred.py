import numpy as np
import pandas as pd
import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.layers import Embedding, LSTM, Dense, Dropout
from sklearn.model_selection import train_test_split

sensitivity_df = pd.read_csv('sensitivity_data.csv')

# Preprocessing
tokenizer = Tokenizer()
tokenizer.fit_on_texts(sensitivity_df['Description'])
sequences = tokenizer.texts_to_sequences(sensitivity_df['Description'])
max_length = max([len(seq) for seq in sequences])
padded_sequences = pad_sequences(sequences, maxlen=max_length, padding='post', truncating='post')  # Add input_length here


label_mapping = {'Low': 0, 'Medium': 1, 'High': 2}
labels = sensitivity_df['Sensitivity'].map(label_mapping)
num_classes = len(label_mapping)

unexpected_labels = labels[labels.isna()]
if not unexpected_labels.empty:
    print("Warning: Found unexpected label values. Dropping corresponding rows.")
    sensitivity_df.drop(unexpected_labels.index, inplace=True)
    padded_sequences = np.delete(padded_sequences, unexpected_labels.index, axis=0)
    labels.dropna(inplace=True)

X_train, X_test, y_train, y_test = train_test_split(padded_sequences, labels, test_size=0.2, random_state=42)

model = tf.keras.Sequential([
    Embedding(input_dim=len(tokenizer.word_index)+1, output_dim=100),  # Remove input_length here
    LSTM(128, dropout=0.2, recurrent_dropout=0.2),
    Dense(64, activation='relu'),
    Dropout(0.5),
    Dense(num_classes, activation='softmax')
])

model.compile(loss='sparse_categorical_crossentropy', optimizer='adam', metrics=['accuracy'])

model.fit(X_train, y_train, epochs=10, batch_size=64, validation_split=0.1)

loss, accuracy = model.evaluate(X_test, y_test)
print(f'Test Loss: {loss}')
print(f'Test Accuracy: {accuracy}')


import tensorflow as tf

# Train and fit your model

# Save the model with a valid extension (e.g., .h5)
model.save("my_model.h5")

# Load the model using TensorFlow's built-in function
loaded_model = tf.keras.models.load_model("my_model.h5")

new_description = "John Doe was a victim of burglary at 100 Main St, Torento, USA, by suspect Jane Smith. The incident occurred on May 19, 2024, at 12:00 PM. Jane Smith was arrested on-site, supported by evidence including photos, fingerprints, and video footage."
# Preprocess the new description
new_sequence = tokenizer.texts_to_sequences([new_description])
new_padded_sequence = pad_sequences(new_sequence, maxlen=max_length, padding='post')

# Make prediction
predicted_probabilities = model.predict(new_padded_sequence)
predicted_label_index = np.argmax(predicted_probabilities)
predicted_label = list(label_mapping.keys())[predicted_label_index]

print(f'Predicted Sensitivity Level: {predicted_label}')

fields_to_anonymize = []

if predicted_label == 'High':
    fields_to_anonymize = ['Date and Time of Incident', 'Victim Name', 'Suspect Name', 'Charges', 'Arrest Information', 'Evidence', 'Location']
elif predicted_label == 'Medium':
    fields_to_anonymize = ['Date and Time of Incident', 'Victim Name', 'Arrest Information', 'Evidence','Location']
elif predicted_label == 'Low':
    fields_to_anonymize = ['Victim Name', 'Arrest Information', 'Evidence']

print("Fields to anonymize based on predicted sensitivity level:", fields_to_anonymize)