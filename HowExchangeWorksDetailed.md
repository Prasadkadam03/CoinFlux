# How Does a Crypto Exchange Work? (Detailed Version with Edge Cases)

---

## Chapter 1: The Wallet System (Balance Management)

Every user has a wallet. But it's not just one number — it's split into TWO parts:

```
Ravi's Wallet:
  ┌─────────────────────────────────────┐
  │  USDT Available:  ₹50,000           │  ← can use this freely
  │  USDT Locked:     ₹10,000           │  ← frozen, tied to an open order
  │                                     │
  │  BTC Available:   0.2 BTC           │  ← can use this freely
  │  BTC Locked:      0.05 BTC          │  ← frozen, tied to an open order
  └─────────────────────────────────────┘
  Total USDT = Available + Locked = ₹60,000
```

### Why two parts?
Suppose Ravi has ₹60,000 and places a buy order for 0.1 BTC at ₹60,000.
That entire ₹60,000 must get **locked** immediately.
Otherwise Ravi could place 10 orders with the same ₹60,000 — which is fraud.

### Edge Case 1: Insufficient Balance
> Ravi tries to place a buy order for 0.1 BTC at ₹60,000 but only has ₹40,000 available.

```
Order Request: Buy 0.1 BTC at ₹60,000
Funds needed:  ₹60,000
Available:     ₹40,000

RESULT: ❌ ORDER REJECTED — "Insufficient balance"
```
The order never even enters the order book. Reject at the door itself.

### Edge Case 2: Partial Balance Lock (for partial fills)
> Ravi has ₹60,000 and places a buy for 0.1 BTC at ₹60,000.
> Only 0.05 BTC gets matched immediately.

```
Initial Lock:       ₹60,000 locked
After partial fill: ₹30,000 unlocked (used for the trade)
                    ₹30,000 still locked (waiting for rest of order)
```
The lock adjusts proportionally as the order gets partially filled.

---

## Chapter 2: The Order Book in Detail

The order book is two sorted lists — bids (buyers) and asks (sellers):

```
         ORDER BOOK — BTC/USDT
  ┌──────────────────────────────────────┐
  │         ASKS (Sellers)               │
  │  Price     │  Amount  │  Who         │
  │  $62,000   │  0.5 BTC │  Priya       │  ← highest ask
  │  $61,500   │  0.2 BTC │  Ankit       │
  │  $61,000   │  0.1 BTC │  Meera       │  ← lowest ask (best for buyer)
  ├────────────┼──────────┼──────────────┤
  │  ↑ SPREAD  │          │              │  ← gap = $61,000 - $60,500 = $500
  ├────────────┼──────────┼──────────────┤
  │  $60,500   │  0.3 BTC │  Ravi        │  ← highest bid (best for seller)
  │  $60,000   │  0.2 BTC │  Aman        │
  │  $59,500   │  0.4 BTC │  Sanjay      │  ← lowest bid
  │         BIDS (Buyers)                │
  └──────────────────────────────────────┘
```

- Asks: sorted **lowest price on top** (cheapest seller first)
- Bids: sorted **highest price on top** (most eager buyer first)
- **Spread** = difference between best ask and best bid
- When spread = 0, a trade happens

### Edge Case 3: Empty Order Book
> Someone places a market order but there are zero sellers.

```
Market Buy Order: 0.1 BTC
Asks in book:     EMPTY

RESULT: ❌ ORDER REJECTED or stays pending
        "No liquidity available"
```
Can't buy if nobody is selling. Market orders require the other side to exist.

---

## Chapter 3: Price-Time Priority (The Fairness Rule)

When two sellers are selling at the **same price**, who gets matched first?
**Answer: whoever placed the order EARLIER.** This is the fundamental fairness rule.

```
Asks at $61,000:
  Meera  →  placed order at 10:00:01 AM  →  matched FIRST
  Rohit  →  placed order at 10:00:05 AM  →  matched SECOND
  Deepa  →  placed order at 10:00:09 AM  →  matched THIRD
```

This is called **Price-Time Priority**:
1. Best price gets matched first
2. Among equal prices, earliest order gets matched first

```
Priority Rule:
  Best Price > Earliest Time > Everything Else
```

