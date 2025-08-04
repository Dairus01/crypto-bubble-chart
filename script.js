// CryptoBubbles - Interactive Market Visualization
class CryptoBubbles {
    constructor() {
        this.data = [];
        this.filteredData = [];
        this.simulation = null;
        this.svg = null;
        this.width = 0;
        this.height = 0;
        this.tooltip = d3.select('#tooltip');
        this.autoRefreshInterval = null;
        this.selectedToken = null;
        this.zoom = null;
        this.drag = null;
        this.isDragging = false;
        
        // View options
        this.showLabels = true;
        this.showImages = true;
        this.enableDrag = true;
        
        // AI Agent properties
        this.chatMessages = [];
        this.isTyping = false;
        this.conversationContext = {
            currentData: [],
            selectedToken: null,
            marketTrends: {},
            userPreferences: {}
        };
        
        this.init();
    }

    async init() {
        this.showLoading();
        try {
        await this.loadData();
        this.setupEventListeners();
        this.createChart();
        this.updateStats();
            this.updateTopMovers();
            this.hideLoading();
        } catch (error) {
            console.error('Failed to initialize chart:', error);
            this.showError('Failed to load cryptocurrency data. Please try again later.');
        }
    }

    async loadData() {
        try {
            const timePeriod = document.getElementById('timePeriod').value;
                    const percentageParam = timePeriod === '1h' ? 'price_change_percentage=1h' :
                               timePeriod === '4h' ? 'price_change_percentage=4h' :
                               timePeriod === '24h' ? 'price_change_percentage=24h' :
                               timePeriod === '7d' ? 'price_change_percentage=7d' :
                               timePeriod === '30d' ? 'price_change_percentage=30d' :
                               timePeriod === '1y' ? 'price_change_percentage=1y' :
                               timePeriod === 'max' ? 'price_change_percentage=max' :
                               'price_change_percentage=24h';
            
            // Fetch 200 tokens (single API call is sufficient)
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false&${percentageParam}`);
            
            if (response.ok) {
                const rawData = await response.json();
                const limitedData = rawData.slice(0, 200);
                
                this.data = limitedData.map(coin => ({
                    id: coin.id,
                    name: coin.name,
                    symbol: coin.symbol.toUpperCase(),
                    market_cap: coin.market_cap,
                    volume: coin.total_volume,
                    price: coin.current_price,
                    price_change: this.getPriceChangeForPeriod(coin, timePeriod),
                    image: coin.image,
                    market_cap_rank: coin.market_cap_rank,
                    x: Math.random() * 800 + 100,
                    y: Math.random() * 600 + 100,
                    vx: 0,
                    vy: 0
                }));
                console.log(`Successfully loaded ${this.data.length} tokens from CoinGecko API`);
                this.updateDataSource('🟢 Live data from CoinGecko API');
            } else {
                console.warn('API response not ok, using sample data');
                this.loadSampleData();
            }
        } catch (error) {
            console.warn('API request failed, using sample data:', error);
            this.loadSampleData();
        }
    }

    loadSampleData() {
        this.data = [
            { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', market_cap: 800000000000, volume: 25000000000, price: 40000, price_change: 2.5, image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png', market_cap_rank: 1, x: 400, y: 300, vx: 0, vy: 0 },
            { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', market_cap: 300000000000, volume: 15000000000, price: 2500, price_change: -1.2, image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png', market_cap_rank: 2, x: 600, y: 200, vx: 0, vy: 0 },
            { id: 'binancecoin', name: 'BNB', symbol: 'BNB', market_cap: 80000000000, volume: 8000000000, price: 320, price_change: 0.8, image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png', market_cap_rank: 3, x: 200, y: 400, vx: 0, vy: 0 },
            { id: 'solana', name: 'Solana', symbol: 'SOL', market_cap: 60000000000, volume: 5000000000, price: 120, price_change: 5.2, image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png', market_cap_rank: 4, x: 800, y: 500, vx: 0, vy: 0 },
            { id: 'cardano', name: 'Cardano', symbol: 'ADA', market_cap: 45000000000, volume: 3000000000, price: 0.45, price_change: -0.5, image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png', market_cap_rank: 5, x: 300, y: 600, vx: 0, vy: 0 },
            { id: 'ripple', name: 'XRP', symbol: 'XRP', market_cap: 40000000000, volume: 4000000000, price: 0.75, price_change: 1.8, image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png', market_cap_rank: 6, x: 700, y: 300, vx: 0, vy: 0 },
            { id: 'polkadot', name: 'Polkadot', symbol: 'DOT', market_cap: 35000000000, volume: 2500000000, price: 7.5, price_change: 3.1, image: 'https://assets.coingecko.com/coins/images/12171/large/polkadot_new_logo.png', market_cap_rank: 7, x: 500, y: 700, vx: 0, vy: 0 },
            { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE', market_cap: 30000000000, volume: 2000000000, price: 0.08, price_change: -2.1, image: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png', market_cap_rank: 8, x: 100, y: 200, vx: 0, vy: 0 },
            { id: 'avalanche', name: 'Avalanche', symbol: 'AVAX', market_cap: 25000000000, volume: 1800000000, price: 25, price_change: 4.2, image: 'https://assets.coingecko.com/coins/images/12559/large/avalanche.png', market_cap_rank: 9, x: 900, y: 400, vx: 0, vy: 0 },
            { id: 'chainlink', name: 'Chainlink', symbol: 'LINK', market_cap: 20000000000, volume: 1500000000, price: 15, price_change: 1.5, image: 'https://assets.coingecko.com/coins/images/877/large/chainlink.png', market_cap_rank: 10, x: 400, y: 800, vx: 0, vy: 0 }
        ];
        this.updateDataSource('🟡 Demo data (API unavailable)');
    }

    setupEventListeners() {
        // Filter controls
        document.getElementById('sortBy').addEventListener('change', () => this.updateChart());
        document.getElementById('minMarketCap').addEventListener('input', (e) => {
            document.getElementById('minMarketCapValue').textContent = `$${e.target.value}B`;
            this.updateChart();
        });
        document.getElementById('maxBubbles').addEventListener('input', (e) => {
            document.getElementById('maxBubblesValue').textContent = e.target.value;
            this.updateChart();
        });
        document.getElementById('timePeriod').addEventListener('change', () => this.refreshData());
        
        // Auto refresh
        document.getElementById('autoRefresh').addEventListener('change', (e) => this.setupAutoRefresh(parseInt(e.target.value)));
        
        // View options
        document.getElementById('showLabels').addEventListener('change', (e) => {
            this.showLabels = e.target.checked;
            this.updateBubbleVisibility();
        });
        document.getElementById('showImages').addEventListener('change', (e) => {
            this.showImages = e.target.checked;
            this.updateBubbleVisibility();
        });
        document.getElementById('enableDrag').addEventListener('change', (e) => {
            this.enableDrag = e.target.checked;
            this.updateDragBehavior();
        });
        
        // Chart controls
        document.getElementById('refreshBtn').addEventListener('click', () => this.refreshData());
        document.getElementById('fullscreen').addEventListener('click', () => this.toggleFullscreen());
        
        // AI Agent event listeners
        document.getElementById('sendBtn').addEventListener('click', () => this.sendMessage());
        document.getElementById('chatInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
    }

    createChart() {
        const container = document.getElementById('chart');
        this.width = container.clientWidth;
        this.height = container.clientHeight;

        // Clear existing chart
        container.innerHTML = '';

        // Create SVG with zoom support
        this.svg = d3.select('#chart')
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
            .style('background', 'transparent');

        // Add zoom behavior
        this.zoom = d3.zoom()
            .scaleExtent([0.5, 5])
            .on('zoom', (event) => {
                this.svg.selectAll('g').attr('transform', event.transform);
            });

        this.svg.call(this.zoom);

        // Add drag behavior
        this.drag = d3.drag()
            .on('start', (event, d) => this.dragstarted(event, d))
            .on('drag', (event, d) => this.dragged(event, d))
            .on('end', (event, d) => this.dragended(event, d));

        this.updateChart();
    }

    updateChart() {
        if (!this.data.length) return;

        const sortBy = document.getElementById('sortBy').value;
        const minMarketCap = parseFloat(document.getElementById('minMarketCap').value) * 1e9;
        const maxBubbles = parseInt(document.getElementById('maxBubbles').value);

        // Filter and sort data
        this.filteredData = this.data
            .filter(d => d.market_cap >= minMarketCap)
            .sort((a, b) => {
                switch (sortBy) {
                    case 'market_cap': return b.market_cap - a.market_cap;
                    case 'volume': return b.volume - a.volume;
                    case 'price_change': return b.price_change - a.price_change;
                    case 'name': return a.name.localeCompare(b.name);
                    default: return b.market_cap - a.market_cap;
                }
            })
            .slice(0, maxBubbles);

        this.renderBubbles();
        this.updateStats();
        this.updateTopMovers();
    }

    renderBubbles() {
        // Clear existing bubbles but keep zoom behavior
        this.svg.selectAll('.bubble').remove();

        // Get token colors
        const getTokenColor = (symbol) => {
            const tokenColors = {
                'BTC': '#f7931a', 'ETH': '#627eea', 'BNB': '#f3ba2f', 'SOL': '#14f195',
                'ADA': '#0033ad', 'XRP': '#23292f', 'DOT': '#e6007a', 'DOGE': '#c2a633',
                'AVAX': '#e84142', 'LINK': '#2a5ada', 'MATIC': '#8247e5', 'LTC': '#a6a9aa',
                'UNI': '#ff007a', 'XLM': '#000000', 'VET': '#15bdff', 'SHIB': '#ff6b35'
            };
            return tokenColors[symbol] || '#2563eb';
        };

        // Create size scale
        const sizeScale = d3.scaleSqrt()
            .domain([0, d3.max(this.filteredData, d => d.market_cap)])
            .range([20, 80]);

        // Create simulation
        this.simulation = d3.forceSimulation(this.filteredData)
            .force('charge', d3.forceManyBody().strength(10))
            .force('center', d3.forceCenter(this.width / 2, this.height / 2))
            .force('collision', d3.forceCollide().radius(d => sizeScale(d.market_cap) + 10))
            .on('tick', () => this.updateBubblePositions());

        // Create bubble groups
        const bubbles = this.svg.selectAll('.bubble')
            .data(this.filteredData)
            .enter()
            .append('g')
            .attr('class', 'bubble')
            .style('cursor', 'pointer')
            .call(this.enableDrag ? this.drag : null);

        // Add circles
        bubbles.append('circle')
            .attr('r', d => sizeScale(d.market_cap))
            .style('fill', d => getTokenColor(d.symbol))
            .style('stroke', '#fff')
            .style('stroke-width', 2)
            .style('opacity', 0.9)
            .style('filter', 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))')
            .on('mouseover', (event, d) => this.showTooltip(event, d))
            .on('mouseout', () => this.hideTooltip())
            .on('click', (event, d) => this.selectToken(d));

        // Add images
        if (this.showImages) {
        bubbles.append('image')
            .attr('xlink:href', d => d.image)
                .attr('x', d => -sizeScale(d.market_cap) * 0.2)
                .attr('y', d => -sizeScale(d.market_cap) * 0.2)
                .attr('width', d => sizeScale(d.market_cap) * 0.4)
                .attr('height', d => sizeScale(d.market_cap) * 0.4)
                .style('pointer-events', 'none')
                .style('opacity', 0.8)
                .style('mix-blend-mode', 'overlay')
                .style('filter', 'brightness(1.2) contrast(1.2)');
        }

        // Add labels
        if (this.showLabels) {
        bubbles.append('text')
            .text(d => d.symbol)
            .attr('text-anchor', 'middle')
            .attr('dy', '0.35em')
                .style('font-size', d => Math.max(12, sizeScale(d.market_cap) * 0.25) + 'px')
            .style('font-weight', 'bold')
            .style('fill', '#fff')
                .style('text-shadow', '3px 3px 6px rgba(0,0,0,0.9), 0 0 12px rgba(0,0,0,0.7)')
                .style('pointer-events', 'none')
                .style('opacity', 1);
        }
        
        // Ensure zoom behavior is still active
        this.svg.call(this.zoom);
    }

    updateBubblePositions() {
        this.svg.selectAll('.bubble')
            .style('transform', d => `translate(${d.x}px, ${d.y}px)`);
    }

    updateBubbleVisibility() {
        this.svg.selectAll('.bubble image')
            .style('display', this.showImages ? 'block' : 'none');
        
        this.svg.selectAll('.bubble text')
            .style('display', this.showLabels ? 'block' : 'none');
    }

    updateDragBehavior() {
        this.svg.selectAll('.bubble')
            .call(this.enableDrag ? this.drag : null);
    }

    // Drag functions
    dragstarted(event, d) {
        if (!event.active) this.simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
        this.isDragging = true;
    }

    dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    dragended(event, d) {
        if (!event.active) this.simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
        this.isDragging = false;
    }



    toggleFullscreen() {
        const chartContainer = document.getElementById('chart');
        if (!document.fullscreenElement) {
            chartContainer.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }

    // Token selection
    selectToken(token) {
        this.selectedToken = token;
        this.updateSelectedTokenDisplay();
        
        // Highlight selected bubble
        this.svg.selectAll('.bubble circle')
            .style('stroke-width', d => d.id === token.id ? 4 : 2)
            .style('stroke', d => d.id === token.id ? '#fff' : '#fff');
    }

    updateSelectedTokenDisplay() {
        const container = document.getElementById('selectedToken');
        if (!this.selectedToken) {
            container.innerHTML = '<div class="token-placeholder">Click on a bubble to see details</div>';
            return;
        }

        const timePeriod = document.getElementById('timePeriod').value;
        const timeLabel = this.getTimePeriodLabel(timePeriod);

        container.innerHTML = `
            <div class="token-details">
                <div class="token-header">
                    <img src="${this.selectedToken.image}" alt="${this.selectedToken.name}" class="token-icon">
                    <div class="token-info">
                        <h4>${this.selectedToken.name}</h4>
                        <span class="token-symbol">${this.selectedToken.symbol}</span>
                    </div>
                </div>
                <div class="token-stats">
                    <div class="stat-row">
                        <span class="stat-label">Price:</span>
                        <span class="stat-value">$${this.selectedToken.price.toLocaleString()}</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label">Market Cap:</span>
                        <span class="stat-value">$${(this.selectedToken.market_cap / 1e9).toFixed(2)}B</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label">Volume (24h):</span>
                        <span class="stat-value">$${(this.selectedToken.volume / 1e9).toFixed(2)}B</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label">Change (${timeLabel}):</span>
                        <span class="stat-value ${this.selectedToken.price_change >= 0 ? 'positive' : 'negative'}">
                            ${this.selectedToken.price_change >= 0 ? '+' : ''}${this.selectedToken.price_change.toFixed(2)}%
                        </span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label">Rank:</span>
                        <span class="stat-value">#${this.selectedToken.market_cap_rank}</span>
                    </div>
                </div>
                <button class="view-details-btn" onclick="window.open('https://www.coingecko.com/en/coins/${this.selectedToken.id}', '_blank')">
                    View on CoinGecko
                </button>
            </div>
        `;
    }

    // Tooltip
    showTooltip(event, data) {
        if (this.isDragging) return;
        
        const timePeriod = document.getElementById('timePeriod').value;
        const timeLabel = this.getTimePeriodLabel(timePeriod);
        
        const tooltipContent = `
            <div style="font-weight: bold; margin-bottom: 5px;">${data.name} (${data.symbol})</div>
            <div style="font-size: 0.9em; color: #888; margin-bottom: 8px;">Rank #${data.market_cap_rank}</div>
            <div>Price: $${data.price.toLocaleString()}</div>
            <div>Market Cap: $${(data.market_cap / 1e9).toFixed(2)}B</div>
            <div>Volume (24h): $${(data.volume / 1e9).toFixed(2)}B</div>
            <div>Change (${timeLabel}): <span style="color: ${data.price_change >= 0 ? '#10b981' : '#ef4444'}">${data.price_change >= 0 ? '+' : ''}${data.price_change.toFixed(2)}%</span></div>
            <div style="margin-top: 8px; font-size: 0.8em; color: #888;">Click to select</div>
        `;

        this.tooltip
            .html(tooltipContent)
            .style('left', (event.pageX + 10) + 'px')
            .style('top', (event.pageY - 10) + 'px')
            .style('opacity', 1);
    }

    hideTooltip() {
        this.tooltip.style('opacity', 0);
    }

    // Stats and updates
    updateStats() {
        if (!this.filteredData.length) return;

        const totalMarketCap = this.filteredData.reduce((sum, d) => sum + d.market_cap, 0);
        const totalVolume = this.filteredData.reduce((sum, d) => sum + d.volume, 0);
        const avgChange = this.filteredData.reduce((sum, d) => sum + d.price_change, 0) / this.filteredData.length;
        const btcData = this.filteredData.find(d => d.symbol === 'BTC');
        const btcDominance = btcData ? (btcData.market_cap / totalMarketCap * 100) : 0;

        document.getElementById('totalMarketCap').textContent = `$${(totalMarketCap / 1e12).toFixed(2)}T`;
        document.getElementById('totalVolume').textContent = `$${(totalVolume / 1e9).toFixed(2)}B`;
        document.getElementById('avgChange').textContent = `${avgChange >= 0 ? '+' : ''}${avgChange.toFixed(2)}%`;
        document.getElementById('bubbleCount').textContent = this.filteredData.length;
        
        // Global stats
        document.getElementById('globalMarketCap').textContent = `$${(totalMarketCap / 1e12).toFixed(2)}T`;
        document.getElementById('globalVolume').textContent = `$${(totalVolume / 1e9).toFixed(2)}B`;
        document.getElementById('btcDominance').textContent = `${btcDominance.toFixed(1)}%`;
    }

    updateTopMovers() {
        const topGainers = this.filteredData
            .filter(d => d.price_change > 0)
            .sort((a, b) => b.price_change - a.price_change)
            .slice(0, 5);

        const topLosers = this.filteredData
            .filter(d => d.price_change < 0)
            .sort((a, b) => a.price_change - b.price_change)
            .slice(0, 5);

        const container = document.getElementById('topMovers');
        container.innerHTML = '';

        // Top Gainers Section
        const gainersSection = document.createElement('div');
        gainersSection.className = 'movers-section';
        gainersSection.innerHTML = '<h4 class="movers-title gainers">📈 Top Gainers</h4>';
        
        topGainers.forEach((token, index) => {
            const moverItem = document.createElement('div');
            moverItem.className = 'mover-item gainer';
            moverItem.onclick = () => this.selectToken(token);
            
            moverItem.innerHTML = `
                <div class="mover-icon gainer">${index + 1}</div>
                <div class="mover-info">
                    <div class="mover-name">${token.name}</div>
                    <div class="mover-symbol">${token.symbol}</div>
                </div>
                <div class="mover-change positive">
                    +${token.price_change.toFixed(2)}%
                </div>
            `;
            
            gainersSection.appendChild(moverItem);
        });
        
        container.appendChild(gainersSection);

        // Top Losers Section
        const losersSection = document.createElement('div');
        losersSection.className = 'movers-section';
        losersSection.innerHTML = '<h4 class="movers-title losers">📉 Top Losers</h4>';
        
        topLosers.forEach((token, index) => {
            const moverItem = document.createElement('div');
            moverItem.className = 'mover-item loser';
            moverItem.onclick = () => this.selectToken(token);
            
            moverItem.innerHTML = `
                <div class="mover-icon loser">${index + 1}</div>
                <div class="mover-info">
                    <div class="mover-name">${token.name}</div>
                    <div class="mover-symbol">${token.symbol}</div>
                </div>
                <div class="mover-change negative">
                    ${token.price_change.toFixed(2)}%
                </div>
            `;
            
            losersSection.appendChild(moverItem);
        });
        
        container.appendChild(losersSection);
    }

    // Loading and error states
    showLoading() {
        const chartContainer = document.getElementById('chart');
        chartContainer.innerHTML = '<div class="loading">Loading cryptocurrency data...</div>';
    }

    hideLoading() {
        const chartContainer = document.getElementById('chart');
        const loadingElement = chartContainer.querySelector('.loading');
        if (loadingElement) {
            loadingElement.remove();
        }
    }

    showError(message) {
        const chartContainer = document.getElementById('chart');
        chartContainer.innerHTML = `
            <div class="error">
                <div class="error-icon">⚠️</div>
                <div>${message}</div>
                <button onclick="window.cryptoBubbles.retryLoad()" style="margin-top: 10px; padding: 8px 16px; background: #2563eb; color: white; border: none; border-radius: 4px; cursor: pointer;">
                    Retry
                </button>
            </div>
        `;
    }

    async retryLoad() {
        this.showLoading();
        try {
            await this.loadData();
            this.createChart();
            this.updateStats();
            this.updateTopMovers();
            this.hideLoading();
        } catch (error) {
            console.error('Retry failed:', error);
            this.showError('Failed to load data. Please check your internet connection.');
        }
    }

    async refreshData() {
        const refreshBtn = document.getElementById('refreshBtn');
        refreshBtn.disabled = true;
        refreshBtn.textContent = '⏳';
        
        try {
            await this.loadData();
            this.updateChart();
            console.log('Data refreshed successfully');
        } catch (error) {
            console.error('Refresh failed:', error);
        } finally {
            refreshBtn.disabled = false;
            refreshBtn.textContent = '🔄';
        }
    }

    setupAutoRefresh(intervalSeconds) {
        if (this.autoRefreshInterval) {
            clearInterval(this.autoRefreshInterval);
            this.autoRefreshInterval = null;
        }
        
        if (intervalSeconds > 0) {
            this.autoRefreshInterval = setInterval(() => {
                this.refreshData();
            }, intervalSeconds * 1000);
            console.log(`Auto refresh set to ${intervalSeconds} seconds`);
        }
    }

    getPriceChangeForPeriod(coin, timePeriod) {
        switch (timePeriod) {
            case '1h':
                return coin.price_change_percentage_1h_in_currency || 0;
            case '4h':
                return coin.price_change_percentage_4h_in_currency || 0;
            case '24h':
                return coin.price_change_percentage_24h || 0;
            case '7d':
                return coin.price_change_percentage_7d_in_currency || 0;
            case '30d':
                return coin.price_change_percentage_30d_in_currency || 0;
            case '1y':
                return coin.price_change_percentage_1y_in_currency || 0;
            case 'max':
                return coin.price_change_percentage_max_in_currency || 0;
            default:
                return coin.price_change_percentage_24h || 0;
        }
    }

    getTimePeriodLabel(timePeriod) {
        switch (timePeriod) {
            case '1h':
                return '1h';
            case '4h':
                return '4h';
            case '24h':
                return '24h';
            case '7d':
                return '7d';
            case '30d':
                return '30d';
            case '1y':
                return '1y';
            case 'max':
                return 'All Time';
            default:
                return '24h';
        }
    }

    updateDataSource(source) {
        const dataSourceElement = document.getElementById('dataSource');
        if (dataSourceElement) {
            dataSourceElement.textContent = source;
        }
    }

    // AI Agent Methods
    async sendMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        
        if (!message || this.isTyping) return;
        
        // Add user message
        this.addMessage(message, 'user');
        input.value = '';
        
        // Update context with current data
        this.updateConversationContext();
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Generate AI response
        const response = await this.generateAIResponse(message);
        
        // Hide typing indicator and show response
        this.hideTypingIndicator();
        this.addMessage(response, 'ai');
    }

    addMessage(text, sender) {
        const chatMessages = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        messageDiv.innerHTML = `
            <div class="message-avatar">${sender === 'ai' ? '🤖' : '👤'}</div>
            <div class="message-content">
                <div class="message-text">${this.formatMessage(text)}</div>
                <div class="message-time">${time}</div>
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Store message
        this.chatMessages.push({ text, sender, timestamp: new Date() });
    }

    formatMessage(text) {
        // Convert markdown-like formatting to HTML
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code>$1</code>')
            .replace(/\n/g, '<br>');
    }

    showTypingIndicator() {
        this.isTyping = true;
        const chatMessages = document.getElementById('chatMessages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message ai-message';
        typingDiv.id = 'typingIndicator';
        
        typingDiv.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    hideTypingIndicator() {
        this.isTyping = false;
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    updateConversationContext() {
        this.conversationContext.currentData = this.filteredData;
        this.conversationContext.selectedToken = this.selectedToken;
        this.conversationContext.marketTrends = this.analyzeMarketTrends();
        this.conversationContext.userPreferences = {
            sortBy: document.getElementById('sortBy').value,
            timePeriod: document.getElementById('timePeriod').value,
            showLabels: this.showLabels,
            showImages: this.showImages
        };
    }

    analyzeMarketTrends() {
        if (!this.filteredData.length) return {};
        
        const trends = {
            totalMarketCap: this.filteredData.reduce((sum, d) => sum + d.market_cap, 0),
            totalVolume: this.filteredData.reduce((sum, d) => sum + d.volume, 0),
            avgChange: this.filteredData.reduce((sum, d) => sum + d.price_change, 0) / this.filteredData.length,
            gainers: this.filteredData.filter(d => d.price_change > 0).length,
            losers: this.filteredData.filter(d => d.price_change < 0).length,
            topGainers: this.filteredData.filter(d => d.price_change > 0).sort((a, b) => b.price_change - a.price_change).slice(0, 3),
            topLosers: this.filteredData.filter(d => d.price_change < 0).sort((a, b) => a.price_change - b.price_change).slice(0, 3),
            btcDominance: 0
        };
        
        const btc = this.filteredData.find(d => d.symbol === 'BTC');
        if (btc) {
            trends.btcDominance = (btc.market_cap / trends.totalMarketCap * 100).toFixed(1);
        }
        
        return trends;
    }

    async generateAIResponse(userMessage) {
        const message = userMessage.toLowerCase();
        const trends = this.conversationContext.marketTrends;
        const selectedToken = this.conversationContext.selectedToken;
        
        // Greeting responses
        if (message.includes('hello') || message.includes('hi') || message.includes('hey') || message.includes('greetings')) {
            return this.generateGreetingResponse();
        }
        
        // How are you responses
        if (message.includes('how are you') || message.includes('how do you do')) {
            return this.generateHowAreYouResponse();
        }
        
        // Thanks responses
        if (message.includes('thank') || message.includes('thanks')) {
            return this.generateThanksResponse();
        }
        
        // Goodbye responses
        if (message.includes('bye') || message.includes('goodbye') || message.includes('see you')) {
            return this.generateGoodbyeResponse();
        }
        
        // Market overview queries
        if (message.includes('market') || message.includes('overview') || message.includes('summary')) {
            return this.generateMarketOverview(trends);
        }
        
        // Specific token queries
        if (message.includes('bitcoin') || message.includes('btc')) {
            return this.generateTokenAnalysis('BTC', trends);
        }
        
        if (message.includes('ethereum') || message.includes('eth')) {
            return this.generateTokenAnalysis('ETH', trends);
        }
        
        // Top gainers/losers queries
        if (message.includes('gainers') || message.includes('top gainers')) {
            return this.generateTopGainersAnalysis(trends);
        }
        
        if (message.includes('losers') || message.includes('top losers')) {
            return this.generateTopLosersAnalysis(trends);
        }
        
        // Price change queries
        if (message.includes('price change') || message.includes('performance')) {
            return this.generatePriceChangeAnalysis(trends);
        }
        
        // Volume analysis
        if (message.includes('volume') || message.includes('trading volume')) {
            return this.generateVolumeAnalysis(trends);
        }
        
        // Market cap analysis
        if (message.includes('market cap') || message.includes('market capitalization')) {
            return this.generateMarketCapAnalysis(trends);
        }
        
        // Help queries
        if (message.includes('help') || message.includes('what can you do')) {
            return this.generateHelpResponse();
        }
        
        // Default response - more conversational
        return this.generateConversationalResponse(message, trends);
    }

    generateMarketOverview(trends) {
        const marketCap = (trends.totalMarketCap / 1e12).toFixed(2);
        const volume = (trends.totalVolume / 1e9).toFixed(2);
        const avgChange = trends.avgChange.toFixed(2);
        const sentiment = trends.avgChange > 0 ? 'positive' : 'negative';
        
        return `📊 **Market Overview**\n\n` +
               `**Total Market Cap:** $${marketCap}T\n` +
               `**24h Volume:** $${volume}B\n` +
               `**Average Change:** ${avgChange}% (${sentiment})\n` +
               `**Active Tokens:** ${this.filteredData.length}\n` +
               `**Market Sentiment:** ${trends.gainers > trends.losers ? 'Bullish' : 'Bearish'} (${trends.gainers} gainers vs ${trends.losers} losers)\n\n` +
               `The market is currently showing ${sentiment} momentum with ${trends.gainers} tokens in the green and ${trends.losers} in the red.`;
    }

    generateTokenAnalysis(symbol, trends) {
        const token = this.filteredData.find(d => d.symbol === symbol);
        if (!token) {
            return `I don't see ${symbol} in the current data. Try refreshing the data or check if it meets your filter criteria.`;
        }
        
        const price = token.price.toLocaleString();
        const marketCap = (token.market_cap / 1e9).toFixed(2);
        const volume = (token.volume / 1e9).toFixed(2);
        const change = token.price_change.toFixed(2);
        const rank = token.market_cap_rank;
        
        return `**${token.name} (${symbol}) Analysis**\n\n` +
               `💰 **Price:** $${price}\n` +
               `📈 **Market Cap:** $${marketCap}B (#${rank})\n` +
               `📊 **24h Volume:** $${volume}B\n` +
               `📉 **24h Change:** ${change}% ${change >= 0 ? '📈' : '📉'}\n\n` +
               `${change >= 0 ? 'Positive' : 'Negative'} momentum with ${Math.abs(change)}% price movement in the last 24 hours.`;
    }

    generateTopGainersAnalysis(trends) {
        if (!trends.topGainers.length) {
            return "No gainers found in the current data. Try adjusting your filters or refreshing the data.";
        }
        
        let response = "🚀 **Top Gainers (24h)**\n\n";
        trends.topGainers.forEach((token, index) => {
            response += `${index + 1}. **${token.symbol}** (+${token.price_change.toFixed(2)}%)\n`;
            response += `   ${token.name} - $${token.price.toLocaleString()}\n\n`;
        });
        
        response += `These tokens are leading the market with strong positive momentum.`;
        return response;
    }

    generateTopLosersAnalysis(trends) {
        if (!trends.topLosers.length) {
            return "No losers found in the current data. Try adjusting your filters or refreshing the data.";
        }
        
        let response = "📉 **Top Losers (24h)**\n\n";
        trends.topLosers.forEach((token, index) => {
            response += `${index + 1}. **${token.symbol}** (${token.price_change.toFixed(2)}%)\n`;
            response += `   ${token.name} - $${token.price.toLocaleString()}\n\n`;
        });
        
        response += `These tokens are experiencing downward pressure. Consider market conditions and do your own research.`;
        return response;
    }

    generatePriceChangeAnalysis(trends) {
        const avgChange = trends.avgChange.toFixed(2);
        const gainers = trends.gainers;
        const losers = trends.losers;
        const total = gainers + losers;
        const gainerPercentage = ((gainers / total) * 100).toFixed(1);
        
        return `📈 **Price Performance Analysis**\n\n` +
               `**Average Change:** ${avgChange}%\n` +
               `**Market Distribution:** ${gainerPercentage}% gainers, ${(100 - gainerPercentage).toFixed(1)}% losers\n` +
               `**Total Tokens:** ${total}\n\n` +
               `${avgChange >= 0 ? 'Overall positive' : 'Overall negative'} market sentiment with ${gainers} tokens showing gains and ${losers} showing losses.`;
    }

    generateVolumeAnalysis(trends) {
        const totalVolume = (trends.totalVolume / 1e9).toFixed(2);
        const avgVolume = (trends.totalVolume / this.filteredData.length / 1e9).toFixed(2);
        
        return `📊 **Trading Volume Analysis**\n\n` +
               `**Total 24h Volume:** $${totalVolume}B\n` +
               `**Average Volume per Token:** $${avgVolume}B\n` +
               `**Active Tokens:** ${this.filteredData.length}\n\n` +
               `High trading volume indicates active market participation and liquidity.`;
    }

    generateMarketCapAnalysis(trends) {
        const totalMarketCap = (trends.totalMarketCap / 1e12).toFixed(2);
        const avgMarketCap = (trends.totalMarketCap / this.filteredData.length / 1e9).toFixed(2);
        
        return `💰 **Market Capitalization Analysis**\n\n` +
               `**Total Market Cap:** $${totalMarketCap}T\n` +
               `**Average Market Cap:** $${avgMarketCap}B\n` +
               `**Tokens Analyzed:** ${this.filteredData.length}\n\n` +
               `Market capitalization represents the total value of all tokens in circulation.`;
    }

    generateHelpResponse() {
        return `🤖 **Crypto AI Assistant Help**\n\n` +
               `I can help you analyze cryptocurrency markets! Here are some things you can ask me:\n\n` +
               `📊 **Market Analysis:**\n` +
               `• "Show me market overview"\n` +
               `• "What's the market sentiment?"\n` +
               `• "Analyze price changes"\n\n` +
               `🏆 **Top Performers:**\n` +
               `• "Show top gainers"\n` +
               `• "Show top losers"\n` +
               `• "Bitcoin analysis"\n` +
               `• "Ethereum performance"\n\n` +
               `📈 **Metrics:**\n` +
               `• "Volume analysis"\n` +
               `• "Market cap breakdown"\n` +
               `• "Trading activity"\n\n` +
               `Just ask me anything about the crypto market data you're viewing!`;
    }

    generateGreetingResponse() {
        const greetings = [
            "Hello there! 👋 I'm your Crypto AI Assistant. How can I help you with the market today?",
            "Hi! 😊 Great to see you! I'm here to help you analyze the cryptocurrency market. What would you like to know?",
            "Hey! 🚀 Welcome to CryptoBubbles! I can help you understand market trends, analyze tokens, and more. What's on your mind?",
            "Hello! 💎 I'm excited to help you explore the crypto market! What would you like to learn about today?"
        ];
        return greetings[Math.floor(Math.random() * greetings.length)];
    }

    generateHowAreYouResponse() {
        const responses = [
            "I'm doing great, thanks for asking! 😊 I'm always ready to help you analyze the crypto market. How about you?",
            "I'm excellent! 🚀 My circuits are buzzing with the latest market data. Ready to dive into some crypto analysis?",
            "I'm fantastic! 💎 I love helping people understand cryptocurrency markets. What would you like to explore today?",
            "I'm doing wonderful! 📊 I've been analyzing market trends and I'm excited to share insights with you!"
        ];
        return responses[Math.floor(Math.random() * greetings.length)];
    }

    generateThanksResponse() {
        const responses = [
            "You're very welcome! 😊 I'm here to help you navigate the crypto world. Anything else you'd like to know?",
            "My pleasure! 🚀 I love sharing crypto insights. Feel free to ask me anything about the market!",
            "Anytime! 💎 I'm your crypto companion. What else can I help you with today?",
            "You're welcome! 📊 I'm always happy to help with crypto analysis. What's next on your mind?"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    generateGoodbyeResponse() {
        const responses = [
            "Goodbye! 👋 Thanks for chatting with me. Come back anytime for more crypto insights!",
            "See you later! 😊 I'll be here when you need more market analysis. Take care!",
            "Bye! 🚀 It was great helping you with crypto analysis. Don't hesitate to return!",
            "Farewell! 💎 I enjoyed our crypto conversation. Come back soon for more insights!"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    generateConversationalResponse(message, trends) {
        const responses = [
            `I'm not sure I understand "${message}" in the context of crypto markets. 🤔 But I'd love to help you with market analysis! Try asking me about market trends, specific tokens like Bitcoin or Ethereum, or type "help" to see what I can do.`,
            
            `Hmm, "${message}" isn't something I can help with specifically, but I'm great at crypto analysis! 💎 I can show you market overviews, top performers, token analysis, and more. What interests you?`,
            
            `I'm not familiar with "${message}" in terms of crypto markets, but I'm here to help you understand the data you're seeing! 📊 Try asking about market trends, specific coins, or type "help" for my full capabilities.`,
            
            `That's an interesting question about "${message}"! 🤖 While I specialize in crypto market analysis, I'd be happy to help you understand market trends, token performance, or show you what I can do. Just type "help"!`
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }
}

// Initialize the chart when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.cryptoBubbles = new CryptoBubbles();
});

// Handle window resize
window.addEventListener('resize', () => {
    setTimeout(() => {
        if (window.cryptoBubbles) {
            window.cryptoBubbles.createChart();
        }
    }, 100);
}); 