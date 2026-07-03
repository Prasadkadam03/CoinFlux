# How Does an Exchange Work? (Simple Explanation)
 
Think of this like a **subzi mandi (vegetable market)**, but instead of tomatoes and onions, people are buying and selling Bitcoin, Ethereum, etc.
 
---
 
## 1. What is an Exchange?
 
An exchange is just a **middleman system** that connects:
- People who want to **buy** something
- People who want to **sell** the same thing
It makes sure both sides get a fair deal, and nobody cheats anyone.
 
```
   BUYERS                    SELLERS
   "I want BTC"               "I have BTC"
      |                            |
      |--------> EXCHANGE <--------|
                  (matches them)
```
 
---
 
## 2. Everyone Has a Wallet (Like a Bank Locker)
 
Every user on the exchange has a **wallet** — just a record of how much money and how much crypto they own.
 
```
Ravi's Wallet:
  ₹50,000  (cash)
  0.2 BTC  (bitcoin)
 
Priya's Wallet:
  ₹20,000  (cash)
  0.5 BTC  (bitcoin)
```
 
This is literally just two numbers stored in a database. Nothing fancy.
 
---
 
## 3. Placing an Order — "Bid" and "Ask"
 
Suppose Ravi wants to **buy** 0.1 BTC. He says:
 
> "I will pay ₹60,000 for 0.1 BTC"
 
This is called a **BID** (a buy request).
 
Now suppose Priya wants to **sell** 0.1 BTC. She says:
 
> "I want ₹61,000 for 0.1 BTC"
 
This is called an **ASK** (a sell request).
 
```
BID (buyer)                 ASK (seller)
Ravi: ₹60,000 for 0.1 BTC    Priya: ₹61,000 for 0.1 BTC
```
 
Right now, these two don't match — Ravi wants to pay less than what Priya wants. So nothing happens yet. Both orders just sit and wait.
 
