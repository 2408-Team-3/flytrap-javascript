![Organization Logo](https://raw.githubusercontent.com/getflytrap/.github/main/profile/flytrap_logo.png)

# Flytrap JavaScript SDK

The Flytrap JavaScript SDK is a lightweight tool designed for vanilla JavaScript applications without build tools. It enables seamless error monitoring and reporting to the Flytrap system, capturing both global and manually handled errors with minimal setup.

This guide will walk you through setting up the Flytrap JavaScript SDK in your project and exploring its features. If you want to use Flytrap in a production environment, refer to the [Flytrap Installation Guide](https://github.com/getflytrap/flytrap_terraform) for complete setup instructions.

To learn more about Flytrap, check out our [case study](https://getflytrap.github.io/).

## 🚀 Getting Started

To start using Flytrap in your project:

1. Visit the Flytrap Dashboard and log in.
2. Click on **New Project** to create a project.
3. You’ll be provided with a **Project ID**, **API Key**, and **API Endpoint** specific to your project. These values are essential for configuring the SDK.

## 📦 Installation

The Flytrap JavaScript SDK is designed to work in vanilla JS applications that do not use build tools. Simply include the SDK via a `<script>` tag in your HTML file.

```html
<script src="https://cdn.jsdelivr.net/npm/flytrap_javascript/dist/index.js"></script>
```

## 🛠️ Usage

1. **Initialize Flytrap:** Add the following `<script>` block to your HTML file, or include it in your main JavaScript file, to initialize Flytrap with your project credentials:

    ```html
    <script>
      // Initialize Flytrap with your project credentials
      flytrap.init({
        projectId: "YOUR_PROJECT_ID",
        apiEndpoint: "YOUR_ENDPOINT",
        apiKey: "YOUR_API_KEY",
      });
    </script>
    ```

2. **Automatically Capturing Global Errors:** The Flytrap SDK automatically sets up global error and unhandled promise rejection handlers. These handlers ensure any uncaught exceptions or rejections are captured and logged.

3. **Manually Capturing Exceptions:** To explicitly capture errors in specific contexts (e.g., inside a `try/catch` block), use the `captureException` method:

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

The second argument to `captureException` is an optional metadata object. You can include:

- `method`: The HTTP method (e.g., "GET", "POST").
- `url`: The URL associated with the request or action that caused the error.

**Note:** When using `axios`, this metadata will automatically be captured by the SDK. You don't need to pass it in explicitly.

## 🛠️ Example App Setup

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

## 🗺️ Source Map Integration

To resolve minified stack traces into meaningful error locations, you can upload source maps to the Flytrap S3 bucket. The backend uses these maps to provide full context for errors, including:

- Original file name
- Line number
- Code snippets around the error

### Creating Inline Source Maps
To generate inline source maps for your JavaScript files, you can use **`terser`**, or any other build tool of your choice. Here's an example using `terser`:
```bash
terser app.js -o dist/app.min.js --source-map "includeSources"
```
This command creates a minified JavaScript file (app.min.js) with an accompanying inline source map.

### Uploading Source Maps
You can use the AWS CLI to upload your source maps to the designated S3 bucket for your Flytrap setup. Ensure you are in the directory where your source map files (e.g., app.min.js.map) are located. Replace `<bucket_id>` and `<project_id>` with your actual bucket and project identifiers:

```bash
aws s3 cp ./app.min.js.map s3://flytrap-sourcemaps-bucket-<bucket_id>/<project_id>/app.min.js.map
```
- `./app.min.js.map`: The source map file to upload.
- `s3://flytrap-sourcemaps-bucket-<bucket_id>/<project_id>/`: The destination bucket and folder for the project.  

If you need to delete a source map from the S3 bucket, use the following command:
```bash
aws s3 rm s3://flytrap-sourcemaps-bucket-<bucket_id>/<project_id>/app.min.js.map
```

### Testing Locally
To test source map integration locally, refer to the [Flytrap Processor Repository](https://github.com/getflytrap/flytrap_processor) for instructions on setting up local source map uploads and integration.

## 🖥️ Local End-to-End Testing with Flytrap Architecture

For full **local** integration with the Flytrap architecture:

1. **Install the Flytrap API:** Follow the [Flytrap API Repository setup guide](https://github.com/getflytrap/flytrap_api).
2. **Install the Flytrap Processor:** Refer to the [Flytrap Processor Repository](https://github.com/getflytrap/flytrap_processor) for instructions.
3. **View Errors in the Dashboard:** Set up the [Flytrap Dashboard](https://github.com/getflytrap/flytrap_ui) to view and manage reported errors.
4. **Integrate the Flytrap SDK in your project.**

### Testing the Complete Setup
1. Trigger errors or promise rejections in your application integrated with a Flytrap SDK.
2. Confirm that errors are logged by checking:
  - Flytrap Processor Logs: Ensure errors are processed correctly.
  - Flytrap Dashboard: View processed errors, including stack traces and context.

## 🚀 Production Setup
If you’re looking for detailed instructions to deploy Flytrap in a production environment, refer to:

- [Flytrap Installation Guide](https://github.com/getflytrap/flytrap_terraform)
- [How-To-Use Page](https://getflytrap.github.io/)

For questions or issues, feel free to open an issue in this repository or contact the Flytrap team. 🚀

---

<div align="center">
  🪰🪤🪲🌱🚦🛠️🪴
</div>