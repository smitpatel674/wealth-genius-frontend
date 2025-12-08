import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, User, ArrowRight, TrendingUp, BarChart, PieChart, Clock, X, CheckCircle } from 'lucide-react';

const Blog = () => {
  const blogRef = useRef(null);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All Posts');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.blog-hero', 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );

      gsap.fromTo('.blog-post', 
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.6,
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.blog-grid',
            start: "top 80%",
          }
        }
      );
    }, blogRef);

    return () => ctx.revert();
  }, []);

  const featuredPost = {
    title: "The Ultimate Guide to Technical Analysis in 2025",
    excerpt: "Master the art of reading charts and identifying profitable trading opportunities with modern technical analysis techniques. Learn the complete framework used by professional traders to analyze price action, volume patterns, and market sentiment indicators.",
    fullContent: {
      introduction: "Technical analysis is the study of price action and market behavior to predict future price movements. In 2025, technical analysis has evolved with new tools and indicators, but the core principles remain unchanged. This comprehensive guide will transform you from a beginner chart reader into a professional-level technical analyst capable of identifying high-probability trading setups across all market conditions.",
      chapter1: {
        title: "Chapter 1: Foundation of Technical Analysis",
        sections: [
          {
            title: "Understanding Price Action",
            content: "Price action is the language of the market. Every tick on the chart tells a story of supply and demand dynamics. Professional traders read this language fluently, understanding what each candlestick, pattern, and movement signifies.",
            keyPoints: [
              "Price reflects all available information at any given moment",
              "Market sentiment drives price movements more than fundamentals",
              "Historical price patterns tend to repeat due to human psychology",
              "Volume confirms the validity of price movements",
              "Time frames create different perspectives of the same story"
            ],
            practicalExample: "When you see a stock making higher highs and higher lows on increasing volume, it indicates strong bullish sentiment. Conversely, lower highs and lower lows on increasing volume suggest bearish momentum."
          },
          {
            title: "Chart Types and Their Applications",
            content: "Different chart types reveal different aspects of market behavior. Understanding when to use each type is crucial for effective analysis.",
            chartTypes: [
              {
                type: "Candlestick Charts",
                description: "Most popular among traders, showing open, high, low, close prices",
                bestFor: "Pattern recognition, sentiment analysis, entry/exit timing",
                tradingTip: "Focus on candlestick bodies for trend strength, shadows for support/resistance"
              },
              {
                type: "Line Charts",
                description: "Simple line connecting closing prices over time",
                bestFor: "Long-term trend identification, reducing market noise",
                tradingTip: "Use for initial trend assessment before switching to candlesticks"
              },
              {
                type: "Volume Charts",
                description: "Shows trading volume at different price levels",
                bestFor: "Identifying accumulation/distribution zones",
                tradingTip: "High volume at support/resistance levels indicates strong conviction"
              }
            ]
          }
        ]
      },
      chapter2: {
        title: "Chapter 2: Support and Resistance Mastery",
        sections: [
          {
            title: "Dynamic vs Static Support and Resistance",
            content: "Understanding the difference between static horizontal levels and dynamic trending levels is fundamental to professional trading.",
            staticLevels: {
              definition: "Horizontal price levels where buying or selling interest has historically emerged",
              identification: [
                "Previous swing highs and lows",
                "Round psychological numbers (₹100, ₹500, ₹1000)",
                "Gap fill levels from previous sessions",
                "Previous day/week/month open/close levels",
                "Fibonacci retracement levels"
              ],
              tradingRules: [
                "Price approaching from below: Resistance until broken",
                "Price approaching from above: Support until broken",
                "Once broken, resistance becomes support and vice versa",
                "Multiple touches increase level significance",
                "Higher timeframe levels are more significant"
              ]
            },
            dynamicLevels: {
              definition: "Moving levels that change with price action, typically trend lines and moving averages",
              types: [
                "Ascending trend lines in uptrends",
                "Descending trend lines in downtrends",
                "Moving averages (20, 50, 200 EMA)",
                "Bollinger Bands upper and lower boundaries",
                "Parabolic SAR dots"
              ],
              advanced: [
                "Channel trading: Price bouncing between parallel trend lines",
                "Moving average confluence: Multiple MAs acting as support/resistance",
                "Fibonacci fan lines: Dynamic levels based on Fibonacci ratios",
                "Speed resistance lines: Trend lines drawn from significant highs/lows"
              ]
            }
          }
        ]
      },
      chapter3: {
        title: "Chapter 3: Advanced Chart Patterns",
        sections: [
          {
            title: "Reversal Patterns: Spotting Market Turning Points",
            content: "Reversal patterns signal potential changes in trend direction. Mastering these patterns gives you early entry into new trends.",
            patterns: [
              {
                name: "Head and Shoulders",
                description: "Most reliable reversal pattern in technical analysis",
                structure: "Left shoulder (peak) → Head (higher peak) → Right shoulder (similar to left)",
                confirmation: "Break below neckline with increased volume",
                target: "Distance from head to neckline projected downward",
                indianExample: "Reliance Industries showed perfect H&S pattern in 2008 before major decline",
                tradingStrategy: [
                  "Enter short on neckline break",
                  "Stop loss above right shoulder",
                  "Target 1: Neckline to head distance",
                  "Target 2: 1.618 Fibonacci extension"
                ]
              },
              {
                name: "Double Top/Bottom",
                description: "Second most reliable reversal pattern",
                structure: "Two peaks at similar levels (top) or two troughs (bottom)",
                confirmation: "Break of middle support/resistance with volume",
                target: "Height of pattern projected in reversal direction",
                indianExample: "HDFC Bank double bottom in March 2020 led to strong rally",
                tradingStrategy: [
                  "Enter on pattern completion",
                  "Stop beyond second peak/trough",
                  "Partial profits at 50% target",
                  "Full target at pattern height"
                ]
              }
            ]
          },
          {
            title: "Continuation Patterns: Trading with the Trend",
            content: "Continuation patterns occur during trend pauses and signal trend resumption. These offer excellent risk-reward opportunities.",
            patterns: [
              {
                name: "Bull/Bear Flags",
                description: "Short-term consolidation against the main trend",
                bullFlag: "Strong rally followed by slight downward consolidation",
                bearFlag: "Strong decline followed by slight upward consolidation",
                entry: "Break of flag boundary in trend direction",
                target: "Flagpole height added to breakout point",
                timeframe: "Usually completes within 1-3 weeks",
                volume: "Decreases during flag formation, increases on breakout"
              },
              {
                name: "Triangles",
                description: "Converging trend lines creating triangle formations",
                types: [
                  "Ascending: Horizontal resistance, rising support (bullish)",
                  "Descending: Horizontal support, falling resistance (bearish)",
                  "Symmetrical: Converging support and resistance (neutral)"
                ],
                tradingRules: [
                  "Enter on breakout with volume confirmation",
                  "Target: Triangle height from breakout point",
                  "Stop loss: Opposite side of triangle",
                  "Volume should decrease during formation"
                ]
              }
            ]
          }
        ]
      },
      chapter4: {
        title: "Chapter 4: Technical Indicators Deep Dive",
        sections: [
          {
            title: "Moving Averages: The Foundation",
            content: "Moving averages smooth price action and help identify trends. Understanding different types and their applications is crucial.",
            types: [
              {
                name: "Simple Moving Average (SMA)",
                calculation: "Sum of closing prices divided by number of periods",
                characteristics: "Slower to react, less prone to false signals",
                bestUse: "Long-term trend identification, support/resistance levels",
                commonPeriods: "50-day, 100-day, 200-day for major trends"
              },
              {
                name: "Exponential Moving Average (EMA)",
                calculation: "Gives more weight to recent prices",
                characteristics: "Faster to react, more responsive to price changes",
                bestUse: "Short-term trading, quick trend changes",
                commonPeriods: "9, 12, 20, 26 for trading signals"
              }
            ],
            tradingStrategies: [
              {
                strategy: "Golden Cross",
                description: "50-day MA crosses above 200-day MA",
                signal: "Long-term bullish signal",
                example: "NIFTY 50 golden cross in April 2020 signaled major bull run"
              },
              {
                strategy: "Death Cross",
                description: "50-day MA crosses below 200-day MA",
                signal: "Long-term bearish signal",
                example: "Banking stocks death cross in March 2020 before major decline"
              },
              {
                strategy: "EMA Ribbon",
                description: "Multiple EMAs (8, 13, 21, 34, 55) creating ribbon effect",
                bullishSignal: "Shorter EMAs above longer EMAs, ribbon sloping up",
                bearishSignal: "Shorter EMAs below longer EMAs, ribbon sloping down"
              }
            ]
          },
          {
            title: "Momentum Oscillators",
            content: "Oscillators help identify overbought/oversold conditions and potential reversal points.",
            indicators: [
              {
                name: "Relative Strength Index (RSI)",
                formula: "RSI = 100 - (100 / (1 + RS)) where RS = Average Gain / Average Loss",
                interpretation: [
                  "Above 70: Overbought condition, potential selling opportunity",
                  "Below 30: Oversold condition, potential buying opportunity",
                  "50 level: Bullish above, bearish below",
                  "Divergences: Price vs RSI divergence signals reversal"
                ],
                advancedTechniques: [
                  "RSI Trend Line Analysis: Draw trend lines on RSI peaks/troughs",
                  "Hidden Divergences: Continuation signal validation",
                  "RSI Failure Swings: Reversal signals without extreme readings",
                  "Multiple Timeframe RSI: Confirm signals across timeframes"
                ]
              },
              {
                name: "MACD (Moving Average Convergence Divergence)",
                components: [
                  "MACD Line: 12 EMA - 26 EMA",
                  "Signal Line: 9 EMA of MACD Line",
                  "Histogram: MACD Line - Signal Line"
                ],
                signals: [
                  "Bullish Crossover: MACD crosses above Signal line",
                  "Bearish Crossover: MACD crosses below Signal line",
                  "Zero Line Cross: MACD crosses above/below zero",
                  "Divergences: Price vs MACD divergence patterns"
                ],
                tradingApplication: [
                  "Trend Following: Trade in direction of MACD zero line cross",
                  "Momentum Trading: Enter on signal line crossovers",
                  "Divergence Trading: Wait for price confirmation after divergence",
                  "Histogram Analysis: Momentum acceleration/deceleration"
                ]
              }
            ]
          }
        ]
      },
      chapter5: {
        title: "Chapter 5: Volume Analysis",
        content: "Volume is the fuel that drives price movements. Understanding volume patterns gives you insight into the strength behind price moves.",
        principles: [
          "Volume should increase in the direction of the trend",
          "High volume breakouts are more reliable than low volume ones",
          "Volume precedes price - accumulation/distribution shows before price moves",
          "Climax volume often marks temporary exhaustion points"
        ],
        patterns: [
          {
            name: "Volume Accumulation",
            description: "Gradually increasing volume during price consolidation",
            implication: "Smart money accumulating positions",
            tradingAction: "Prepare for breakout in direction of accumulation"
          },
          {
            name: "Volume Distribution",
            description: "High volume during price declines from highs",
            implication: "Smart money distributing to retail investors",
            tradingAction: "Avoid buying, consider short positions"
          },
          {
            name: "Climax Volume",
            description: "Extremely high volume spikes at trend extremes",
            implication: "Emotional buying/selling, often marks reversals",
            tradingAction: "Look for reversal signals, avoid chasing"
          }
        ]
      },
      riskManagement: {
        title: "Risk Management in Technical Analysis",
        principles: [
          "Every technical setup must have a predefined stop loss",
          "Risk no more than 2% of capital per trade",
          "Maintain minimum 1:2 risk-reward ratio",
          "Use position sizing based on stop loss distance",
          "Never ignore stop losses hoping for recovery"
        ],
        stopLossPlacement: [
          "Below support levels for long positions",
          "Above resistance levels for short positions",
          "Beyond pattern boundaries for pattern trades",
          "Below/above key moving averages",
          "At significant Fibonacci levels"
        ]
      },
      practicalSteps: [
        "Start analysis with higher timeframes (daily/weekly) for trend context",
        "Identify key support and resistance levels",
        "Look for chart pattern formations",
        "Confirm signals with multiple indicators",
        "Set stop-loss and profit targets before entry",
        "Execute trade with appropriate position size",
        "Monitor trade management and exit criteria",
        "Review and learn from each trade outcome"
      ],
      conclusion: "Technical analysis is a comprehensive skill that requires continuous learning and practice. Start with the basics, master one concept at a time, and gradually build your expertise. Remember, the goal is not to predict the future but to identify high-probability setups with favorable risk-reward ratios. Combine technical analysis with proper risk management for long-term success.",
      additionalResources: [
        "Practice on TradingView with paper trading",
        "Study historical charts of major Indian stocks",
        "Follow professional traders' chart analysis",
        "Join technical analysis communities and forums",
        "Read classic books: 'Technical Analysis of Financial Markets' by John Murphy"
      ]
    },
    author: "Michael Davis",
    date: "January 15, 2025",
    readTime: "25 min read",
    category: "Technical Analysis",
    image: "featured"
  };

  const blogPosts = [
    {
      title: "5 Risk Management Rules Every Trader Must Follow",
      excerpt: "Discover the essential risk management principles that separate successful traders from those who lose money. Learn position sizing, stop-loss strategies, and capital preservation techniques used by professional traders.",
      fullContent: {
        introduction: "Risk management is the cornerstone of successful trading. While many traders focus on finding winning trades, the professionals know that managing losses is what creates long-term profitability.",
        mainPoints: [
          {
            title: "Rule 1: Never Risk More Than 2% Per Trade",
            content: "The 2% rule is fundamental - never risk more than 2% of your total capital on a single trade. This ensures you can survive 50 consecutive losses and still have capital to trade with.",
            example: "If you have ₹1,00,000 capital, risk only ₹2,000 per trade maximum."
          },
          {
            title: "Rule 2: Use Stop-Loss Orders Always",
            content: "Every trade must have a predetermined exit point. Set your stop-loss before entering the trade, not after the market moves against you.",
            example: "If buying a stock at ₹100, set stop-loss at ₹95 (5% risk) before clicking buy."
          },
          {
            title: "Rule 3: Maintain Risk-Reward Ratio of 1:2 Minimum",
            content: "For every rupee you risk, aim to make at least two rupees. This allows you to be profitable even with a 40% win rate.",
            example: "Risk ₹5 per share, target ₹10 profit per share minimum."
          },
          {
            title: "Rule 4: Diversify Across Sectors",
            content: "Don't put all your capital in one sector. Spread risk across different industries to protect against sector-specific downturns.",
            example: "Instead of 5 banking stocks, choose 1 banking, 1 IT, 1 pharma, 1 FMCG, 1 auto stock."
          },
          {
            title: "Rule 5: Keep Detailed Trading Records",
            content: "Track every trade with entry/exit prices, reasons, and lessons learned. This helps identify and correct mistakes.",
            example: "Maintain a trading journal with date, stock, entry/exit, P&L, and notes for every trade."
          }
        ],
        conclusion: "Following these risk management rules religiously will protect your capital and give you the longevity needed to become a consistently profitable trader.",
        keyTakeaways: [
          "Limit risk to 2% per trade maximum",
          "Always use stop-loss orders",
          "Maintain 1:2 risk-reward ratio",
          "Diversify across sectors",
          "Keep detailed trading records"
        ]
      },
      author: "Sarah Kim",
      date: "January 12, 2025",
      readTime: "8 min read",
      category: "Risk Management",
      icon: <PieChart className="h-6 w-6" />
    },
    {
      title: "How to Build a Diversified Trading Portfolio",
      excerpt: "Learn professional portfolio construction techniques used by institutional traders. Master asset allocation, sector diversification, and correlation analysis to maximize returns while minimizing risk.",
      fullContent: {
        introduction: "Portfolio diversification is the practice of spreading investments across various assets to reduce risk while maintaining potential for returns. Professional traders use systematic approaches to build portfolios that can weather market volatility.",
        mainPoints: [
          {
            title: "Asset Allocation Framework",
            content: "The foundation of any diversified portfolio starts with proper asset allocation across different asset classes.",
            breakdown: [
              "Equities (50-70%): Growth potential with higher volatility",
              "Fixed Income (20-30%): Stability and regular income",
              "Commodities (5-10%): Inflation hedge and portfolio balance",
              "Cash (5-15%): Liquidity and opportunity fund"
            ]
          },
          {
            title: "Sector Diversification Strategy",
            content: "Spread investments across different sectors to avoid concentration risk.",
            sectors: [
              "Technology: Growth potential but cyclical",
              "Healthcare: Defensive with steady growth",
              "Financial Services: Interest rate sensitive",
              "Consumer Goods: Stable demand patterns",
              "Energy: Commodity price dependent",
              "Utilities: Defensive income generators"
            ]
          },
          {
            title: "Geographic Diversification",
            content: "Reduce country-specific risks by investing across different markets.",
            regions: [
              "Domestic Markets (60-70%): Home market advantage",
              "Developed Markets (20-25%): Stability and liquidity",
              "Emerging Markets (10-15%): Growth potential with higher risk"
            ]
          },
          {
            title: "Correlation Analysis",
            content: "Understanding how different assets move in relation to each other is crucial for effective diversification.",
            correlations: [
              "Low Correlation (0 to 0.3): Ideal for diversification",
              "Moderate Correlation (0.3 to 0.7): Some diversification benefit",
              "High Correlation (0.7 to 1.0): Limited diversification benefit"
            ]
          }
        ],
        practicalSteps: [
          "Assess your risk tolerance and investment timeline",
          "Determine target asset allocation percentages",
          "Select specific sectors for equity allocation",
          "Choose individual securities within each sector",
          "Monitor correlations and rebalance quarterly",
          "Review and adjust allocation annually"
        ],
        riskConsiderations: [
          "Over-diversification can limit returns",
          "Correlations increase during market stress",
          "Regular rebalancing is essential",
          "Consider tax implications of rebalancing"
        ]
      },
      author: "James Rodriguez",
      date: "January 10, 2025",
      readTime: "10 min read",
      category: "Portfolio Management",
      icon: <BarChart className="h-6 w-6" />
    },
    {
      title: "Options Trading: Weekly vs Monthly Strategies",
      excerpt: "Master the differences between weekly and monthly options strategies. Learn when to use each approach, profit maximization techniques, and risk management specific to options trading timeframes.",
      fullContent: {
        introduction: "Options trading offers flexibility in timeframes, with weekly and monthly options each serving different strategic purposes. Understanding when and how to use each can significantly impact your trading success.",
        weeklyOptions: {
          title: "Weekly Options Strategies",
          characteristics: [
            "High time decay (theta): Options lose value rapidly",
            "Lower premium cost: Cheaper entry but higher risk",
            "Quick profit potential: Fast moves can generate quick profits",
            "Higher gamma risk: Price changes accelerate near expiration"
          ],
          bestStrategies: [
            "Iron Condors: Profit from low volatility in range-bound markets",
            "Short Straddles: Profit when stock stays near current price",
            "Calendar Spreads: Benefit from time decay differences",
            "Covered Calls: Generate weekly income on existing positions"
          ],
          whenToUse: [
            "Earnings announcements (sell premium before)",
            "Range-bound markets with low expected movement",
            "High implied volatility situations",
            "Short-term directional plays with strong conviction"
          ]
        },
        monthlyOptions: {
          title: "Monthly Options Strategies",
          characteristics: [
            "Slower time decay: More time for thesis to play out",
            "Higher premium cost: More expensive but more time value",
            "Lower gamma risk: Less sensitive to small price changes",
            "More liquid: Better bid-ask spreads and volume"
          ],
          bestStrategies: [
            "Long Calls/Puts: Directional plays with time to develop",
            "Protective Puts: Portfolio insurance for longer periods",
            "Bull/Bear Spreads: Limited risk directional strategies",
            "Long Straddles: Profit from large moves in either direction"
          ],
          whenToUse: [
            "Swing trading with 2-4 week timeframes",
            "Before major events with uncertain timing",
            "Portfolio hedging strategies",
            "Trends expected to develop over weeks"
          ]
        },
        riskManagement: {
          title: "Risk Management by Timeframe",
          weeklyRisks: [
            "Set profit targets at 25-50% of premium received",
            "Close positions 1-2 days before expiration",
            "Never hold through earnings unless specifically planned",
            "Monitor gamma risk closely on Friday afternoons"
          ],
          monthlyRisks: [
            "Set stop-losses at 2x premium paid for long options",
            "Take profits at 100-200% for long options",
            "Roll positions 2-3 weeks before expiration",
            "Adjust strategies based on volatility changes"
          ]
        },
        capitalAllocation: [
          "Weekly trades: Use only 10-20% of options allocation",
          "Monthly trades: Can use up to 50% of options allocation",
          "Never risk more than 5% total portfolio on options",
          "Maintain cash reserves for adjustment opportunities"
        ]
      },
      author: "Michael Davis",
      date: "January 8, 2025",
      readTime: "15 min read",
      category: "Options Trading",
      icon: <TrendingUp className="h-6 w-6" />
    },
    {
      title: "Market Psychology: Understanding Crowd Behavior",
      excerpt: "Dive deep into the psychological forces that drive market movements. Learn to identify emotional extremes, contrarian indicators, and how to profit from crowd psychology while avoiding common behavioral traps.",
      fullContent: {
        introduction: "Market psychology drives price movements more than fundamental analysis suggests. Understanding crowd behavior and emotional cycles can provide significant trading advantages.",
        psychologicalCycles: {
          title: "The Psychology of Market Cycles",
          phases: [
            {
              phase: "Optimism",
              characteristics: "Hope returns, buying interest increases",
              signals: "Rising volume, positive news sentiment",
              strategy: "Begin building positions cautiously"
            },
            {
              phase: "Excitement",
              characteristics: "Prices rising, more investors enter",
              signals: "Media coverage increases, new highs",
              strategy: "Continue accumulating, prepare exit plan"
            },
            {
              phase: "Euphoria",
              characteristics: "Peak optimism, everyone is buying",
              signals: "Extreme bullish sentiment, margin peaks",
              strategy: "Begin taking profits, prepare for reversal"
            },
            {
              phase: "Denial",
              characteristics: "First decline, but 'it's just a correction'",
              signals: "Buy the dip mentality, volatility increases",
              strategy: "Reduce positions, increase cash"
            },
            {
              phase: "Fear",
              characteristics: "Serious decline, panic selling begins",
              signals: "High volatility, negative news dominates",
              strategy: "Cautious buying opportunities"
            },
            {
              phase: "Despair",
              characteristics: "Maximum pessimism, capitulation",
              signals: "Extreme bearish sentiment, low volume",
              strategy: "Begin aggressive accumulation"
            }
          ]
        },
        "contrarianlndicators": {
          title: "Contrarian Indicators to Watch",
          sentiment: [
            "VIX (Fear & Greed Index): Above 30 = Fear, Below 20 = Complacency",
            "Put/Call Ratio: Above 1.0 = Bearish, Below 0.7 = Bullish",
            "Margin Debt: High levels indicate euphoria",
            "Newsletter Sentiment: Extreme bullishness = Warning sign"
          ],
          behavioral: [
            "Media Coverage: Excessive positive coverage = Top warning",
            "IPO Activity: High IPO volume = Market top indicator",
            "Social Media Sentiment: Extreme optimism = Contrarian signal",
            "Retail Participation: High retail buying = Reversal warning"
          ]
        },
        "behavioralTraps": {
          title: "Common Behavioral Traps",
          traps: [
            {
              trap: "Confirmation Bias",
              description: "Seeking information that confirms existing beliefs",
              solution: "Actively seek contrarian viewpoints"
            },
            {
              trap: "Loss Aversion",
              description: "Feeling losses more intensely than equivalent gains",
              solution: "Set predetermined stop-losses and profit targets"
            },
            {
              trap: "Herd Mentality",
              description: "Following the crowd without independent analysis",
              solution: "Develop and stick to your trading plan"
            },
            {
              trap: "Recency Bias",
              description: "Overweighting recent events in decision making",
              solution: "Use longer-term data and historical context"
            }
          ]
        },
        practicalApplication: [
          "Monitor sentiment indicators daily",
          "Keep a contrarian mindset during extremes",
          "Use position sizing to manage emotional decisions",
          "Maintain a trading journal to identify your biases",
          "Practice meditation or mindfulness for emotional control"
        ]
      },
      author: "Sarah Kim",
      date: "January 5, 2025",
      readTime: "12 min read",
      category: "Trading Psychology",
      icon: <User className="h-6 w-6" />
    },
    {
      title: "Day Trading vs Swing Trading: Which Is Right for You?",
      excerpt: "Comprehensive comparison of day trading and swing trading approaches. Discover the capital requirements, time commitments, risk profiles, and profit potential of each strategy to choose your optimal path.",
      fullContent: {
        introduction: "Choosing between day trading and swing trading is crucial for your success. Each approach requires different skills, capital, and time commitments. Understanding these differences will help you select the strategy that fits your lifestyle and goals.",
        dayTrading: {
          title: "Day Trading: High-Frequency, High-Intensity",
          characteristics: [
            "Positions held for minutes to hours, never overnight",
            "Multiple trades per day (5-20+ trades)",
            "Requires full-time commitment during market hours",
            "Uses smaller timeframes: 1-minute to 15-minute charts",
            "Higher transaction costs due to frequent trading"
          ],
          requirements: [
            "Minimum ₹5,00,000 capital for pattern day trading",
            "High-speed internet and professional trading platform",
            "6-8 hours daily commitment during market hours",
            "Strong emotional control and quick decision-making",
            "Advanced technical analysis skills"
          ],
          advantages: [
            "No overnight risk from news or gap downs",
            "Quick profit realization",
            "Multiple opportunities daily",
            "Cash available daily for compound growth",
            "High earning potential for skilled traders"
          ],
          disadvantages: [
            "Extremely stressful and demanding",
            "High transaction costs reduce profits",
            "Requires constant market monitoring",
            "Difficult to maintain consistency",
            "High burnout rate among practitioners"
          ]
        },
        swingTrading: {
          title: "Swing Trading: Balanced Approach",
          characteristics: [
            "Positions held for 2-10 days typically",
            "2-5 trades per week maximum",
            "Can be done part-time with 1-2 hours daily",
            "Uses daily and 4-hour charts primarily",
            "Lower transaction costs"
          ],
          requirements: [
            "Minimum ₹1,00,000 capital recommended",
            "Basic charting software sufficient",
            "1-2 hours daily for analysis and monitoring",
            "Patience and discipline for longer holds",
            "Solid understanding of technical and fundamental analysis"
          ],
          advantages: [
            "Less stressful than day trading",
            "Can be done alongside other activities",
            "Lower transaction costs",
            "Captures larger price movements",
            "More sustainable long-term"
          ],
          disadvantages: [
            "Overnight and weekend risk exposure",
            "Fewer trading opportunities",
            "Requires patience to hold through volatility",
            "Gap risk from news events",
            "Slower capital turnover"
          ]
        },
        comparisonTable: {
          title: "Direct Comparison",
          factors: [
            {
              factor: "Time Commitment",
              dayTrading: "6-8 hours daily",
              swingTrading: "1-2 hours daily"
            },
            {
              factor: "Capital Required",
              dayTrading: "₹5,00,000+",
              swingTrading: "₹1,00,000+"
            },
            {
              factor: "Stress Level",
              dayTrading: "Very High",
              swingTrading: "Moderate"
            },
            {
              factor: "Profit Potential",
              dayTrading: "High (if skilled)",
              swingTrading: "Good (more consistent)"
            },
            {
              factor: "Learning Curve",
              dayTrading: "Steep",
              swingTrading: "Moderate"
            }
          ]
        },
        recommendation: {
          dayTradingFor: [
            "Full-time traders with significant capital",
            "Those who thrive under pressure",
            "People with advanced technical skills",
            "Individuals seeking maximum profit potential"
          ],
          swingTradingFor: [
            "Part-time traders with other commitments",
            "Beginners learning market dynamics",
            "Those seeking work-life balance",
            "Investors wanting steady growth"
          ]
        }
      },
      author: "James Rodriguez",
      date: "January 3, 2025",
      readTime: "9 min read",
      category: "Trading Strategies",
      icon: <Clock className="h-6 w-6" />
    },
    {
      title: "Cryptocurrency Trading: Opportunities and Risks",
      excerpt: "Navigate the exciting yet volatile world of cryptocurrency trading. Learn about market dynamics, risk management specific to crypto, and how to identify opportunities in the digital asset space while protecting your capital.",
      fullContent: {
        introduction: "Cryptocurrency trading offers unique opportunities but comes with distinct risks not found in traditional markets. The 24/7 nature, extreme volatility, and emerging regulatory landscape require specialized strategies.",
        marketDynamics: {
          title: "Understanding Crypto Market Dynamics",
          uniqueCharacteristics: [
            "24/7 Trading: Markets never close, requiring constant vigilance",
            "High Volatility: 10-50% daily moves are common",
            "Lower Liquidity: Especially in altcoins, causing price slippage",
            "Sentiment Driven: Social media and news heavily impact prices",
            "Correlation Patterns: Most altcoins follow Bitcoin's direction"
          ],
          marketCycles: [
            "Bitcoin Dominance Cycles: BTC leads, alts follow",
            "Bull Market Phases: BTC rises → ETH rises → Altcoin season",
            "Bear Market Patterns: Everything falls, quality projects survive",
            "Regulatory Cycles: News impacts create volatility spikes"
          ]
        },
        opportunities: {
          title: "Trading Opportunities in Crypto",
          strategies: [
            {
              strategy: "Swing Trading Major Coins",
              description: "Trade BTC, ETH using technical analysis",
              timeframe: "3-14 days",
              riskLevel: "Medium"
            },
            {
              strategy: "Altcoin Momentum Trading",
              description: "Catch trending altcoins during bull runs",
              timeframe: "1-7 days",
              riskLevel: "High"
            },
            {
              strategy: "DeFi Yield Farming",
              description: "Earn yields through liquidity provision",
              timeframe: "Weeks to months",
              riskLevel: "High"
            },
            {
              strategy: "Arbitrage Trading",
              description: "Profit from price differences across exchanges",
              timeframe: "Minutes to hours",
              riskLevel: "Low-Medium"
            }
          ]
        },
        riskManagement: {
          title: "Crypto-Specific Risk Management",
          risks: [
            {
              risk: "Extreme Volatility",
              mitigation: "Use smaller position sizes (0.5-1% per trade)"
            },
            {
              risk: "Exchange Risk",
              mitigation: "Use reputable exchanges, withdraw to cold storage"
            },
            {
              risk: "Regulatory Risk",
              mitigation: "Stay informed on regulations, have exit plans"
            },
            {
              risk: "Technical Risk",
              mitigation: "Understand blockchain basics, verify addresses"
            },
            {
              risk: "FOMO/FUD Risk",
              mitigation: "Stick to trading plan, avoid emotional decisions"
            }
          ],
          bestPractices: [
            "Never invest more than 5-10% of portfolio in crypto",
            "Use stop-losses religiously due to high volatility",
            "Take profits systematically during rallies",
            "Keep detailed records for tax purposes",
            "Use dollar-cost averaging for long-term positions"
          ]
        },
        technicalAnalysis: {
          title: "Technical Analysis for Crypto",
          indicators: [
            "Support/Resistance: More reliable on higher timeframes",
            "RSI: Use 14-period, watch for extreme levels (>80, <20)",
            "Moving Averages: 20/50/200 EMA for trend identification",
            "Volume: Crucial for confirming breakouts in crypto",
            "On-Chain Metrics: Whale movements, exchange flows"
          ],
          patterns: [
            "Bull Flags: Common in crypto bull markets",
            "Cup and Handle: Reliable for major cryptocurrencies",
            "Ascending Triangles: Often precede major breakouts",
            "Head and Shoulders: Strong reversal signals"
          ]
        },
        beginnerGuidelines: [
          "Start with Bitcoin and Ethereum only",
          "Use reputable exchanges (Coinbase, Binance, Kraken)",
          "Begin with small amounts to learn the market",
          "Understand wallet security and private keys",
          "Set up two-factor authentication on all accounts",
          "Keep learning about blockchain technology"
        ]
      },
      author: "Michael Davis",
      date: "December 30, 2024",
      readTime: "11 min read",
      category: "Cryptocurrency",
      icon: <TrendingUp className="h-6 w-6" />
    }
  ];

  const categories = [
    "All Posts", "Technical Analysis", "Risk Management", "Options Trading", 
    "Trading Psychology", "Market News", "Beginner Guides"
  ];

  const handleReadMore = (post: any) => {
    // Create slug from title
    const slug = post.title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    navigate(`/blog/${slug}`);
  };

  const handleReadFeatured = () => {
    const slug = featuredPost.title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    navigate(`/blog/${slug}`);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredPosts = selectedCategory === 'All Posts' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div ref={blogRef} className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="blog-hero text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-blue-900 mb-6">Trading Insights & Market Analysis</h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Stay ahead of the markets with expert analysis, trading strategies, and educational content 
              from our team of professional traders and market analysts.
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                <span>Updated Daily</span>
              </div>
              <div className="flex items-center">
                <User className="h-5 w-5 text-blue-600 mr-2" />
                <span>Expert Authors</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
              <div className="p-8 lg:p-12 text-white">
                <div className="inline-block bg-blue-500 bg-opacity-50 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                  Featured Article
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                  {featuredPost.title}
                </h2>
                <p className="text-blue-100 mb-6 text-lg leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center space-x-4 text-sm text-blue-200 mb-6">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{featuredPost.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
                <button 
                  onClick={handleReadFeatured}
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-300 flex items-center group"
                >
                  Read Full Article
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <div className="p-8 lg:p-12">
                <div className="bg-white bg-opacity-10 rounded-xl p-8 backdrop-blur-sm">
                  <TrendingUp className="h-24 w-24 text-white opacity-60 mx-auto mb-4" />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-2">Chart Analysis</div>
                    <div className="text-blue-200 text-sm">Advanced Technical Indicators</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleCategoryFilter(category)}
                className={`px-4 py-2 rounded-full transition-colors duration-300 font-medium ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-blue-600 hover:text-white border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="blog-grid py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <article key={index} className="blog-post bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                      {post.icon}
                    </div>
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{post.date}</span>
                    </div>
                    <button 
                      onClick={() => handleReadMore(post)}
                      className="text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors flex items-center group"
                    >
                      Read More
                      <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300">
              Load More Articles
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;