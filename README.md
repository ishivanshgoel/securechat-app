# Secret Chat
This repository contains backend services for End-2-End encrypted chat application.
### Frontend Credits: 
https://github.com/victorfclima/web-whatsapp-clone

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

<img src="https://github.com/ishivanshgoel/secretChat/blob/master/docs/RSA.PNG">
<a href="https://www.educative.io/edpresso/what-is-the-rsa-algorithm">Source</a>

## HLD
<img src="https://github.com/ishivanshgoel/secretChat/blob/master/docs/flow%20secret%20chat.PNG">

## Setup
- Create `.env` file in root directory
```
DB_URI = mongodb+srv://<--- uri ---->?retryWrites=true&w=majority

TOKEN_KEY = <--- secret key for JWT tokens ---- > 

PORT = <-- PORT number for express server ---->
```

## LICENCE
MIT License

Copyright (c) 2021 Shivansh Goel

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
