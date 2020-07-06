from flask import Flask, request, jsonify, render_template
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
from numpy import loadtxt
from keras.models import load_model
import joblib
import translate
import PreprocessingData as pd
import re, sys, os, csv, keras, pickle
from keras.preprocessing.sequence import pad_sequences

# declare constants
HOST = '0.0.0.0'
PORT = 8081 #os.environ.get('PORT')

# initialize flask application
app = Flask(__name__)
api = Api(app)

CORS(app)
MAX_NB_WORDS = 40000 # max no. of words for tokenizer
MAX_SEQUENCE_LENGTH = 30 # max length of text (words) including padding
VALIDATION_SPLIT = 0.2
EMBEDDING_DIM = 200 # embedding dimensions for word vectors (word2vec/GloVe)
# read model
#clf = joblib.load('model.pkl').set_params(n_jobs=1)
# load model
model = load_model('BalanceNet.h5')
model.load_weights('checkpoint-2.157.h5')
classes = ["neutral", "happy", "sad", "hate","anger"]
with open('tokenizer.pickle', 'rb') as handle:
    tokenizer = pickle.load(handle)

@app.route('/api/predictText' , methods=['POST'])
def PredictEmotionFromText():
    RequestData = request.get_json()
    if (translate.language_detected(RequestData['text']) != 'en'):
        RequestData['text']=translate.translate_text(RequestData['text'])


    RequestDataCleaned= pd.CleanData(RequestData['text'])
    
    sequences = tokenizer.texts_to_sequences([RequestDataCleaned])
    print(len(sequences[0]))

    sequences_input = pad_sequences(sequences, padding='pre', maxlen=(MAX_SEQUENCE_LENGTH-5))
    sequences_output = pad_sequences(sequences_input, padding='post', maxlen=(MAX_SEQUENCE_LENGTH))

    y_prob = model.predict(sequences_output)
    pred=y_prob.argmax(axis=-1)[0]
    textAndPred={
                    'text': RequestDataCleaned,
                    'Prediction': classes[pred]
                }
    return jsonify(textAndPred)



    

if __name__ == '__main__':
    # run web server
    app.run(host=HOST,debug=True,port=PORT)
    #app.run(debug=True)
