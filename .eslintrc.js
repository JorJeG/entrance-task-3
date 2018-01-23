module.exports = {
	"extends": "airbnb",
	
	"globals": {
		"document": true
	},
	
	"plugins": [
		"eslint-plugin-import",
		"eslint-plugin-jsx-a11y",
		"eslint-plugin-react"
	],
	"rules": {
		"import/no-extraneous-dependencies": 0,
		
		"react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
		"react/forbid-prop-types": 0,
		"react/no-did-mount-set-state": 0,
	}
};
