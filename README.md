# Paka Film

Welcome to Paka Film! This is a cross-platform social mobile application for sharing movie reviews, built with the [EXPO](https://expo.dev/) framework.

## Features

- **Cross-Platform**: Works on both iOS and Android devices.
- **User Profiles**: Create and manage user profiles.
- **Movie Reviews**: Write and share movie reviews.
- **Social Interaction**: like, and comment on reviews.
- **Search Functionality**: Search for movies

## Environment Variables

To run this project, you will need to add the following environment variables to your .env and eas.json file

`EXPO_PUBLIC_APIKEY`

`EXPO_PUBLIC_AUTHDOMAIN`

`EXPO_PUBLIC_PROJECTID`

`EXPO_PUBLIC_STORAGEBUCKET`

`EXPO_PUBLIC_MESSAGINGSENDERID`

`EXPO_PUBLIC_APPID`

`EXPO_PUBLIC_GOOGLE_VISION_KEY`

## Installation

Install my-project with npm

```bash
  npm install
```

## Run Locally

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npx expo start
```

## Building the APK

To build the APK for Android, you can use EXPO Application Services (EAS). Follow these steps:

```bash
  eas build -p android --profile preview
```
