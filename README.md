# OER ADAP

[Angular CLI](https://github.com/angular/angular-cli) version 15.2.8

## Pre-requisito
- [Node JS y npm](https://nodejs.org/)
- [Angular CLI](https://angular.io/)

```
npm install -g @angular/cli
```

## Instalación de librerias

`npm install --force`
## Ejecutar un servidor de desarrollo

Ejecutar `ng serve`
Por defecto se ejecuta en `http://localhost:4200/`. 

## Crear un componente

Ejecutar `ng generate component component-name` para generar un nuevo componente. También puedes usar `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Compilar app

Ejecutar `ng build` para compilar la aplicacion. Tambien puedes usar `ng build --configuration=production` para usar el enviroment de producción.

## Estructura del proyecto


- e2e
- node_modules
- public
- src
  - app
    - interceptors
    - models
    - pipes
    - public
      - components
        - audio //card de adaptación audio 
        - edit-transcript //modal de transcripcion
        - file-upload //componente de carga de archivo
        - iframe //componente iframe
        - image //card de adaptación imagen 
        - oa-info //componente información de oa
        - oa-metadata //componentente de listado d emetadatos
        - paragraph //card de adaptacón de parrafos
        - video //card de adaptación de video
        - webview //componente de previsualización de oa
      - containers
        - audio-content //contenedor de componentes de audio
        - image-content //contenedor de componentes de imagenes
        - paragraph-content //contenedor de componentes de parrafos
        - video-content //contenedor de componentes de videos
      - pages
    - services
    - shared
  - assets
  - enviroments


