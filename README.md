# Aplicación Web - Tienda el Diamante

## 1. Scaffolding o Estructura de Carpetas y Archivos

Esta sección describe la estructura de carpetas y archivos utilizada en el proyecto. Cada carpeta tiene un propósito específico para mantener la organización y la escalabilidad de la aplicación.

### 1.1 Descripción General

```
src
├── core
├── features
├── shared
├── App.css
├── App.tsx
├── index.css
├── main.tsx
└── vite-env.d.ts
```

A grandes rasgos la aplicación se organiza en 3 grandes capas:

1. core
2. features
3. shared

**Capa Core**

Core o núcleo, tiene por objetivo centralizar y unificar en un solo lugar o capa, todo el código relacionado con la data de la aplicación. Entiendáse por data, los datos que podríamos consumir/almacenar de fuentes tales como:

- Servicio web externo o API
- Memoria del navegador ( LocalStorage, SessionStorage )
- Data harcodeada o quemada en el código.
- etc.

### 1.2 Descripción en Detalle

```
src
├── core
│ └── mocks
│ ├── models
│ ├── services
│ ├── stores
│ └── firebaseConfig.tsx
├── features
│ └── Product
│ ├── components
│ ├── pages
│ ├── hooks
│ ├── helpers
│ ├── models
│ ├── ProductRouter.tsx
│ └── ProductFormSchema.ts
├── shared
│ └── components
│ ├── constants
│ ├── hooks
│ ├── layouts
│ └── routes
├── App.css
├── App.tsx
├── index.css
├── main.tsx
└── vite-env.d.ts
```

### 📂 Descripción de Carpetas

#### `components`

Esta carpeta contiene **componentes globales** que se pueden usar en diferentes partes de la aplicación. Los componentes aquí alojados son reutilizables a nivel de toda la aplicación y no están vinculados a una feature específica.

#### `constants`

Esta carpeta contiene **constantes globales** que son utilizadas en toda la aplicación. Aquí puedes encontrar valores que se mantienen constantes durante la ejecución del programa, como rutas de la API, configuraciones, etc.

#### `features`

Cada subcarpeta dentro de `features` representa una feature específica de la aplicación. Las carpetas de las features siguen un enfoque modular, permitiendo que cada feature tenga sus propios:

- `components`: Componentes específicos de la feature.
- `pages`: Páginas o vistas principales de la feature.
- `hooks`: Custom hooks específicos para la feature.
- `helpers`: Funciones auxiliares utilizadas dentro de la feature.
- `models`: Tipos y modelos TypeScript para la feature.

Este enfoque ayuda a mantener el código relacionado con cada feature de forma agrupada y organizada.

#### `hooks`

Aloja **custom hooks globales** que son utilizados en toda la aplicación. La diferencia con `features/myFeature/hooks` es que los hooks en esta carpeta pueden ser reutilizados en múltiples features.

#### `layouts`

Contiene **componentes de layout o Higher-Order Components (HOC)** que definen la estructura visual de la aplicación o de partes de la aplicación. Un ejemplo puede ser un `BoxLayout` que aplique estilos como bordes, sombras y padding a los componentes que envuelve.

#### `mocks`

En esta carpeta se alojan datos de ejemplo o de prueba que se usan durante el desarrollo o en pruebas. Esto puede incluir datos mockeados para simular respuestas de la API o datos estáticos para pruebas internas. Si encuentras que su contenido es muy similar al de `constants`, podrías reconsiderar si es necesario mantener ambas carpetas separadas o si podrías combinar su contenido.

#### `models`

Almacena los **modelos y tipos TypeScript** que son utilizados de manera global en la aplicación. Estos modelos representan las estructuras de datos que se manejan en la app.

#### `routes`

Define las rutas principales de la aplicación. Es el punto central que conecta todas las páginas y features, permitiendo la navegación dentro de la aplicación.

#### `services`

Contiene los **servicios** que interactúan con el backend o fuentes de datos externas. Aquí es donde se define la lógica para realizar solicitudes HTTP, interactuar con bases de datos, etc.

#### `stores`

Aloja la lógica de **gestión de estado global** de la aplicación utilizando herramientas como Zustand, Redux, o cualquier otra solución de estado que estés usando.

### 📄 Archivos Principales

- `App.tsx`: El componente raíz de tu aplicación.
- `main.tsx`: El punto de entrada de tu aplicación donde se renderiza el componente `App`.
- `firebaseConfig.tsx`: Configuración y conexión a Firebase.
- `App.css` y `index.css`: Archivos de estilos globales que se aplican en toda la aplicación.
- `vite-env.d.ts`: Archivo de declaración de tipos para el entorno de Vite.
