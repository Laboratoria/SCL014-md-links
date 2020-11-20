# Markdown Links

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...), y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

Dentro de una comunidad de código abierto, nos han propuesto crear una
herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos
en formato `Markdown`, para verificar los links que contengan y reportar
algunas estadísticas.

![md-links](https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg)

## 2. Instrucciones de Uso

### Instalación

~~~
$ npm i naterayc-md-links
~~~
~~~
$ npm i --g naterayc-md-links
~~~

### CLI

Md-links retornara todos los links que encuentre.

Pasándole un archivo extension .md :
~~~
$ naterayc-md-links ./archivo.md
./archivo.md https.tulink.com tu link
./archivo.md https.linkaalgo.com link a algo
~~~
Pasándole un directorio :
~~~
$ naterayc-md-links ./
./archivo.md https.tulink.com tu link
./archivo.md https.linkaalgo.com link a algo
~~~

MdLinks tambien recibe Options:

### Validate (--validate || --v)
Realiza una petición http a cada link que encuentre e imprime el estado de la respuesta.
~~~
$ naterayc-md-links ./archivo.md --v
./archivo.md https.tulink.com tu link 200 OK!
./archivo.md https.linkaalgo.com link a algo 404 FAIL
~~~

### Stats (--stats || --s)
Imprimirá la cantidad total de links encontrados, y la cantidad de links únicos.

~~~
$ naterayc-md-links ./archivo.md --s
Total: 2
Unique: 2
~~~

### Validate + Stats
Imprimirá el total de links encontrados, la cantidad de links únicos y el número de links rotos.

~~~
$ naterayc-md-links ./archivo.md --s --v
Total: 2
Unique: 2
Broken: 0
~~~

## Módulo
MdLinks tambien puede ser requerido como un módulo.

~~~js
const mdLinks = require('naterayc-md-links/md-links');
mdLinks("./archivo.md")
~~~
