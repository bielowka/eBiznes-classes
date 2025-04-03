FROM ubuntu:24.04
RUN apt-get update && apt-get install -y python3.10 python3-pip

RUN apt-get update && apt-get install -y openjdk-8-jdk
RUN apt-get install -y wget unzip
RUN wget https://github.com/JetBrains/kotlin/releases/download/v1.8.10/kotlin-compiler-1.8.10.zip
RUN unzip kotlin-compiler-1.8.10.zip -d /opt
RUN rm kotlin-compiler-1.8.10.zip
RUN ln -s /opt/kotlinc/bin/kotlinc /usr/local/bin/kotlinc

RUN java -version
RUN kotlinc -version