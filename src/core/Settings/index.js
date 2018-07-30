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
		},
    secret: {
      doc: "The secret used to define JWT",
      format: "*",
      default: "60EC8520A6337E98E5923927AE82F9E3C5A051AA761AEA412F8CFB577A60240C",
      env: "JANUS_JWT_SECRET"
    },
    database: {
      name: {
        doc: "Database name",
        format: String,
        default: 'janus-project'
      },
      host: {
        doc: "Database connection host",
        format: "url",
        default: "ds157901.mlab.com"
      },
      port: {
        doc: "Database connection port",
        format: "port",
        default: 57910
      },
      username: {
        doc: "Database connection username",
        format: String,
        default: 'janus-project',
        env: "JANUS_DATABASE_USERNAME"
      },
      password: {
        doc: "Database connection password",
        format: String,
        default: 'W6i7oLY2763zH9Z3',
        env: "JANUS_DATABASE_PASSWORD"
      }
    }
	}
});

mongodb://<dbuser>:<dbpassword>@ds157901.mlab.com:57901/janus-project

// Load environment dependent configuration
var env = settings.get('env');
if ( env !== 'prod' ) {
  settings.loadFile('./config/' + env + '.json');
}

// Perform validation
settings.validate({allowed: 'strict'});

export default settings;
