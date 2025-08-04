// Demo cryptocurrency data for testing and demonstration
// This file contains sample data that can be used when the CoinGecko API is unavailable

const demoCryptoData = [
    {
        id: 'bitcoin',
        name: 'Bitcoin',
        symbol: 'BTC',
        market_cap: 800000000000,
        volume: 25000000000,
        price: 40000,
        price_change: 2.5,
        image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
        market_cap_rank: 1
    },
    {
        id: 'ethereum',
        name: 'Ethereum',
        symbol: 'ETH',
        market_cap: 300000000000,
        volume: 15000000000,
        price: 2500,
        price_change: -1.2,
        image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
        market_cap_rank: 2
    },
    {
        id: 'binancecoin',
        name: 'BNB',
        symbol: 'BNB',
        market_cap: 80000000000,
        volume: 8000000000,
        price: 320,
        price_change: 0.8,
        image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png',
        market_cap_rank: 3
    },
    {
        id: 'solana',
        name: 'Solana',
        symbol: 'SOL',
        market_cap: 60000000000,
        volume: 5000000000,
        price: 120,
        price_change: 5.2,
        image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
        market_cap_rank: 4
    },
    {
        id: 'cardano',
        name: 'Cardano',
        symbol: 'ADA',
        market_cap: 45000000000,
        volume: 3000000000,
        price: 0.45,
        price_change: -0.5,
        image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
        market_cap_rank: 5
    },
    {
        id: 'ripple',
        name: 'XRP',
        symbol: 'XRP',
        market_cap: 40000000000,
        volume: 4000000000,
        price: 0.75,
        price_change: 1.8,
        image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png',
        market_cap_rank: 6
    },
    {
        id: 'polkadot',
        name: 'Polkadot',
        symbol: 'DOT',
        market_cap: 35000000000,
        volume: 2500000000,
        price: 7.5,
        price_change: 3.1,
        image: 'https://assets.coingecko.com/coins/images/12171/large/polkadot_new_logo.png',
        market_cap_rank: 7
    },
    {
        id: 'dogecoin',
        name: 'Dogecoin',
        symbol: 'DOGE',
        market_cap: 30000000000,
        volume: 2000000000,
        price: 0.08,
        price_change: -2.1,
        image: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png',
        market_cap_rank: 8
    },
    {
        id: 'avalanche',
        name: 'Avalanche',
        symbol: 'AVAX',
        market_cap: 25000000000,
        volume: 1800000000,
        price: 25,
        price_change: 4.2,
        image: 'https://assets.coingecko.com/coins/images/12559/large/avalanche.png',
        market_cap_rank: 9
    },
    {
        id: 'chainlink',
        name: 'Chainlink',
        symbol: 'LINK',
        market_cap: 20000000000,
        volume: 1500000000,
        price: 15,
        price_change: 1.5,
        image: 'https://assets.coingecko.com/coins/images/877/large/chainlink.png',
        market_cap_rank: 10
    },
    {
        id: 'polygon',
        name: 'Polygon',
        symbol: 'MATIC',
        market_cap: 18000000000,
        volume: 1200000000,
        price: 0.9,
        price_change: 6.8,
        image: 'https://assets.coingecko.com/coins/images/4713/large/matic.png',
        market_cap_rank: 11
    },
    {
        id: 'litecoin',
        name: 'Litecoin',
        symbol: 'LTC',
        market_cap: 15000000000,
        volume: 1000000000,
        price: 120,
        price_change: -0.8,
        image: 'https://assets.coingecko.com/coins/images/2/large/litecoin.png',
        market_cap_rank: 12
    },
    {
        id: 'uniswap',
        name: 'Uniswap',
        symbol: 'UNI',
        market_cap: 12000000000,
        volume: 800000000,
        price: 8,
        price_change: 2.3,
        image: 'https://assets.coingecko.com/coins/images/12504/large/uniswap.png',
        market_cap_rank: 13
    },
    {
        id: 'stellar',
        name: 'Stellar',
        symbol: 'XLM',
        market_cap: 10000000000,
        volume: 600000000,
        price: 0.4,
        price_change: 1.1,
        image: 'https://assets.coingecko.com/coins/images/100/large/stellar.png',
        market_cap_rank: 14
    },
    {
        id: 'vechain',
        name: 'VeChain',
        symbol: 'VET',
        market_cap: 8000000000,
        volume: 500000000,
        price: 0.12,
        price_change: 3.7,
        image: 'https://assets.coingecko.com/coins/images/1167/large/vechain.png',
        market_cap_rank: 15
    },
    {
        id: 'filecoin',
        name: 'Filecoin',
        symbol: 'FIL',
        market_cap: 7000000000,
        volume: 400000000,
        price: 8.5,
        price_change: -1.5,
        image: 'https://assets.coingecko.com/coins/images/12817/large/filecoin.png',
        market_cap_rank: 16
    },
    {
        id: 'cosmos',
        name: 'Cosmos',
        symbol: 'ATOM',
        market_cap: 6500000000,
        volume: 350000000,
        price: 25,
        price_change: 2.8,
        image: 'https://assets.coingecko.com/coins/images/1481/large/cosmos.png',
        market_cap_rank: 17
    },
    {
        id: 'monero',
        name: 'Monero',
        symbol: 'XMR',
        market_cap: 6000000000,
        volume: 300000000,
        price: 180,
        price_change: 0.5,
        image: 'https://assets.coingecko.com/coins/images/69/large/monero.png',
        market_cap_rank: 18
    },
    {
        id: 'algorand',
        name: 'Algorand',
        symbol: 'ALGO',
        market_cap: 5500000000,
        volume: 250000000,
        price: 0.35,
        price_change: 4.1,
        image: 'https://assets.coingecko.com/coins/images/4380/large/algorand.png',
        market_cap_rank: 19
    },
    {
        id: 'tezos',
        name: 'Tezos',
        symbol: 'XTZ',
        market_cap: 5000000000,
        volume: 200000000,
        price: 5.5,
        price_change: -0.3,
        image: 'https://assets.coingecko.com/coins/images/976/large/tezos.png',
        market_cap_rank: 20
    }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = demoCryptoData;
} else {
    window.demoCryptoData = demoCryptoData;
}

// Usage example:
// To use this demo data instead of API data, replace the loadData() method in script.js:
/*
async loadData() {
    // Use demo data instead of API call
    this.data = demoCryptoData;
}
*/ 