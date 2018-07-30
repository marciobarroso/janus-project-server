import convict from 'convict';

const settings = convict({
	env: {
		doc: "The application environment.",
		format: ["prod", "dev", "test"],
		default: "development",
		env: "NODE_ENV"
	},
	app: {
		name: {
			doc: "The application name.",
			format: String,
			default: "Janus Project Server"
		},
		version: {
			doc: "The application version.",
			format: '*',
			default: 'none',
			env: 'npm_package_version'
		},
		ip: {
			doc: "The IP address to bind.",
			format: "ipaddress",
			default: "127.0.0.1",
			env: "IP_ADDRESS",
		},
		port: {
			doc: "The port to bind.",
			format: "port",
			default: 8080,
			env: "PORT",
			arg: "port"
		}
	}
});

// Load environment dependent configuration
var env = settings.get('env');
if ( env !== 'prod' ) {
  settings.loadFile('./config/' + env + '.json');
}

// Perform validation
settings.validate({allowed: 'strict'});

export default settings;
