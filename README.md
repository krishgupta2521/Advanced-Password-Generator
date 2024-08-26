# Advanced Password Generator

The Advanced Password Generator is a React Native application designed to help users effortlessly create strong. With a focus on user experience, this app offers easy customization, password management, and a dark mode option to enhance visual comfort.

## Features

- **Automated Password Generation**: Generate complex passwords between 8 to 16 characters, incorporating letters, numbers, and special characters.
- **Simple**: Easily save and manage your passwords within the app, ensuring they are always at your fingertips.
- **Dark Mode**: Toggle between light and dark themes to suit your preferences.
- **History Management**: Seamlessly copy, delete individual passwords, or clear the entire history with just a tap.

## Getting Started

1. **Clone the Repository**:
   ```shell
   git clone https://github.com/adarshkr357/Advanced-Password-Generator.git
   cd Advanced-Password-Generator
   ```

2. **Install Dependencies**:
   Run the following commands to install the necessary packages:

   ```shell
   npm install @react-native-async-storage/async-storage
   npm install @react-navigation/native @react-navigation/native-stack
   npm install react-native-screens react-native-safe-area-context
   ```

3. **Run the Application**:
   Start the app using this command:

   ```shell
   npx react-native@latest run-android
   ```

   Use an Android emulator/device or an iOS simulator as part of the React Native development workflow.

> [!NOTE]
> If you are using emulator then run these commands (You must choose free port):
> ```shell
> adb reverse tcp:9090 tcp:9090
> npx react-native@latest run-android --port 9090
> ```


## Packages to Install

- **Async Storage**: Manages saved passwords and theme preferences.
- **React Navigation**: Facilitates smooth navigation between different screens.
- **React Native Screens & Safe Area Context**: Enhances performance and design for various device layouts.

## Important Notes

- The generated passwords are stored within your device's storage.
- Utilize the history feature to keep track of and manage your passwords conveniently.
- Adjust the app settings to best fit your accessibility needs.

## Contributing

We welcome contributions! If you would like to contribute to this project, feel free to fork the repository and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Disclaimer

This application was created for password management convenience and should be used responsibly. The developer disclaims any responsibility for security issues arising from misuse.

For questions, suggestions, or feedback, please contact me at `adarshkr357@gmail.com` or connect with me on [LinkedIn](https://www.linkedin.com/in/adarshkr357/).

[![Made With ❤️ By Adarsh](https://img.shields.io/badge/Made%20With%20%E2%9D%A4%EF%B8%8F%20By-Adarsh-red)](https://github.com/adarshkr357)