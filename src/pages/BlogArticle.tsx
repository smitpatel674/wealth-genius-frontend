import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Helmet } from 'react-helmet-async';
import { Calendar, User, Clock, ArrowLeft, Share2, BookOpen, CheckCircle, TrendingUp } from 'lucide-react';

const BlogArticle = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const articleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.article-hero', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );

      gsap.fromTo('.article-content', 
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          delay: 0.3,
          scrollTrigger: {
            trigger: '.article-content',
            start: "top 90%",
          }
        }
      );
    }, articleRef);

    return () => ctx.revert();
  }, []);

  // Sample article data - in real app, this would come from API/CMS
  const getArticleData = (slug: string) => {
    const articles = {
      'the-ultimate-guide-to-technical-analysis-in-2025': {
        title: "The Ultimate Guide to Technical Analysis in 2025",
        metaDescription: "Master technical analysis with our comprehensive 2025 guide. Learn chart patterns, indicators, support/resistance levels, and professional trading strategies used by experts.",
        keywords: "technical analysis, chart patterns, trading indicators, support resistance, MACD, RSI, candlestick patterns, trend analysis, stock market",
        author: "Michael Davis",
        authorBio: "Senior Technical Analyst with 15+ years of experience in Indian and global markets. Former Goldman Sachs analyst and certified CMT.",
        date: "January 15, 2025",
        readTime: "25 min read",
        category: "Technical Analysis",
        image: "/images/technical-analysis-guide.jpg",
        excerpt: "Master the art of reading charts and identifying profitable trading opportunities with modern technical analysis techniques used by professional traders.",
        content: {
          introduction: "Technical analysis is the cornerstone of successful trading in 2025. This comprehensive guide will transform you from a beginner chart reader into a professional-level technical analyst capable of identifying high-probability trading setups across all market conditions. Whether you're trading Indian stocks, futures, or global markets, these time-tested principles will give you a significant edge.",
          tableOfContents: [
            "Foundation of Technical Analysis",
            "Understanding Price Action and Market Psychology", 
            "Support and Resistance Mastery",
            "Chart Pattern Recognition",
            "Technical Indicators Deep Dive",
            "Volume Analysis Techniques",
            "Multi-Timeframe Analysis",
            "Risk Management Integration",
            "Advanced Trading Strategies",
            "Real Market Examples"
          ],
          chapters: [
            {
              id: "foundation",
              title: "Chapter 1: Foundation of Technical Analysis",
              content: `Technical analysis is based on three fundamental principles that have remained constant throughout market history. Understanding these principles is crucial for developing a systematic approach to market analysis.

**Principle 1: Market Action Discounts Everything**

The first principle states that all available information is already reflected in the current price. This includes:

• Fundamental factors (earnings, revenue, economic data)
• Political events and government policies  
• Market sentiment and investor psychology
• Supply and demand dynamics
• Future expectations and market forecasts

This principle is particularly relevant in the Indian market where retail sentiment can create significant price movements. For example, when Reliance Industries announces quarterly results, the market's reaction is often already factored into the price through institutional buying or selling in the days leading up to the announcement.

**Principle 2: Price Moves in Trends**

The second principle recognizes that prices move in identifiable trends rather than random patterns. These trends can be:

• **Primary Trends**: Major movements lasting 6 months to several years
• **Secondary Trends**: Corrections against the primary trend lasting weeks to months  
• **Minor Trends**: Short-term fluctuations lasting days to weeks

Understanding trend structure is essential for Indian traders, especially given the influence of foreign institutional investors (FIIs) and domestic institutional investors (DIIs) on market direction.

**Principle 3: History Repeats Itself**

The third principle is based on market psychology. Human emotions of fear and greed create repetitive patterns in price charts. These patterns occur because:

• Investor psychology remains consistent over time
• Similar market conditions create similar reactions
• Crowd behavior follows predictable patterns
• Fear and greed cycles repeat throughout market history

This is evident in Indian markets during events like budget announcements, election results, or major policy changes where historical price patterns often provide valuable insights.`,
              keyPoints: [
                "All information is reflected in current price action",
                "Trends provide the framework for trading decisions",
                "Historical patterns repeat due to consistent human psychology",
                "Indian markets show clear trend characteristics influenced by institutional flows",
                "Price action reveals the true sentiment behind market movements"
              ]
            },
            {
              id: "price-action",
              title: "Chapter 2: Understanding Price Action and Market Psychology",
              content: `Price action is the purest form of market analysis. It involves studying raw price movements without the filter of indicators or oscillators. Mastering price action gives you direct insight into market sentiment and institutional behavior.

**Reading Candlestick Patterns**

Candlestick analysis originated in Japan and provides detailed information about market sentiment within specific time periods. Each candlestick tells a complete story:

• **Body**: Represents the range between opening and closing prices
• **Wicks/Shadows**: Show the high and low prices during the period
• **Color**: Green/white for bullish, red/black for bearish movements

**Key Candlestick Patterns for Indian Markets:**

**1. Doji Patterns**
A doji occurs when opening and closing prices are nearly equal, indicating market indecision. In Indian markets, doji patterns often appear:
- Before major announcements (RBI policy, budget)
- At significant support/resistance levels
- During consolidation phases before breakouts

**2. Hammer and Hanging Man**
These patterns have small bodies with long lower wicks, indicating:
- Rejection of lower prices (bullish hammer at support)
- Potential reversal signals (hanging man at resistance)
- Strong support levels where buyers emerged

**3. Engulfing Patterns**
Bullish engulfing occurs when a large green candle completely engulfs the previous red candle, suggesting:
- Strong buying pressure overcoming selling
- Potential trend reversal or continuation
- Institutional accumulation patterns

**Market Psychology in Action**

Understanding the emotions behind price movements is crucial:

**Fear Phase Characteristics:**
- Increased volatility with sudden price drops
- High volume selling pressure
- News becomes increasingly negative
- Retail investors panic and sell at lows

**Greed Phase Characteristics:**  
- Euphoric buying with prices rising rapidly
- Volume increases on upward movements
- Positive news dominates headlines
- Retail FOMO (fear of missing out) drives prices higher

**Example: COVID-19 Market Crash and Recovery (2020)**

The Indian market crash in March 2020 perfectly illustrated these psychological phases:

1. **Denial Phase** (February 2020): Market ignored early COVID warnings
2. **Fear Phase** (March 2020): Panic selling drove NIFTY from 12,000 to 7,500
3. **Capitulation** (March 23, 2020): Maximum pessimism at market lows
4. **Recovery Phase** (April-May 2020): Institutional buying began
5. **Greed Phase** (2021): Retail participation surged to record levels`,
              practicalTips: [
                "Focus on larger timeframe candlesticks for more reliable signals",
                "Combine candlestick patterns with volume analysis",
                "Watch for patterns at key support/resistance levels",
                "Indian markets often show clear patterns during specific time periods (opening, closing)",
                "Use multiple candlestick patterns together for higher probability setups"
              ]
            },
            {
              id: "support-resistance",
              title: "Chapter 3: Support and Resistance Mastery",
              content: `Support and resistance levels are the foundation of technical analysis. These levels represent areas where buying or selling pressure has historically emerged, creating predictable price behavior patterns.

**Understanding Support Levels**

Support is a price level where buying interest is sufficiently strong to overcome selling pressure. Key characteristics include:

• **Psychological Support**: Round numbers like ₹100, ₹500, ₹1000
• **Historical Support**: Previous low points that held multiple times  
• **Moving Average Support**: Dynamic levels that adjust with price trends
• **Fibonacci Support**: Mathematical levels based on key ratios

**Identifying Resistance Levels**

Resistance represents areas where selling pressure overcomes buying interest:

• **Previous Highs**: Price levels where selling emerged previously
• **Gap Levels**: Unfilled price gaps that act as magnetic levels
• **Trend Line Resistance**: Diagonal levels connecting swing highs
• **Volume Profile**: High volume areas that create supply zones

**Dynamic vs Static Levels**

**Static Support/Resistance:**
- Horizontal levels that don't change with time
- Previous swing highs and lows
- Psychological round numbers
- Gap fill levels from previous sessions

**Dynamic Support/Resistance:**  
- Levels that move with price action
- Moving averages (20, 50, 200 EMA)
- Trend lines and channels
- Bollinger Bands boundaries

**Advanced Techniques for Indian Markets**

**1. Multiple Timeframe Analysis**
- Daily charts for major levels
- 4-hour charts for intermediate levels  
- 1-hour charts for precise entries
- 15-minute charts for execution timing

**2. Volume Confirmation**
Strong support/resistance levels show:
- High volume at the level historically
- Volume spikes during tests of the level
- Decreased volume on approaches to the level
- Volume expansion on breakouts

**3. Role Reversal Principle**
Once broken, support becomes resistance and vice versa:
- Previous support level becomes new resistance after breakdown
- Previous resistance becomes new support after breakout
- The more significant the original level, the stronger the role reversal

**Real Market Examples from Indian Stocks**

**RELIANCE INDUSTRIES Example:**
During 2023, Reliance showed clear support at ₹2,200 level:
- Multiple tests with high volume rejection
- Each test showed buying interest emergence
- Final breakout above ₹2,500 resistance led to sustained rally
- ₹2,500 resistance became new support after breakout

**HDFC BANK Example:**
HDFC Bank demonstrated classic resistance behavior at ₹1,700:
- Failed to break above this level multiple times in 2022
- Each approach showed selling pressure
- Volume decreased as price approached resistance
- Eventually broke through with high volume confirmation

**Trading Strategies Using Support/Resistance**

**Strategy 1: Bounce Trading**
- Buy at identified support levels with tight stops
- Sell at resistance levels or take partial profits
- Risk-reward ratio typically 1:2 or better
- Works best in ranging markets

**Strategy 2: Breakout Trading**  
- Enter positions when price breaks through key levels
- Confirm with volume expansion
- Target previous significant levels
- Use breakout level as new support/resistance

**Strategy 3: Range Trading**
- Identify clear support and resistance boundaries
- Buy near support, sell near resistance
- Use oscillators for entry timing
- Exit if range breaks decisively`,
              tradingRules: [
                "Always confirm support/resistance with volume analysis",
                "Use multiple touches to validate level significance", 
                "Place stops beyond the level, not exactly at it",
                "Higher timeframe levels are more significant",
                "Watch for false breakouts and traps at key levels"
              ]
            }
          ]
        }
      },
      '5-risk-management-rules-every-trader-must-follow': {
        title: "5 Risk Management Rules Every Trader Must Follow",
        metaDescription: "Learn the 5 essential risk management rules that separate successful traders from losers. Master position sizing, stop-loss strategies, and capital preservation techniques.",
        keywords: "risk management, position sizing, stop loss, trading rules, capital preservation, money management, trading psychology",
        author: "Sarah Kim",
        authorBio: "Professional Risk Management Specialist with 12+ years experience in institutional trading and portfolio management.",
        date: "January 12, 2025", 
        readTime: "18 min read",
        category: "Risk Management",
        image: "/images/risk-management-guide.jpg",
        excerpt: "Discover the essential risk management principles that separate successful traders from those who lose money consistently.",
        content: {
          introduction: "Risk management is the cornerstone of successful trading. These 5 rules will protect your capital and ensure long-term profitability.",
          tableOfContents: ["The 2% Rule", "Stop Loss Strategies", "Position Sizing", "Risk-Reward Ratios", "Portfolio Diversification"],
          chapters: []
        }
      }
    };

    return articles[slug as keyof typeof articles] || null;
  };

  const article = getArticleData(slug || '');

  // Debug logging
  console.log('Current slug:', slug);
  console.log('Article found:', !!article);
  console.log('Available article keys:', Object.keys({
    'the-ultimate-guide-to-technical-analysis-in-2025': {},
    '5-risk-management-rules-every-trader-must-follow': {}
  }));
  
  if (article) {
    console.log('Article title:', article.title);
    console.log('Article has content:', !!article.content);
    console.log('Article has chapters:', article.content?.chapters?.length || 0);
  }

  if (!article) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Article Not Found</h1>
          <button 
            onClick={() => navigate('/blog')}
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            ← Return to Blog
          </button>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.metaDescription,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Article URL copied to clipboard!');
    }
  };

  return (
    <>
      <Helmet>
        <title>{article.title} | Wealth Genius - Professional Trading Education</title>
        <meta name="description" content={article.metaDescription} />
        <meta name="keywords" content={article.keywords} />
        <meta name="author" content={article.author} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:image" content={article.image || '/images/default-blog.jpg'} />
        <meta property="article:author" content={article.author} />
        <meta property="article:published_time" content={article.date} />
        <meta property="article:section" content={article.category} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.metaDescription} />
        <meta name="twitter:image" content={article.image || '/images/default-blog.jpg'} />
        <link rel="canonical" href={window.location.href} />
        
        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": article.title,
            "description": article.metaDescription,
            "author": {
              "@type": "Person",
              "name": article.author,
              "description": article.authorBio || "Professional trading expert"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Wealth Genius",
              "logo": {
                "@type": "ImageObject",
                "url": "https://wealthgenius.com/logo.png"
              }
            },
            "datePublished": article.date,
            "dateModified": article.date,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": window.location.href
            },
            "image": article.image || '/images/default-blog.jpg',
            "articleSection": article.category,
            "keywords": article.keywords
          })}
        </script>
      </Helmet>

      <div ref={articleRef} className="pt-20 min-h-screen bg-white">
        {/* Article Header */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="article-hero">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <button
                onClick={() => navigate('/blog')}
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </button>
            </nav>

            {/* Category Badge */}
            <div className="mb-4">
              <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                {article.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              {article.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {article.excerpt || article.metaDescription}
            </p>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center justify-between border-b border-gray-200 pb-8 mb-8">
              <div className="flex items-center space-x-6 text-gray-600">
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  <span className="font-medium">{article.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>{article.readTime}</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  <span>Professional Guide</span>
                </div>
              </div>
              
              <button
                onClick={handleShare}
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Share2 className="h-5 w-5 mr-2" />
                Share Article
              </button>
            </div>
          </div>

          {/* Table of Contents */}
          {article.content?.tableOfContents && (
            <div className="article-content bg-gray-50 p-6 rounded-lg mb-12">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <BookOpen className="h-6 w-6 mr-2 text-blue-600" />
                Table of Contents
              </h2>
              <ol className="list-decimal list-inside space-y-2">
                {article.content?.tableOfContents.map((item: string, index: number) => (
                  <li key={index} className="text-gray-700 hover:text-blue-600 cursor-pointer transition-colors">
                    {item}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Article Content */}
          <div className="article-content prose prose-lg max-w-none">
            {/* Introduction */}
            <div className="mb-12">
              <p className="text-lg leading-relaxed text-gray-700 font-medium">
                {article.content?.introduction}
              </p>
            </div>

            {/* Chapters */}
            {article.content?.chapters && article.content.chapters.length > 0 ? (
              article.content.chapters.map((chapter: any, index: number) => (
                <section key={chapter.id || index} className="mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 border-l-4 border-blue-500 pl-4">
                    {chapter.title}
                  </h2>
                  
                  <div className="prose prose-lg max-w-none">
                    {chapter.content && chapter.content.split('\n\n').map((paragraph: string, pIndex: number) => {
                      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                        return (
                          <h3 key={pIndex} className="text-xl font-bold text-gray-800 mt-8 mb-4">
                            {paragraph.replace(/\*\*/g, '')}
                          </h3>
                        );
                      }
                      
                      if (paragraph.startsWith('•')) {
                        const items = paragraph.split('\n');
                        return (
                          <ul key={pIndex} className="space-y-2 mb-6">
                            {items.map((item: string, iIndex: number) => (
                              <li key={iIndex} className="flex items-start">
                                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">{item.replace('• ', '')}</span>
                              </li>
                            ))}
                          </ul>
                        );
                      }
                      
                      return (
                        <p key={pIndex} className="text-gray-700 leading-relaxed mb-6">
                          {paragraph}
                        </p>
                      );
                    })}
                  </div>

                  {/* Key Points */}
                  {chapter.keyPoints && (
                    <div className="bg-blue-50 p-6 rounded-lg mt-8">
                      <h4 className="text-lg font-bold text-blue-800 mb-4">Key Takeaways:</h4>
                      <ul className="space-y-2">
                        {chapter.keyPoints.map((point: string, pointIndex: number) => (
                          <li key={pointIndex} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-blue-700">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Practical Tips */}
                  {chapter.practicalTips && (
                    <div className="bg-green-50 p-6 rounded-lg mt-8">
                      <h4 className="text-lg font-bold text-green-800 mb-4">Practical Tips:</h4>
                      <ul className="space-y-2">
                        {chapter.practicalTips.map((tip: string, tipIndex: number) => (
                          <li key={tipIndex} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-green-700">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Trading Rules */}
                  {chapter.tradingRules && (
                    <div className="bg-yellow-50 p-6 rounded-lg mt-8">
                      <h4 className="text-lg font-bold text-yellow-800 mb-4">Essential Trading Rules:</h4>
                      <ul className="space-y-2">
                        {chapter.tradingRules.map((rule: string, ruleIndex: number) => (
                          <li key={ruleIndex} className="flex items-start">
                            <TrendingUp className="h-5 w-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-yellow-700">{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </section>
              ))
            ) : (
              /* Fallback content when no chapters are available */
              <div className="space-y-8">
                <section className="mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 border-l-4 border-blue-500 pl-4">
                    Complete Trading Guide Content
                  </h2>
                  
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-6">
                      This comprehensive guide provides detailed insights into professional trading strategies, 
                      risk management techniques, and market analysis methods used by successful traders.
                    </p>
                    
                    <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">What You'll Learn</h3>
                    
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Advanced technical analysis techniques</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Professional risk management strategies</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Market psychology and behavioral analysis</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Real-world trading examples and case studies</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Portfolio construction and diversification</span>
                      </li>
                    </ul>
                    
                    <p className="text-gray-700 leading-relaxed mb-6">
                      Our expert-authored content is designed to help both beginner and experienced traders 
                      improve their skills and achieve consistent profitability in the markets.
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 p-6 rounded-lg mt-8">
                    <h4 className="text-lg font-bold text-blue-800 mb-4">Professional Insights:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-blue-700">Based on 15+ years of trading experience</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-blue-700">Tested strategies with proven track records</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-blue-700">Updated for current market conditions</span>
                      </li>
                    </ul>
                  </div>
                </section>
              </div>
            )}

            {/* Author Bio */}
            <div className="bg-gray-100 p-8 rounded-lg mt-16">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">About the Author</h3>
              <div className="flex items-start">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-800">{article.author}</h4>
                  <p className="text-gray-600 mt-2">{article.authorBio || 'Professional trading expert and educator'}</p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-blue-600 text-white p-8 rounded-lg mt-16 text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Master Technical Analysis?</h3>
              <p className="text-blue-100 mb-6">
                Join our comprehensive trading course and learn from professional traders with proven track records.
              </p>
              <button 
                onClick={() => navigate('/courses')}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors"
              >
                Explore Our Courses
              </button>
            </div>
          </div>
        </article>
      </div>
    </>
  );
};

export default BlogArticle;