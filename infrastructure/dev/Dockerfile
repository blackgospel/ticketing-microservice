FROM nikolaik/python-nodejs

COPY ./init.sh ./.bin/init.sh
RUN chmod +x ./.bin/init.sh

RUN pip install awscli --upgrade

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.8.0/wait /wait
RUN chmod +x /wait

CMD /wait && /.bin/init.sh
