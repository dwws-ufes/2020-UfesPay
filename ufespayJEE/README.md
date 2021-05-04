# 2020-UfesPay

O sistema UfesPay é uma aplicação web que permite a transferência de saldo entre as carteiras dos usuários cadastrados.

## Pré-requisitos :
1. Java versão 13
2. PostgreSQL
3. WildFly 22
4. Eclipse
5. Maven
6. JButler

## Intruções para deploy da apliação:
1. Clone o projeto para o seu computador:
git clone 

2. Siga os passos do Tutorial do [Jbutler](https://github.com/dwws-ufes/jbutler/wiki/Tutorial00#tool-installation-and-configuration) ( Seção *Tool installation and configuration*) com as seguintes alterações:

2.1. Setup do postgreSQL:
* Faça o Donwload do [PostgreSQL](https://www.postgresql.org/download/) para sua plataforma e instale-o;
* Faça op Donwload do driver JDBC do [PostgreSQL](https://jdbc.postgresql.org/download.html);
* Crie uma Data Base no PostgreSQL com nome *ufespayjee*;

3. Setup do WildFly para o data sopource do postgreSQL:

3.1. No arquivo `$WILDFLY_HOME\standalone\configuration\standalone.xml` faça as seguintes alterações:
* Inclua no dentro da tag `<datasources>`:
```
                <datasource jta="true" jndi-name="java:jboss/datasources/ufespayjee" pool-name="ufespayjeePool" enabled="true" use-java-context="true">
                    <connection-url>jdbc:postgresql://DATABASE_URL_WITH_PORT/ufespayjee</connection-url>
                    <driver>postgresql</driver>
                    <security>
                        <user-name>YOUR_DATABA_USER</user-name>
                        <password>YOUR_DATABA_USER_PASSWORD</password>
                    </security>
                </datasource>
```
* Deve-se substituir os valores de `YOUR_DATABA_USER ` e `YOUR_DATABA_USER ` pelas creenciais do usuário do PostgreSQL que terá acesso a Data Base da aplicação;
* Deve-se substituir `DATABASE_URL_WITH_PORT` pela URL de acesso ao PostgreSQL incluindo a porta;

Neste mesmo arquivo, incluia dentro da tag `<drivers>`
```
                    <driver name="postgresql" module="org.postgresql">
                        <driver-class>org.postgresql.Driver</driver-class>
                    </driver>
```

3.2. Crie o diretório `$WILDFLY_HOME\l\modules\system\layers\base\org\postgresql\main` faça as seguintes alterações:
* Crie um arquivo `module.xml` com o conteudo abaixo:
```
<?xml version="1.0" encoding="UTF-8"?>
<module xmlns="urn:jboss:module:1.3" name="org.postgresql">
    <resources>
        <resource-root path="postgresql-42.2.18.jar"/>
        <!-- Make sure this matches the name of the JAR you are installing -->
    </resources>
    <dependencies>
        <module name="javax.api"/>
        <module name="javax.transaction.api"/>
    </dependencies>
</module>
```
* Copie para este folder o driver JDBC do postreSQL baixado anteriormente;
