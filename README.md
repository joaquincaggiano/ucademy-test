# Prueba técnica

## Contexto y requerimientos:

Estamos desarrollando software para academias. Para estas la gestión de usuarios es primordial.
Las listas de usuarios son grandes y contienen muchísimos datos sobre el usuario,
por lo que deben ser muy performantes. En la prueba técnica deberás implementar la interfaz proporcionada y
usar los datos del JSON como base de datos, este JSON esta situado en la raíz del repositorio (DB.json)

Proporcionamos en este repositorio un boilerplate con un stack similar al utilizado en Ucademy, NestJS para el backend y React para
el frontend.

`git clone git@github.com:UcademyTech/tech-assessment.git`

`npm install`

`npm run start:backend`

`npm run start:fronted`

## Enlaces:

[Interfaz de usuario](https://www.figma.com/file/r1zwsMJU7IAsBJVuFLZHPK/Technical-Assessment?type=design&node-id=0%3A1&mode=design&t=tubwoMUyG8Lc4z9F-1)

- El uso de Styled components será valorado positivamente.

PD: El objetivo de la prueba es simplemente valorar las desiciones que toma el candidato a la hora de realizar la implementación. Hay muchas soluciones válidas a lo que aquí se plantea.

## Entrega:

Una vez finalizada la prueba se deberá entregar en un archivo comprimido (zip, tar.gz, etc) con el nombre del candidato.

## Nota:
Para hacer funcionar la aplicación, deberás crear el archivo .env en la raíz del repositorio con las siguientes variables:

- AWS_ACCESS_KEY_ID=
- AWS_SECRET_ACCESS_KEY=
- AWS_REGION=
- AWS_S3_BUCKET_NAME=