---

## Chapter 4: The Matching Engine (The Brain)

The matching engine runs constantly, asking one question:

```
"Is the highest bid >= lowest ask?"
    YES → Execute a trade
    NO  → Do nothing, wait
```

### How a full match works (Step by Step):

**Scenario:** Aman places: Buy 0.1 BTC at $61,000
Order book has: Meera selling 0.1 BTC at $61,000

```
Step 1: New order comes in
        Aman: BUY 0.1 BTC @ $61,000

Step 2: Engine checks top of book
        Best Ask: Meera @ $61,000 for 0.1 BTC
        Aman's bid ($61,000) >= Meera's ask ($61,000) ✅

Step 3: MATCH FOUND
        Trade Price:  $61,000
        Trade Amount: 0.1 BTC

Step 4: Move money
        $6,100 (locked from Aman) → Meera's wallet
        0.1 BTC (locked from Meera) → Aman's wallet

Step 5: Remove both orders from order book (fully filled)

Step 6: Save trade record
        { buyer: Aman, seller: Meera, price: $61,000, amount: 0.1, time: now }

Step 7: Update price chart
        Latest price = $61,000
```

---

## Chapter 5: Partial Fills (The Complex Case)

This is where most beginners get confused. Let's go deep.

### Case A: Buyer wants MORE than seller has

```
Aman wants to BUY:  0.5 BTC @ $61,000
Meera is SELLING:   0.2 BTC @ $61,000

Round 1:
  Match 0.2 BTC (all of Meera's)
  Aman's order: 0.5 - 0.2 = 0.3 BTC still remaining
  Meera's order: FULLY FILLED, removed from book

  Order book now:
    Asks: Ankit @ $61,200, 0.3 BTC (next in line)
    Bids: Aman @ $61,000, 0.3 BTC remaining

  Aman's price ($61,000) < Ankit's ask ($61,200)
  NO MATCH → Aman's remaining order sits in the book and waits
```

```
Order Book after Round 1:
  ┌───────────────────────────────────────┐
  │  ASKS                                 │
  │  $61,200  │  0.3 BTC  │  Ankit        │
  │  $61,500  │  0.5 BTC  │  Rohit        │
  ├───────────────────────────────────────┤
  │  $61,000  │  0.3 BTC  │  Aman  ←NEW  │  ← Aman's remaining bid
  │  $60,500  │  0.3 BTC  │  Ravi         │
  └───────────────────────────────────────┘
```

### Case B: Seller wants to sell MORE than buyer wants

```
Meera is SELLING: 0.5 BTC @ $61,000
Aman wants to BUY: 0.2 BTC @ $61,000

Match: 0.2 BTC
  Aman's order: FULLY FILLED ✅
  Meera's order: 0.5 - 0.2 = 0.3 BTC remaining → stays in book

Meera's order now sits in the asks side with 0.3 BTC left.
```

### Case C: Market Order eating through multiple levels

```
Aman places MARKET BUY for 1.0 BTC
(Market order = no price limit, fill at whatever is available)

Order Book Asks:
  $61,000  →  0.3 BTC  (Meera)
  $61,200  →  0.4 BTC  (Ankit)
  $61,500  →  0.5 BTC  (Rohit)

Matching process:
  Round 1: Take 0.3 BTC from Meera @ $61,000
           Remaining: 1.0 - 0.3 = 0.7 BTC still needed
  Round 2: Take 0.4 BTC from Ankit @ $61,200
           Remaining: 0.7 - 0.4 = 0.3 BTC still needed
  Round 3: Take 0.3 BTC from Rohit @ $61,500 (partial fill of Rohit's 0.5)
           Remaining: 0 BTC — ORDER COMPLETE ✅

Total cost for Aman:
  0.3 × $61,000 = $18,300
  0.4 × $61,200 = $24,480
  0.3 × $61,500 = $18,450
  ─────────────────────────
  Total: $61,230 for 1.0 BTC
  Average price paid: $61,230 (not $61,000!)
```

This difference between expected price and actual average price is called **Slippage**.
Big orders cause more slippage because they eat through multiple price levels.

---

## Chapter 6: Order Types in Detail

