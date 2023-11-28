1.xcode 15
2.=* ruby-2.7.5 [ x86_64 ]
3.node version 20.5.1
4.Homebrew install
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  https://brew.sh/
5.Install RVM in macOS (step by step)
   https://nrogap.medium.com/install-rvm-in-macos-step-by-step-d3b3c236953b
6.npx react-native init projectname --version 0.70.6

commands for run-ios
npx react-native run-ios --device "Air’s iPhone"

7.pod file added files

  pod 'RNCAsyncStorage', :path => '../node_modules/@react-native-async-storage/async-storage'
  pod 'Firebase', :modular_headers => true
  pod 'FirebaseCore', :modular_headers => true
  pod 'FirebaseCoreInternal', :modular_headers => true
  pod 'GoogleUtilities', :modular_headers => true
