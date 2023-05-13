FROM python:3.9-slim-buster

RUN pip install tensorflow
RUN pip install flask
RUN pip install waitress
RUN pip install transformers
RUN pip install sentencepiece

WORKDIR /app

COPY . .

RUN python ./get_sentiment.py
RUN python ./get_summarizer.py


CMD [ "python", "./server.py" ]
