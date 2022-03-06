FROM node:16.13.2-alpine3.14

RUN apk add --update \
            udev \
            ttf-freefont \
            chromium \
            git \
            docker docker-compose \
            openjdk11 \
            graphviz

RUN mkdir /mnt/workspace && \
    mkdir /workspace && \
    mkdir /noto

ADD https://noto-website.storage.googleapis.com/pkgs/NotoSansCJKjp-hinted.zip /noto 

WORKDIR /noto

RUN unzip NotoSansCJKjp-hinted.zip && \
    mkdir -p /usr/share/fonts/noto && \
    cp *.otf /usr/share/fonts/noto && \
    chmod 644 -R /usr/share/fonts/noto/ && \
    fc-cache -fv

WORKDIR /
RUN rm -rf /noto

RUN npm install -g express-generator @vue/cli

ENV CHROME_BIN="/usr/bin/chromium-browser"

WORKDIR /workspace

ENTRYPOINT [""]
CMD ["sh"]

