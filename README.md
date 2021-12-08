# Secret Chat
This repository contains backend services for End-2-End encrypted chat application.
### Application Repository: 
https://github.com/Pratyush1211/MessengerCLI

## Overview
End-to-end encrypted messaging means that the users within that specific chat can only read messages sent between two people. 

To enable this, the messages that are sent are encrypted before leaving a user's device, and can only be decrypted by the intended recipient (end-user).

Real-time chat applications have grown tremendously. Most organizations have adopted them for communication. For security reasons, the messages exchanged over the network must be encrypted.

## Technologies Used
- Node.js
- MongoDB
- React-Native
- Socket.io
- RSA Algorithm (Public Key Cryptography)

## RSA Algorithm
The RSA algorithm is an asymmetric cryptography algorithm; this means that it uses a public key and a private key (i.e two different, mathematically linked keys). As their names suggest, a public key is shared publicly, while a private key is secret and must not be shared with anyone.


<a href="https://www.educative.io/edpresso/what-is-the-rsa-algorithm">Source</a>

## HLD


## Setup
- Create `.env` file in root directory
```
DB_URI = mongodb+srv://<--- uri ---->?retryWrites=true&w=majority

TOKEN_KEY = <--- secret key for JWT tokens ---- > 

PORT = <-- PORT number for express server ---->
```

## LICENCE