**Important child-simple point:** The moment you place an order, your money (or your BTC) gets **locked**, like a security deposit. You cannot use it anywhere else until the order is completed or cancelled. This stops people from cheating (placing fake orders they can't actually pay for).
 
---
 
## 4. The Order Book — Like a Notice Board
 
The exchange keeps a live list of ALL buy and sell orders. This list is called the **Order Book**.
 
Imagine a notice board split in two:
 
```
        ORDER BOOK (BTC/INR)
   ----------------------------------
   BUYERS (Bids)     |  SELLERS (Asks)
   ----------------------------------
   ₹60,000 - 0.1 BTC | ₹61,000 - 0.1 BTC
   ₹59,500 - 0.3 BTC | ₹61,200 - 0.2 BTC
   ₹59,000 - 0.5 BTC | ₹61,500 - 0.4 BTC
   ----------------------------------
       (highest first)   (lowest first)
```
 
- Left side (buyers) is sorted **highest price on top** — the most desperate buyer is at the top.
- Right side (sellers) is sorted **lowest price on top** — the most desperate seller (cheapest) is at the top.
The gap between ₹60,000 (top buyer) and ₹61,000 (top seller) is called the **spread**. As long as this gap exists, nobody trades.
 
---
 
## 5. Matching — When a Trade Actually Happens
 
Now suppose a new person, Aman, comes and places an order:
 
> "I want to BUY 0.1 BTC, and I'm willing to pay ₹61,000"
 
Look at the order book again:
 
```
   BUYERS (Bids)     |  SELLERS (Asks)
   ----------------------------------
   ₹61,000 - 0.1 BTC  | ₹61,000 - 0.1 BTC   <-- MATCH!
   ₹60,000 - 0.1 BTC  | ₹61,200 - 0.2 BTC
   ₹59,500 - 0.3 BTC  | ₹61,500 - 0.4 BTC
```
 
Aman's buy price (₹61,000) **matches** Priya's sell price (₹61,000)!
 
This is exactly like the subzi mandi — when the buyer's offer price meets the seller's asking price, the deal is done immediately, no negotiation needed.
 
### What happens during the match:
```
   Aman's ₹61,000 -------> goes to -------> Priya
   Priya's 0.1 BTC -------> goes to -------> Aman
```
 
Both wallets update instantly:
 
```
Before:                       After:
Aman:  ₹61,000, 0 BTC          Aman:  ₹0, 0.1 BTC
Priya: 0 cash, 0.1 BTC         Priya: ₹61,000, 0 BTC
```
 
This completed deal is called a **Trade**. The exchange saves a record of it — this record becomes your **price history** (the chart you see on apps like CoinDCA or Binance is just thousands of these trade records plotted on a graph).
 
```
Price Chart = Trade 1, Trade 2, Trade 3, Trade 4... connected by a line
```
 
---
 
## 6. Two Types of Orders (Very Important)
 
### A) Limit Order — "Only at MY price or better"
> "Buy 0.1 BTC, but only if it's ₹60,000 or less"
 
If no one is selling at that price, your order just **waits** in the order book until someone matches it.
 
### B) Market Order — "Buy/Sell RIGHT NOW, any price"
> "Buy 0.1 BTC immediately, I don't care about exact price"
 
This order doesn't wait. It instantly grabs whatever is the **cheapest available seller** in the order book and completes the trade right away.
 
```
Market Order is like saying:
"Bhaiya jo bhi rate hai, abhi de do!"
(Whatever the rate is, give it to me right now!)
 
Limit Order is like saying:
"Bhaiya, sirf ₹60,000 mein doge to lunga"
(I'll only buy it if you give it for ₹60,000)
```
 
---
 
## 7. Partial Fills — When Amounts Don't Match Exactly
 
What if Ravi wants to buy 0.5 BTC, but the cheapest seller only has 0.2 BTC available?
 
```
Ravi wants:    0.5 BTC
Seller has:    0.2 BTC available at best price
 
Step 1: Match 0.2 BTC -> Trade happens
Step 2: Ravi still needs 0.3 BTC more
Step 3: His order goes to the NEXT seller in line
Step 4: Repeat until Ravi gets his full 0.5 BTC
        (or his order sits partially filled, waiting)
```
 
This is called a **partial fill** — the order gets filled bit by bit from multiple sellers if needed.
 
---
 
## 8. Cancelling an Order
 
If Ravi gets impatient and his order hasn't matched yet, he can cancel it. His locked money/BTC gets released back into his wallet immediately, like getting your security deposit back.
 
---
 
## 9. The Full Picture (Summary Diagram)
 
```
 1. User places order  --->  2. Locks funds/crypto
        |
        v
 3. Order goes into ORDER BOOK
        |
        v
 4. Matching Engine checks:
    "Does any buy price >= any sell price?"
        |
   ----YES----              ----NO----
        |                        |
        v                        v
 5. TRADE happens         Order just waits
    - money moves              in the book
    - crypto moves
    - wallets update
        |
        v
 6. Trade saved in history
        |
        v
 7. Price chart updates (this is what users see live)
```
 
---
 
## 10. Real-World Analogy Recap
 
| Subzi Mandi (Vegetable Market) | Crypto Exchange |
|---|---|
| Buyer wants tomatoes cheap | Buyer wants BTC cheap (Bid) |
| Seller wants good price for tomatoes | Seller wants good price for BTC (Ask) |
| Deal happens when price agreed | Trade happens when bid = ask |
| Vendor's stock reduces after sale | Seller's BTC balance reduces |
| Buyer's pocket money reduces | Buyer's INR balance reduces |
| Market rate board (today's veg prices) | Live price chart |
 
---
 
That's it — this is the ENTIRE concept. Everything you'll build in code (database tables, APIs, real-time updates) is just a digital, automatic, super-fast version of this same simple idea.
 
**Next step suggestion:** Once this is clear, we can design the database schema (Users, Wallets, Orders, Trades tables) which will map 1:1 to everything explained above.