### 1. Limit Order
```
"Buy 0.1 BTC only if price is $61,000 or LOWER"
"Sell 0.1 BTC only if price is $61,000 or HIGHER"

→ Sits in order book and WAITS if no immediate match
→ Guarantees your price, but NOT that it will fill
```

### 2. Market Order
```
"Buy 0.1 BTC RIGHT NOW at whatever price"
"Sell 0.1 BTC RIGHT NOW at whatever price"

→ Guarantees it fills immediately
→ Does NOT guarantee price (you could pay more than expected)
→ Dangerous in thin markets (low liquidity)
```

### 3. Cancel Order
```
Ravi placed: Buy 0.1 BTC @ $60,000
Nobody matched it. Ravi cancels.

System:
  1. Find Ravi's order in the book
  2. Remove it
  3. Unlock his $6,000 → back to available balance
  4. Save cancellation record
```

---

## Chapter 7: Edge Cases You MUST Handle

### Edge Case 4: Self-Trade Prevention
> What if Ravi places a BUY order AND a SELL order for the same asset at the same price?

```
Ravi: Buy 0.1 BTC @ $61,000
Ravi: Sell 0.1 BTC @ $61,000

Without protection: Ravi trades with himself
  → His own money goes in a circle
  → Fake trade record gets created
  → Price chart gets manipulated
  → THIS IS MARKET MANIPULATION

SOLUTION: Before matching, check if buyer == seller
          If same person → CANCEL/REJECT the order
```

### Edge Case 5: Price Improvement (Best Execution)
> Aman places: Buy 0.1 BTC at $62,000 (willing to pay up to $62,000)
> Best ask available: Meera at $61,000

```
Question: At what price does the trade execute?
Answer:   $61,000 (Meera's price, NOT Aman's limit)

Why? Because Meera's order was ALREADY SITTING in the book.
     The resting order's price always wins.
     Aman gets a BETTER price than he asked for — this is called price improvement.
```

```
Aman was willing to pay: $62,000
Aman actually paid:      $61,000
Price improvement:        $1,000 saved ✅
```

### Edge Case 6: Duplicate Orders / Double Submit
> User clicks "Place Order" twice due to network lag. Two identical orders come in.

```
Order 1: Buy 0.1 BTC @ $61,000 (arrives)
Order 2: Buy 0.1 BTC @ $61,000 (duplicate, arrives 50ms later)

Problem: If we don't handle this, user accidentally places 2 orders.
         ₹12,200 locked instead of ₹6,100.

SOLUTION: Use a unique idempotency key with each order.
          If same key comes twice, second one is ignored.
```

### Edge Case 7: Race Condition (Two simultaneous matches)
> Two buyers submit orders at the EXACT same millisecond, both matching the same seller.

```
At 10:00:01.000:
  Aman:  Buy 0.1 BTC @ $61,000
  Ravi:  Buy 0.1 BTC @ $61,000
  Meera: Sell 0.1 BTC @ $61,000 (only 0.1 available)

If both buyers try to grab Meera's 0.1 BTC simultaneously:
  → Could result in Meera selling 0.2 BTC she doesn't have
  → DISASTER

SOLUTION: Process orders one at a time (queue)
          OR use database locks / atomic transactions
          First order that arrives gets matched. Second one waits.
```

### Edge Case 8: Order Expired / Time-In-Force
> What if a user says "fill this order within 1 minute, else cancel it"?

```
Types of time rules:
  GTC (Good Till Cancelled): stays in book forever until matched/cancelled
  IOC (Immediate or Cancel): fill whatever you can RIGHT NOW, cancel the rest
  FOK (Fill or Kill): fill the ENTIRE order right now or cancel all of it

Example (IOC):
  Aman: Buy 0.5 BTC @ $61,000 (IOC)
  Only 0.2 BTC available at $61,000

  Result: 0.2 BTC matched immediately
          Remaining 0.3 BTC CANCELLED (not placed in book)
```

### Edge Case 9: Negative Price / Invalid Input
> What if someone sends: price = -1, amount = 0, or amount = 999999999?

