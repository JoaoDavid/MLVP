FROM python

WORKDIR /backend

COPY requirements.pip /backend

RUN pip install -r requirements.pip

COPY . /backend

EXPOSE 8000

CMD [ "python", "serverDev.py"]