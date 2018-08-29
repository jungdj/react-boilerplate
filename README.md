# React Boilerplate 

React boilerplate based on webpack 4


# Component Generator

yarn generate [% component_architecture %] [% component_name %] [% options %]

* component_architecture :  One of [atoms, molecules, organisms, template, page]
* component_name : Captitalized first character is recommended (ex: HomePage)
* options (optional) : Combination of characters (r : react component, s : styled-component, y : storybook, t : jest-test, container : redux-container) or '*' for all.
	Options must be captured inside quotes (" or ').
	Default option is "rsyt"

# After Build

Automatically copy build folder to deploy folder to remove down time caused by rimraf in build process (yarn build)