```
Always validate:
  price > 0          ✅
  amount > 0         ✅
  amount <= some max ✅
  pair exists        ✅ (BTC/USDT is valid, BTC/DOGE might not be)
  user is verified   ✅

Reject garbage before it touches the order book.
```

### Edge Case 10: What if the database crashes mid-trade?

```
Trade is happening:
  Step 1: Deduct $6,100 from Aman ✅
  Step 2: Add 0.1 BTC to Aman    ← CRASH HERE 💥

Result without protection:
  Aman lost $6,100 AND didn't get his BTC. He'll never trust the exchange again.

SOLUTION: Use database TRANSACTIONS (all steps succeed or ALL steps rollback)
  BEGIN TRANSACTION
    Step 1: Deduct $6,100 from Aman
    Step 2: Add 0.1 BTC to Aman
    Step 3: Deduct 0.1 BTC from Meera
    Step 4: Add $6,100 to Meera
    Step 5: Save trade record
  COMMIT (only saves if ALL 5 steps succeed)
  (if any step fails → ROLLBACK, everything goes back to original)
```

This is why Postgres (which supports ACID transactions) is non-negotiable for money systems. Mongo alone would be dangerous here.

---

## Chapter 8: The Full Flow (Everything Together)

```
User places order
      │
      ▼
┌─────────────────────────────┐
│  VALIDATION LAYER           │
│  - Valid price & amount?    │
│  - Sufficient balance?      │
│  - Valid pair?              │
│  - No duplicate order?      │
└────────────┬────────────────┘
             │ PASS
             ▼
┌─────────────────────────────┐
│  LOCK FUNDS                 │
│  (buyer: lock USDT)         │
│  (seller: lock BTC)         │
└────────────┬────────────────┘
             │
             ▼
┌─────────────────────────────┐
│  ADD TO ORDER BOOK          │
│  (sorted by price+time)     │
└────────────┬────────────────┘
             │
             ▼
┌─────────────────────────────┐
│  MATCHING ENGINE CHECKS     │
│  top bid >= top ask?        │
└──────┬──────────────┬───────┘
       │ YES          │ NO
       ▼              ▼
┌─────────────┐  ┌────────────────┐
│ EXECUTE     │  │ Order sits     │
│ TRADE       │  │ in book        │
│             │  │ and waits      │
│ - Move BTC  │  └────────────────┘
│ - Move USDT │
│ - Update    │
│   wallets   │
│ - Save trade│
│ - Check if  │
│   more      │
│   matches   │◄── loop back if partial
└─────────────┘
       │
       ▼
┌─────────────────────────────┐
│  BROADCAST UPDATE           │
│  - New order book state     │
│  - Latest price             │
│  - Trade history update     │
│  (via WebSockets to all     │
│   connected users)          │
└─────────────────────────────┘
```

---

## Chapter 9: What Makes the "Live" Feel

Every time ANY of these happen:
- New order placed
- Order matched (trade)
- Order cancelled

The order book changes. You broadcast this change via **WebSocket** to everyone watching that market. That's why the numbers on an exchange update in real-time — someone somewhere just placed or cancelled an order.

```
  User A (browser)         Exchange Server
       │                        │
       │──── WebSocket ─────────│
       │                        │
       │                   Order placed by User B
       │                        │
       │◄── "Book updated" ─────│
       │
  UI updates instantly
```

---

## Summary of All Edge Cases

| Edge Case | Problem | Solution |
|---|---|---|
| Insufficient balance | User can't pay | Validate before accepting order |
| Empty order book | No one to trade with | Reject market orders, queue limit orders |
| Self-trade | User trades with themselves | Check buyer ≠ seller before matching |
| Price improvement | Buyer overpays | Always execute at resting order's price |
| Duplicate orders | Double spend | Idempotency keys |
| Race condition | Two buyers, one seller | Queue / atomic DB transactions |
| Time-In-Force | Order sitting forever | GTC / IOC / FOK rules |
| Invalid input | Garbage data crashes engine | Validate everything at the door |
| DB crash mid-trade | User loses money | ACID transactions (all or nothing) |
| Partial fill | Amounts don't match exactly | Split orders, track remaining amount |

---

Next: Once this is clear, we will design the **database schema** — every concept above (wallet, order, trade, lock) maps to exactly one table.