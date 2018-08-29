# React Boilerplate 

React boilerplate based on webpack 4


# Component Generator

yarn generate [% component_architecture %] [% component_name %]

* component_architecture :  One of [atoms, molecules, organisms, template, page]
* component_name : Captitalized first character is recommended (ex: HomePage)

# After Build

Automatically copy build folder to deploy folder to remove down time caused by rimraf in build process (yarn build)