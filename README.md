# React.js + Express + Midtrands

Read the midtrans documentation:
    - [Testing Payment](https://docs.midtrans.com/en/snap/integration-guide?id=_3-creating-test-payment)
    - [Frontent Integration](https://snap-docs.midtrans.com/#frontend-integration)
    - [Backend Integration](https://snap-docs.midtrans.com/#backend-integration)

## Get Started

- clone the repo
- run the backend service:
    - add your SERVER_KEY to .env
    - run these commands :
        ```bash
        cd server/ && 
        yarn &&
        yarn devdev
        ```
- run the client
    - add your CLIENT_KEY to .env (optional)
    - run these commands:
        ```bash
        cd client/ &&
        yarn &&
        yarn start
        ```
    - open the browser and simulate the transaction.