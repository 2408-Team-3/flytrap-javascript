# Flytrap JavaScript SDK

The Flytrap SDK is a JavaScript error-monitoring client designed to capture and log errors in your web application. It supports unhandled exceptions and promise rejections, and it can be used across various module systems thanks to the bundled UMD format.

## Installation
To use Flytrap, simply include the SDK in your project.

### Via Script Tag
The SDK is distributed in UMD format, allowing it to be imported directly in the browser with a <script> tag:

```html
<script src="scripts/flytrap/index.js"></script>
```

Development: 
1. Run `npm build` to create the bundled version
1. Copy the bundled dist/index.debug.js and index.debug.js.map file into a scripts/flytrap directory.

## Usage
Initialization
To begin using Flytrap, initialize it with your project configuration:

```javascript
const flytrap = new Flytrap({
  projectId: 'your-project-id',
  apiEndpoint: 'https://your-api-endpoint.com',
  apiKey: 'your-api-key',
});
```

projectId: Your unique project identifier.
apiEndpoint: The endpoint to which errors should be logged.
apiKey: Your API key for authorization.


## Capturing Errors
Flytrap automatically listens for uncaught exceptions and unhandled promise rejections. You can also manually capture errors by calling captureException:

```javascript
try {
  throw new Error('An example error');
} catch (error) {
  flytrap.captureException(error);
}
```