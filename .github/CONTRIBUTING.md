<!-- omit in toc -->
# 🤝 Contributing to ultra-reporter-app

First off, thanks for taking the time to contribute! ❤️

All types of contributions are encouraged and valued. See the [Table of Contents](#table-of-contents) for different ways to help and details about how this project handles them. Please make sure to read the relevant section before making your contribution. It will make it a lot easier for us maintainers and smooth out the experience for all involved. The community looks forward to your contributions. 🎉

> [!TIP]
> And if you like the project, but just don't have time to contribute, that's fine. There are other easy ways to support the project and show your appreciation, which we would also be very happy about:
>
> - Star the project
> - Tweet about it
> - Refer this project in your project's readme
> - Mention the project at local meetups and tell your friends/colleagues

<!-- omit in toc -->
## Table of Contents

- [I Have a Question](#i-have-a-question)
- [I Want To Contribute](#i-want-to-contribute)
  - [Reporting Bugs](#reporting-bugs)
    - [Before Submitting a Bug Report](#before-submitting-a-bug-report)
    - [How Do I Submit a Good Bug Report?](#how-do-i-submit-a-good-bug-report)
  - [Suggesting Enhancements](#suggesting-enhancements)
    - [Before Submitting an Enhancement](#before-submitting-an-enhancement)
    - [How Do I Submit a Good Enhancement Suggestion?](#how-do-i-submit-a-good-enhancement-suggestion)
  - [Project structure](#project-structure)
  - [Your First Code Contribution](#your-first-code-contribution)
  - [Improving The Documentation](#improving-the-documentation)
  - [Commit Messages](#commit-messages)

## I Have a Question

> [!NOTE]
> If you want to ask a question, we assume that you have read the available [Documentation](https://github.com/WasiqB/ultra-reporter-app).

Before you ask a question, it is best to search for existing [Issues](https://github.com/WasiqB/ultra-reporter-app/issues) that might help you. In case you have found a suitable issue and still need clarification, you can write your question in this issue. It is also advisable to search the internet for answers first.

If you then still feel the need to ask a question and need clarification, we recommend the following:

- Open an [Issue](https://github.com/WasiqB/ultra-reporter-app/issues/new).
- Provide as much context as you can about what you're running into.
- Provide project and platform versions (nodejs, pnpm, etc), depending on what seems relevant.

We will then take care of the issue as soon as possible.

## I Want To Contribute

### Legal Notice <!-- omit in toc -->

> [!CAUTION]
> When contributing to this project, you must agree that you have authored 100% of the content, that you have the necessary rights to the content and that the content you contribute may be provided under the project license.

### Reporting Bugs

#### Before Submitting a Bug Report

A good bug report shouldn't leave others needing to chase you up for more information. Therefore, we ask you to investigate carefully, collect information and describe the issue in detail in your report. Please complete the following steps in advance to help us fix any potential bug as fast as possible.

- Make sure that you are using the latest version.
- Determine if your bug is really a bug and not an error on your side e.g. using incompatible environment components/versions (Make sure that you have read the [documentation](https://github.com/WasiqB/ultra-reporter-app). If you are looking for support, you might want to check [this section](#i-have-a-question)).
- To see if other users have experienced (and potentially already solved) the same issue you are having, check if there is not already a bug report existing for your bug or error in the [bug tracker](https://github.com/WasiqB/ultra-reportissues?q=label%3Abug).
- Also make sure to search the internet (including Stack Overflow) to see if users outside of the GitHub community have discussed the issue.
- Collect information about the bug:
- Stack trace (Traceback)
- OS, Platform and Version (Windows, Linux, macOS, x86, ARM)
- Version of the interpreter, compiler, SDK, runtime environment, package manager, depending on what seems relevant.
- Possibly your input and the output
- Can you reliably reproduce the issue? And can you also reproduce it with older versions?

#### How Do I Submit a Good Bug Report?

> [!CAUTION]
> You must never report security related issues, vulnerabilities or bugs including sensitive information to the issue tracker, or elsewhere in public. Instead sensitive bugs must be sent by email to .

We use GitHub issues to track bugs and errors. If you run into an issue with the project:

- Open an [Issue](https://github.com/WasiqB/ultra-reporter-app/issues/new). (Since we can't be sure at this point whether it is a bug or not, we ask you not to talk about a bug yet and not to label the issue.)
- Explain the behavior you would expect and the actual behavior.
- Please provide as much context as possible and describe the _reproduction steps_ that someone else can follow to recreate the issue on their own. This usually includes your code. For good bug reports you should isolate the problem and create a reduced test case.
- Provide the information you collected in the previous section.

Once it's filed:

- The project team will label the issue accordingly.
- A team member will try to reproduce the issue with your provided steps. If there are no reproduction steps or no obvious way to reproduce the issue, the team will ask you for those steps and mark the issue as `needs-repro`. Bugs with the `needs-repro` tag will not be addressed until they are reproduced.
- If the team is able to reproduce the issue, it will be marked `needs-fix`, as well as possibly other tags (such as `critical`), and the issue will be left to be [implemented by someone](#your-first-code-contribution).

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for ultra-reporter-app, **including completely new features and minor improvements to existing functionality**. Following these guidelines will help maintainers and the community to understand your suggestion and find related suggestions.

#### Before Submitting an Enhancement

- Make sure that you are using the latest version.
- Read the [documentation](https://github.com/WasiqB/ultra-reporter-app) carefully and find out if the functionality is already covered, maybe by an individual configuration.
- Perform a [search](https://github.com/WasiqB/ultra-reporter-app/issues) to see if the enhancement has already been suggested. If it has, add a comment to the existing issue instead of opening a new one.
- Find out whether your idea fits with the scope and aims of the project. It's up to you to make a strong case to convince the project's developers of the merits of this feature. Keep in mind that we want features that will be useful to the majority of our users and not just a small subset. If you're just targeting a minority of users, consider writing an add-on/plugin library.

#### How Do I Submit a Good Enhancement Suggestion?

Enhancement suggestions are tracked as [GitHub issues](https://github.com/WasiqB/ultra-reporter-app/issues).

- Use a **clear and descriptive title** for the issue to identify the suggestion.
- Provide a **step-by-step description of the suggested enhancement** in as many details as possible.
- **Describe the current behavior** and **explain which behavior you expected to see instead** and why. At this point you can also tell which alternatives do not work for you.
- You may want to **include screenshots and animated GIFs** which help you demonstrate the steps or point out the part which the suggestion is related to. You can use [this tool](https://www.cockos.com/licecap/) to record GIFs on macOS and Windows, and [this tool](https://github.com/colinkeenan/silentcast) or [this tool](https://github.com/GNOME/byzanz) on Linux.
- **Explain why this enhancement would be useful** to most ultra-reporter-app users. You may also want to point out the other projects that solved it better and which could serve as inspiration.

### Project structure

- `src`: This contains command line tools code which actually generates the report
- `app`: This contains the actual Next JS codebase for the report UI which gets generated
- `components`: This contains the common components used by the reporter UI project under `app` folder

Here’s a completion for the TODO sections in the Contributing document:

### Your First Code Contribution

To get started with contributing to ultra-reporter-app, follow these steps:

1. **Setup your environment:**

   - Make sure you have [Node.js](https://nodejs.org/) installed.
   - [Install PNPM](https://pnpm.io/installation) on your machine.
   - Fork the repository from [ultra-reporter-app](https://github.com/WasiqB/ultra-reporter-app).
   - Clone the forked repository:

```shell
git clone https://github.com/<your-username>/ultra-reporter-app.git
cd ultra-reporter-app
```

2. **Install dependencies:**

   - Use `pnpm` to install the project dependencies:

```shell
pnpm install
```

3. **Development setup:**

   - Open the project in your favorite IDE. For consistency, we recommend using [Visual Studio Code](https://code.visualstudio.com/).
   - Run the project in development mode to see changes live:

```shell
pnpm dev
```

4. **Code style:**

   - Follow the project’s linting and formatting rules. You can run linting and formatting checks using:

```shell
pnpm format
pnpm lint
```

5. **Build the App:**

   - Ensure that your changes do not cause any compilation issues by running the build command:

```shell
pnpm build
```

6. **Testing:**

   - Ensure that your changes do not break any existing functionality by running the tests:

```shell
pnpm test
```

7. **Sign your commits:**

We require all contributors to sign their commits. To sign a commit, configure Git with your GPG key (if you don’t have one, you can generate it following [this guide](https://docs.github.com/en/authentication/managing-commit-signature-verification/generating-a-new-gpg-key)).

Once you have your GPG key, sign your commits using the -S option:

```shell
git commit -S -m "feat(reporter): add support for XML test result parsing"
```

> [!CAUTION]
> Currently there are no Tests written for the reporter, but will be added soon.

Once you are satisfied with your changes, submit a pull request, and we'll review it as soon as possible.

### Improving The Documentation

Currently the README is the main source of documentation. If you can help in creating a dedicated documentation site then you are most welcome.

> [!NOTE]
> If you take up this task, then it is recommended to use [Docusaurus](https://docusaurus.io/) for creating the documentation website

### Commit Messages

Please follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification for writing commit messages. Here’s a breakdown of the structure:

1. **Structure:**

```shell
<type>: <emoji> <description>
```

2. **Types:**

   - `feat`: A new feature for the project.
   - `fix`: A bug fix.
   - `docs`: Documentation only changes.
   - `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc.).
   - `refactor`: A code change that neither fixes a bug nor adds a feature.
   - `test`: Adding or updating tests.
   - `chore`: Changes to the build process or auxiliary tools and libraries.
   - `perf`: Performance improvements to the report
   - `build`: Changes to the dependencies, configurations, etc
   - `ci`: Changes to the CI workflows
   - `revert`: Reverted the changes

> [!TIP]
> Add an exclamation mark next to the type if the change is BREAKING and incompatible to the previous version
>
> Example:
> `feat!: breaking change done`

3. **Example:**

```shell
feat: add support for XML test result parsing
```

By adhering to this style, your commits will be easier to understand, track and compile the CHANGELOG.md.
