# Focus Trap

**Focus Trap** is a JavaScript utility for managing keyboard focus within a specified element. It's an important tool for creating accessible web applications, ensuring that users can navigate and interact with content effectively, particularly in modal dialogs and other interactive components.

## Why Focus Trapping is Important

Focus trapping is essential for web accessibility. It prevents the keyboard focus from wandering outside of a specific UI component, such as a modal dialog or a dropdown menu. This is crucial because it ensures that users with disabilities can interact with the content without losing their place or encountering unexpected behavior.

Focus trapping helps in several ways:

1. **Preventing Users from Losing Context:** When users open a modal or pop-up, they should remain focused on the content within it. Focus trapping ensures that the keyboard focus remains inside the modal, preventing users from accidentally tabbing to elements outside and losing context.

2. **Enhancing Keyboard Navigation:** Users who rely on keyboard navigation should be able to move through interactive elements logically. Focus trapping helps maintain a predictable and sequential order of interaction, improving the user experience.

3. **Mobile Accessibility:** Focus trapping isn't limited to desktop browsers. It also benefits mobile users by providing a consistent and accessible experience, ensuring that interactive elements are easily reachable and navigable on touch devices.

## Key Features

- **Inert Property:** Unlike some other focus trapping solutions, Focus Trap uses the `inert` property to make elements outside the trap area inert. This ensures that even on mobile devices, users cannot interact with or tab to elements outside the designated focus trap. You can learn more about the `inert` property [here](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inert). Note that for full browser compatibility, you may need to use an inert polyfill. You can find an inert polyfill [here](https://github.com/WICG/inert).

- **Nested Focus Trapping:** Focus Trap supports nested focus trapping, allowing you to create complex UI components with nested focus traps. This makes it versatile and suitable for various use cases, including nested modal dialogs, where you want to ensure that focus remains within the currently active dialog while preventing interaction with elements outside of it.

## Installation

You can install the Focus Trap package via npm or yarn:

```bash
npm install @ment-labs/focus-trap
# or
yarn add @ment-labs/focus-trap
```

## Usage

To use Focus Trap, simply import the package and initialize it with the element you want to trap focus within. Here's an example of how to use it:

```javascript
import FocusTrap from "@ment-labs/focus-trap"

const modalDialogElement = document.getElementById("your-modal-dialog-element")
const focusTrap = new FocusTrap(modalDialogElement)

// To trap focus:
focusTrap.start()

// To release focus trapping:
focusTrap.stop()
```

Note that nested focus trapping is currently only supported on elements that belong to the element that currently has the focus trap.

## Contributing

Focus Trap is open-source software, freely distributable under the terms of an [MIT-style license](LICENSE). The [source code is hosted on GitHub](https://github.com/ment-labs/focus-trap).

We welcome contributions in the form of bug reports, pull requests, or thoughtful discussions in the [GitHub issue tracker](https://github.com/ment-labs/focus-trap/issues).

Please note that this project is released with a [Contributor Code of Conduct](docs/CONDUCT.md). By participating in this project you agree to abide by its terms.

## Development

Run `npm install` to install the project dependencies.

There is a development server that is used to run functional tests and is also useful for debugging. You can start it by running `npm start`. Then, go to <http://localhost:3000/tests>.

For this to work, the source must be built, since the HTML imports the bundled file. You can do this by running `npm run build`, or alternatively, `npm run watch` in a separate terminal, if you want it to build every time there is a change in the source and update automatically on the development server.

Tests are run through Playwright, so you will need to install the browser drivers first:

```bash
npx playwright install --with-deps
```

Then you can run the tests with `npm test`.

---------

© 2023 Ment Labs
