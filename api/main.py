from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from flask import Flask, json, request

analyzer = SentimentIntensityAnalyzer()




api = Flask(__name__)

@api.route('/api/predict', methods=['GET'])
def predict():
  print(request.args)
  print(request.args.get('text'))
  return analyzer.polarity_scores(request.args.get('text'))

if __name__ == '__main__':
    api.run()