# Flytrap JavaScript SDK

## Getting Started

To start using Flytrap in your project:

1. Go to the Flytrap website.
2. Click on "New Project."
3. You’ll be provided with a Project ID, API Key, and Endpoint specific to your project.
4. These values are essential for configuring the SDK.

## Installation

The Flytrap JavaScript SDK is designed to work in vanilla JS applications that do not use build tools. Simply include the SDK via a <script> tag in your HTML file.

```html
<script src="https://cdn.jsdelivr.net/npm/flytrap_javascript/dist/index.js"></script>
<script>
  // Initialize Flytrap with your project credentials
  flytrap.init({
    projectId: "YOUR_PROJECT_ID",
    apiEndpoint: "YOUR_ENDPOINT",
    apiKey: "YOUR_API_KEY",
    includeContext: true, // Optional: Enable source code context logging (default is true)
  });
</script>
```

Usage

1. Automatically Capturing Global Errors
   The Flytrap SDK automatically sets up global error and unhandled promise rejection handlers. These handlers ensure any uncaught exceptions or rejections are captured and logged.

2. Manually Capturing Exceptions
   For specific exceptions that you want to capture (e.g., inside a try/catch block), use the captureException method:

```javascript
try {
  // Your code here
  throw new Error("Something went wrong!");
} catch (error) {
  flytrap.captureException(error, {
    method: "GET", // Optional: HTTP method, if applicable
    url: "https://example.com/api", // Optional: URL, if applicable
  });
}
```

### Metadata

The second argument to captureException is an optional metadata object. This can include additional context about the request, such as:

- method: The HTTP method (e.g., "GET", "POST").
- url: The URL associated with the request or action that caused the error.

When using axios, this metadata will automatically be captured. You don't need to pass it in explicitly.

3. Source Code Context (Optional)
   When includeContext is set to true (default), Flytrap attempts to capture snippets of your source code around the error location (e.g., the file, line number, and surrounding lines).

This feature requires source files to be accessible at runtime.
If source files are unavailable, Flytrap will send the minified code location instead.

### Example App Setup

Here’s a complete example using Flytrap in a basic HTML app:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Flytrap SDK Demo</title>
    <script src="https://cdn.flytrap.com/sdk/flytrap.js"></script>
    <script>
      // Initialize Flytrap
      flytrap.init({
        projectId: "YOUR_PROJECT_ID",
        apiEndpoint: "YOUR_ENDPOINT",
        apiKey: "YOUR_API_KEY",
      });

      // Example: Global error trigger
      document.addEventListener("DOMContentLoaded", () => {
        // Uncaught error
        document
          .getElementById("uncaughtError")
          .addEventListener("click", () => {
            throw new Error("This is an uncaught error!");
          });

        // Caught error
        document.getElementById("caughtError").addEventListener("click", () => {
          try {
            throw new Error("This is a caught error!");
          } catch (e) {
            flytrap.captureException(e, {
              method: "GET",
              url: "https://example.com/api",
              status: 500,
            });
          }
        });
      });
    </script>
  </head>
  <body>
    <h1>Flytrap SDK Demo</h1>
    <button id="uncaughtError">Trigger Uncaught Error</button>
    <button id="caughtError">Trigger Caught Error</button>
  </body>
</html>
```

## Backend Source Map Integration

If source maps are unavailable in the browser, you can upload your source maps to the Flytrap backend. The backend will use these to resolve minified stack traces into meaningful error locations with full context.
