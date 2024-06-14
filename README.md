## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Engineering Process: On Design and Other things

I've been tasked to build an auction website or [DEX](https://bitcoinwiki.org/wiki/) (Decentralized Exchange) for sfcomupte. The task was intentionally vague, with a focus for design engineering.

From my understanding, there's subtle functional differences between auctions and DEXs. An auction is more like a marketplace, where users buy the stuff they want. DEXs serve purposes beyond marketplace — they establish pricing based on buy and sell orders. Assuming sfcompute believed in [commoditizing compute](https://evanjconrad.com/posts/commodities-pricing-assets), I went for the DEX route.

Thus,
1) There had to be an [order book](https://en.wikipedia.org/wiki/Order_book) to keep track of buy and sell orders
2) Users could fill out those orders

Creating these components weren't creatively difficult — [Binance](https://www.binance.com/en/trade/BTC_USDT?_from=markets&type=grid) and [Pheonix](https://app.phoenix.trade/market/4DoNfFBfF7UokCC2FQzriy7yHK6DY6NVdYpuekQ5pRgg) had very good UI/UX for DEXs.

The hard part was creating an aesthetic. Modern website design feels so monotonous — your typical B2B SaaS was flatly styled and had no flavor.

I did some reserach, and gathered design inspirations and best practicies:
- https://mmm.page/
- sfcompute.com (the slider bar and the overall contrast aesthetic)
- [noah solomon](https://brainrotjs.com/)
- https://web.dev/articles/cls

I want to also share this article on [Design Advice for Programmers](https://evanjconrad.com/posts/design-advice) written by Evan Conrad. I found it particularly useful in how I approached this project. The word "contrast" was a perfect analogy I used to piece together each design decision, and this contrast is also demonstrated nicely on the sfcompute page.


I set out to build my first component. There was no Figma involved, but a rough sketch in my notebook sufficed. I was taking the tweak-as-you-build strategy, and grueling over forgetten CSS knowledge

![](/images/sketch1.png)
![](/images/sketch2.png)

I liked the slider on [sfcompute.com](sfcompute.com), so I made my own slider very similar to that one. I used nextUI and tailwind components for everything, but had spend a lot of time customizing everything.

![](/images/init.png)

And so I finished an unrefined order form on the first day. Before this I actually spent 2 hours on friday building the backend. That didn't work and I scrapped that. A frontend-first approach was better suited for this take-home.

Here are some improvements that I made:

![](/images/improvements.png)

it’s hard to build componenets without a designer or having someone to consult on with ideas.

![](/images/better-table.png)
![](/images/even-better-table.png)

3 days have passed and I realized that I might have built the wrong thing.

An orderbook optimizes for trading and not for actual use of the commodity. the reason why someone would want to purchase compute is because they need it for training, and aren’t trying to immediately trade away their compute away. Although I planned for “compute” actually becoming a commodity, people aren't trading “compute”, at least not yet. 

One way we can accelerate into this future would be to employ decentralization. The easiest way to do that is to distribute compute tokens that become tradeable immediately, and be tender for "compute" (Disclaimer: I have no crypto bg). Regardless of how we envision this future, I don’t think sfcompute is trying to go down the trading/crypto/regulatory route. Their priority is to deliver real value to researchers who cannot afford cheap and quality compute. I might have fucked up here.

![](/images/marketprice.png)

nice I added a marketprice

Thoughts on reducing friction. If a user looks at a table they have to look down the middle, then look at the left align for the range component, but they shouldln’t have so many friction steps in their head. It's the designer's job to eliminate that.

user looks -> user must look down range -> user must then look left -> user then must laign the ranges -> user depicts 07 to July -> user discovers meaning

Let's try cutting the mental friction:

![](/images/tooltip.png)

This is much better but for many ppl mentally translating 07 to “July” also poses another friction. Information needs to travel fast, and design helps convey that information efficiently. The orderbook table looks very cluttered in my opinion, but i’ll settle for this now. Not sure if users want to stay on this platform and learn the UX, which would make a more informative table better. Otherwise I should aggresively cut features.

When deciding which features to cut, we should decide the purpose of this application. Are users going to find more value in trading the unit costs of “compute” or would they be more interested in the actual renting? If it's unit costs, then we can remove the range, otherwise, if renting was a priority then the unit cost isn’t as important and we’d put that in the additional tooltip section. These need to be discovered — and I'm willing to do that.

My buddy [@fiveoutofnine](https://x.com/fiveoutofnine/status/1777431614424817756) also talks about how for programmers can use certain colors for certain functionality. I found this very helpful, and maybe you would too.

![](/images/put-together.png)

nice looking good so far. Putting it all together ->

![](/images/currently.png)

And that's what I currently have.


<!-- ## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details. -->
