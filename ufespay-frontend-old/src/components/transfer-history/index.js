import React from 'react';

import TransferCard from '../transfer-card'

import './styles.css'

export default function TransferHistory(props) {

    /*
    const WalletSchema = new mongoose.Schema({
        value: { type: Number, default: 30000 },
        transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }],
    });
    */

    // transaction:
    // message: { type: String },
    // emitter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    // comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],

    const users = [
        {
            name: 'Cainã Jucá',
            email: 'cainajuca@gmail.com',
            balance: 1500.49,
            password: '123',
        },
        {
            name: 'Luma Pontes',
            email: 'lumap@gmail.com',
            balance: 1500.49,
            password: '123',
        },
        {
            name: 'Enrico Zardo',
            email: 'zenf@gmail.com',
            balance: 1500.49,
            password: '123',
        },
        {
            name: 'Daniel Frasson',
            email: 'frason@gmail.com',
            balance: 1500.49,
            password: '123',
        },
        {
            name: 'Daniel Barros',
            email: 'varetao@gmail.com',
            balance: 1500.49,
            password: '123',
        }
    ]

    const transactions = [
        {
            value: 10,
            message: "tu sabe ja",
            emitter: users[0],
            receiver: users[1],
            likes: [
                users[0],
                users[3],
                users[4],
            ],
            comments: [
                {
                    text: "aí sim. gostei",
                    author: users[2],
                },
                {
                    text: "verdade",
                    author: users[3],
                },
            ],
        },
        {
            value: 332.89,
            message: "toma seu dinhero",
            emitter: users[2],
            receiver: users[0],
            likes: [
                users[4],
                users[2],
            ],
            comments: [
                {
                    text: "um dia da caça",
                    author: users[1],
                },
                {
                    text: "o outro do caçador",
                    author: users[0],
                },
            ],
        },
        {
            value: 82.5,
            message: "dclpa a demora ae",
            emitter: users[4],
            receiver: users[3],
            likes: [
                users[0],
                users[2],
                users[1],
            ],
            comments: [
                {
                    text: "rlx man",
                    author: users[3],
                },
                {
                    text: "nem sabia",
                    author: users[1],
                },
            ],
        },
        {
            value: 0.2,
            message: "manda a goiaba",
            emitter: users[3],
            receiver: users[2],
            likes: [
                users[0],
                users[3],
                users[4],
            ],
            comments: [
                {
                    text: "ta barata",
                    author: users[1],
                },
                {
                    text: "verdade",
                    author: users[0],
                },
            ],
        },
        {
            value: 2.5,
            message: "bom dia",
            emitter: users[0],
            receiver: users[4],
            likes: [
            ],
            comments: [
                {
                    text: "bom dia",
                    author: users[4],
                },
                {
                    text: "ué",
                    author: users[2],
                },
                {
                    text: "amem",
                    author: users[1],
                },
            ],
        },
        {
            value: 30,
            message: "doação",
            emitter: users[0],
            receiver: users[2],
            likes: [
                users[0],
                users[1],
                users[2],
                users[3],
                users[4],
            ],
            comments: [
                {
                    text: "valeu brigado",
                    author: users[2],
                },
                {
                    text: "omilde",
                    author: users[4],
                },
            ],
        },
    ]

    const wallet = {
        value: 200300.59,
        transactions: transactions
    }

    return (
        <div className="transfer-history">

            <h2>Últimas Transações</h2>

            <div className="transfer-list">
                {wallet.transactions.map((event, index) => (
                    <ul key={index}>
                        <div id="event">
                            <TransferCard transaction={event}/>
                        </div>
                    </ul>
                ))}
            </div> 

        </div>
    )
}