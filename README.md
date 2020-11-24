# Markdown Links

## Índice

* [1. Preámbulo](#1-preámbulo)
* [2. Md-Links](#2-Md-Links)
* [3. Guía de Uso e Instalación](#3-Guía-de-Uso-e-Instalación)
* [4. Documentacion Técnica](#4-Documentación-Técnica)
* [5. Planificación](#5-Planificación)

***

## 1. Preámbulo

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...), y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.


## 2. Md-Links | Extrae los links de archivos 

La libreria fue creada usando [Node.js](https://nodejs.org/), y su función es leer y analizar archivos en formato `Markdown`. Extrae links de los archivos y los verifica, tambien proporciona una estadísticas  del total de links, links que no funcionan y links unicos.



## 3. Guía de Uso e Instalación

## Instalación

Con el comando `npm install md-links-marceortega` podemos instalar directamente a traves de la terminal


## Uso de CLI (Línea de Comando)

`md-links <"path-to-file"> [options]`

Primera forma: `md-links <"path-to-file">`

`<path-to-file>:` Ruta de un archivo o directorio.

Por ejemplo:

```sh
$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google
```

Segunda forma: `md-links <"path-to-file"> [options]`

`[options]`

--validate : Si ingresamos la opción `--validate` o `--v` muestra el link y estado del link.

Por ejemplo:

```sh
$ md-links ./some/example.md --validate
./some/example.md http://algo.com/2/3/ ok 200 Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md http://google.com/ ok 301 Google
```
--stats : Si pasamos la opción `--stats` o `--s` el resultado será un texto con estadísticas básicas sobre los links como el total y los links únicos.

Por ejemplo:

```sh
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
```
--stats --validate / --validate --stats : para obtener estadísticas que necesiten de los resultados de la validación como total, únicos y links rotos (Tambien puede usar la forma abreviada --s --v  / --v --s).

Por ejemplo:

```sh
$ md-links ./some/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1
```

## 4. Documentación Técnica

### Dependencias:
- node.js versión 14.4.0
- "chalk": "^2.4.2"
- "fetch": "^1.1.0"
- "filehound": "^1.17.3"
- "marked": "^0.7.0",
- "node-fetch": "^2.6.0"

---

## 5. Planificación

**Diagrama de Flujo**

![image](https://user-images.githubusercontent.com/66398028/99922602-2a757700-2d10-11eb-8203-762d6d10774d.png)

**Trello**
El board con el backlog de la implementación de la librería puede ser encontrado [aquí.](https://trello.com/b/xewKSQXS/md-links)

**Milestones del proyecto**
El proyecto fue ordenado en milestones en trello, recorriendo cada parte del diagrama de flujo.

---
## Autora
[Marcela Ortega Ocares](https://github.com/marceortega)
Desarrolladora Front-end
---

