To start follow the guidelines

```

  npm i
  tsc -b
  node dist/index.js

```
Description

This is basically a stateful backend server. It create a `in memory cached` and can also be use to store the `state` of the game in a real-time game. It also apply `stickness` i.e.
make sure the user who is interested in a specific room get connect to a specific server. Here it is basically a system where the user can subscribe to the information they want. `For example: feed of the stock (prices)`
<br />

<img width="684" alt="Screenshot 2024-05-03 at 8 53 23 PM" src="https://github.com/Somnath-Chattaraj/PubSub_and_Singlenton/assets/135858837/8de96979-cb05-4178-932e-6beb1ede8786">


In this the `PubSubManager.ts` file create a manager that look upon the user interest where `index.ts` file stimulates as users.
