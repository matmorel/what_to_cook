FROM ruby:3.2.2-alpine

RUN apk add --no-cache --update \
    build-base \
    postgresql-client \
    postgresql-dev \
    tzdata \
    yarn

RUN addgroup -g 1000 ruby && adduser -u 1000 -G ruby -s /bin/sh -D ruby
USER ruby

ENV APP_PATH=/usr/src/app

WORKDIR $APP_PATH
COPY . $APP_PATH
RUN gem install bundler:2.4.14

VOLUME [ "${GEM_HOME}" ]
EXPOSE 3000
ENTRYPOINT ["/usr/src/app/docker-entrypoint.sh"]
CMD ["bin/rails", "server", "-b", "0.0.0.0"]
