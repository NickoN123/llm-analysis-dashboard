import React, { useState } from 'react';
import { MessageCircle, Sparkles, BookOpen, Award, TrendingUp, Building2, ChevronRight, Check, Star, Lock, Globe } from 'lucide-react';

const AskMaryDemo = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [activeScenario, setActiveScenario] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [badges, setBadges] = useState([]);
  const [showWelcome, setShowWelcome] = useState(true);

  const scenarios = [
    {
      id: 1,
      title: "Early Fertility Awareness",
      question: "I'm 31 and not ready to have kids yet, but I'm worried about my future fertility. What should I do now?",
      category: "Planning"
    },
    {
      id: 2,
      title: "Navigating an IVF Cycle",
      question: "My doctor said I have to take progesterone injections. Why is this so important?",
      category: "Treatment"
    },
    {
      id: 3,
      title: "Coping with Loss",
      question: "My embryo transfer failed. I don't know if I can go through this again.",
      category: "Emotional Support"
    },
    {
      id: 4,
      title: "Understanding PCOS",
      question: "I was told I have PCOS, but I don't understand what that really means.",
      category: "Diagnosis"
    },
    {
      id: 5,
      title: "Exploring New Treatments",
      question: "I read about ovarian rejuvenation therapy online. Is that real?",
      category: "Research"
    }
  ];

  const responses = {
    1: {
      text: "I understand that concern, and you're being thoughtful about your future—that's wonderful. At 31, you have time, but it's smart to be proactive.\n\nHere's what I recommend:\n\n**Understanding Your Current Fertility:**\nYour ovarian reserve naturally declines with age, but everyone's timeline is different. The key tests that can give you insight are:\n\n• AMH (Anti-Müllerian Hormone) - indicates your remaining egg supply\n• FSH (Follicle Stimulating Hormone) - shows how hard your body is working to ovulate\n• Antral Follicle Count via ultrasound - direct visualization of available follicles\n\n**Important Context:** These tests have limitations and can't predict exact fertility, but they provide helpful baseline information.\n\n**What You Can Do Now:**\n\n✓ Maintain a balanced diet rich in antioxidants\n✓ Regular exercise (but not excessive)\n✓ Manage stress through mindfulness or therapy\n✓ Limit alcohol and avoid smoking\n✓ Consider tracking your cycles to understand your patterns\n\n**Creating Your Fertility Readiness Plan:**\nWould you like me to help you create a personalized timeline based on your goals? We can also discuss egg freezing if that's something you'd like to explore.\n\nRemember: Knowledge is power, and you're taking the right first step by asking these questions.",
      tone: "reassuring",
      actions: ["Create Fertility Timeline", "Learn About Egg Freezing", "Lifestyle Checklist", "Find a Specialist"],
      badge: "Fertility Aware"
    },
    2: {
      text: "Great question. Progesterone is absolutely crucial to the success of your IVF cycle, and I'll explain exactly why.\n\n**What Progesterone Does:**\n\nProgesterone transforms your uterine lining into a nurturing environment for embryo implantation. Think of it as preparing a comfortable bed for your embryo to nestle into.\n\n**Why Injections After IVF?**\n\nDuring a natural cycle, your corpus luteum (the follicle that released the egg) produces progesterone. In IVF, because we've retrieved your eggs, your body needs supplemental progesterone support.\n\n**The Timeline:**\n• Days 1-3 post-transfer: Embryo begins to attach\n• Days 4-5: Implantation deepens\n• Days 6-10: Critical hormone support period\n• Progesterone maintains the lining throughout this entire process\n\n**Making Injections Easier:**\n\n✓ Warm the vial in your hands first\n✓ Use ice or numbing cream before injection\n✓ Rotate injection sites to prevent soreness\n✓ Have your partner learn the technique\n✓ Inject before bed to sleep through any discomfort\n\n**Important:** Never skip a dose. Set phone reminders if helpful.\n\nThis part is hard, but you're doing something powerful for your future. Would you like me to show you how progesterone supports implantation at the cellular level?",
      tone: "educational",
      actions: ["View Implantation Animation", "Injection Tips Guide", "Set Medication Reminders", "Partner Coaching"],
      badge: "Treatment Navigator"
    },
    3: {
      text: "I'm so sorry. What you're feeling right now is completely valid, and there are no words that can take away this pain.\n\nFirst, I want you to hear this: **You are not a failure. Your body is not broken.**\n\nEmbryo transfer outcomes involve many factors—most beyond anyone's control. Many, many successful journeys include setbacks like this.\n\n**Right Now:**\n\nYou don't need to make any decisions about the future. You need time and space to grieve what didn't happen. That's not weakness—it's necessary healing.\n\n**Some Gentle Truths:**\n\n• Success rates improve with subsequent cycles as your team learns more about your specific needs\n• This outcome doesn't predict future outcomes\n• Taking time before trying again is okay\n• So is deciding to move forward quickly if that feels right for you\n• Your feelings may change day to day—that's normal\n\n**Support Available:**\n\n• Guided journaling prompts for processing grief\n• Self-compassion exercises (no pressure to be \"positive\")\n• Stories from others who continued after setbacks (only if you want them)\n• Therapist referrals specializing in fertility challenges\n\n**There's No Timeline:**\n\nSome people need weeks, some need months. Some want to try again immediately. All of these are valid.\n\nI'm here whenever you need to talk—about next steps, about nothing at all, or just to sit with these hard feelings.\n\nWould you like some resources for processing grief, or would you prefer to just talk?",
      tone: "deeply compassionate",
      actions: ["Grief Support Resources", "Find a Therapist", "Peer Stories (Optional)", "Save for Later"],
      badge: "Resilient Heart"
    },
    4: {
      text: "PCOS can feel overwhelming when you're first diagnosed, but let's break this down together. You're not alone—it affects about 1 in 10 women.\n\n**What PCOS Actually Means:**\n\nPolycystic Ovary Syndrome is a hormonal condition where:\n\n• Your ovaries may develop multiple small follicles (not true \"cysts\")\n• Hormone levels become imbalanced—often higher androgens (like testosterone)\n• Ovulation becomes irregular or absent\n• Insulin resistance is common (your body's response to sugar is affected)\n\n**Why This Happens:**\n\nYour body's hormone signals get mixed up. The pituitary gland, ovaries, and pancreas aren't communicating properly, creating a feedback loop that sustains the imbalance.\n\n**Common PCOS Symptoms:**\n\n✓ Irregular or absent periods\n✓ Difficulty conceiving\n✓ Weight gain or difficulty losing weight\n✓ Excess hair growth\n✓ Acne\n✓ Thinning hair on scalp\n\n**But Here's the Important Part:**\n\nPCOS is highly manageable. Many women with PCOS conceive naturally or with minimal intervention.\n\n**What Helps:**\n\n**Lifestyle:**\n• Anti-inflammatory diet (Mediterranean style)\n• Regular exercise (combination of cardio and strength)\n• Stress management\n• Quality sleep\n\n**Medical Options:**\n• Metformin (improves insulin sensitivity)\n• Letrozole (for ovulation induction)\n• Birth control (to regulate cycles if not trying to conceive)\n• Inositol supplements (good evidence base)\n\n**Preparing for Your Next Doctor Visit:**\n\nQuestions to ask:\n- What type of PCOS do I have?\n- Should I see an endocrinologist?\n- What's my best path to conception?\n- Should I track ovulation?\n\nWould you like me to create a personalized PCOS management plan or help you prepare specific questions for your doctor?",
      tone: "educational-supportive",
      actions: ["PCOS Management Plan", "Symptom Tracker", "Doctor Visit Prep", "Nutrition Guide"],
      badge: "PCOS Informed"
    },
    5: {
      text: "This is a great example of how fast reproductive science is moving—and why critical evaluation matters.\n\n**What Ovarian Rejuvenation Actually Is:**\n\nSeveral experimental approaches claim to \"reactivate\" dormant follicles or improve egg quality:\n\n• Platelet-Rich Plasma (PRP) injections into ovaries\n• Stem cell therapies\n• Mitochondrial supplementation\n• Fragmentation techniques (IVA/OFFA)\n\n**Current Scientific Status:**\n\n🟡 **Confidence Level: Low (Emerging Science)**\n\nBased on: 12 peer-reviewed studies (2022-2025)\n\n**What We Know:**\n\n✓ Some small studies show follicle development in previously \"exhausted\" ovaries\n✓ Case reports of pregnancies exist\n✓ Mechanisms are theoretically plausible\n\n**What We Don't Know:**\n\n✗ Large-scale randomized controlled trials are lacking\n✗ Long-term safety data incomplete\n✗ Success rates compared to standard IVF unclear\n✗ Cost-effectiveness unproven ($5,000-15,000+ per procedure)\n\n**Red Flags to Watch For:**\n\n⚠️ Clinics guaranteeing results\n⚠️ Pressure to act quickly\n⚠️ Lack of transparent success rates\n⚠️ Not offered alongside proven treatments\n\n**My Recommendation:**\n\nIf you're interested, ask these questions to an REI specialist:\n\n1. What does the current research really show?\n2. Am I a candidate for proven treatments first?\n3. Are there clinical trials I could join?\n4. What would you recommend for your own family member?\n\n**Better-Established Options:**\n\nDepending on your situation:\n• Donor eggs (highest success rates for diminished reserve)\n• Standard IVF with genetic testing\n• Mini-IVF protocols\n\n**The Bottom Line:**\n\nThis research is exciting and may lead to breakthroughs. But right now, it's experimental. Anyone offering it should be transparent about that.\n\nWould you like me to help you prepare questions for discussing this with your doctor, or explore proven alternatives?",
      tone: "balanced-scientific",
      actions: ["Evaluate My Options", "Find Clinical Trials", "Questions for Doctor", "Track This Research"],
      badge: "Science Seeker"
    }
  };

  const handleScenarioClick = (scenario) => {
    setActiveScenario(scenario.id);
    const response = responses[scenario.id];
    
    setChatMessages([
      { type: 'user', text: scenario.question, time: 'Just now' },
      { 
        type: 'mary', 
        text: response.text, 
        tone: response.tone,
        actions: response.actions,
        time: 'Just now'
      }
    ]);

    if (response.badge && !badges.includes(response.badge)) {
      setTimeout(() => {
        setBadges([...badges, response.badge]);
      }, 1500);
    }
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;
    
    setChatMessages([
      ...chatMessages,
      { type: 'user', text: userInput, time: 'Just now' },
      { 
        type: 'mary', 
        text: "I'm here to help with your reproductive health questions. This is a demo, so try one of the example scenarios above to see how I respond with expert, compassionate guidance from Dr. Mary Abusief.",
        tone: 'friendly',
        time: 'Just now'
      }
    ]);
    setUserInput('');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0e1a 0%, #1a1f35 100%)',
      fontFamily: "'Nunito', sans-serif"
    }}>
      {/* Header */}
      <header style={{
        background: 'rgba(10, 14, 26, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(0, 212, 255, 0.2)',
        padding: '1.5rem 2rem',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #ff8b94 0%, #ffa07a 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '24px',
              fontWeight: 'bold'
            }}>
              M
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: '1.5rem', color: '#ffffff', fontWeight: '700' }}>
                Ask Mary™
              </h1>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#a0aec0' }}>
                Trusted AI for Reproductive Health
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Globe size={20} color="#a0aec0" />
            <select style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.05)',
              color: '#ffffff',
              cursor: 'pointer'
            }}>
              <option>English</option>
              <option>Español</option>
            </select>
          </div>
        </div>
      </header>

      {/* Welcome Banner */}
      {showWelcome && (
        <div style={{
          background: 'linear-gradient(135deg, #ff8b94 0%, #ffa07a 100%)',
          color: 'white',
          padding: '2rem',
          textAlign: 'center',
          position: 'relative'
        }}>
          <button
            onClick={() => setShowWelcome(false)}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            ×
          </button>
          <h2 style={{ fontSize: '2rem', margin: '0 0 1rem 0', fontWeight: '700' }}>
            We exist for the reproductive health questions no one else answers
          </h2>
          <p style={{ fontSize: '1.25rem', margin: '0 0 1.5rem 0', opacity: 0.95 }}>
            — and the hope that follows.
          </p>
          <div style={{
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(10px)',
            padding: '1.5rem',
            borderRadius: '12px',
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'left'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg"
                alt="Dr. Mary Abusief"
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '3px solid white'
                }}
              />
              <div>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>Dr. Mary Abusief, M.D., FACOG</h3>
                <p style={{ margin: 0, fontSize: '0.95rem', opacity: 0.9, lineHeight: '1.5' }}>
                  Board-certified REI specialist with 20+ years helping women navigate their fertility journeys. 
                  Ask Mary brings my expertise to you—like ChatGPT for reproductive health, but backed by real medical authority you can trust.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
        {/* Navigation Tabs */}
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          marginBottom: '2rem',
          borderBottom: '2px solid rgba(255,255,255,0.1)',
          overflowX: 'auto'
        }}>
          {[
            { id: 'chat', label: 'Ask Mary', icon: MessageCircle },
            { id: 'journey', label: 'My Journey', icon: Award },
            { id: 'science', label: 'Science Now', icon: Sparkles },
            { id: 'pro', label: 'For Clinics', icon: Building2 }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '1rem 1.5rem',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  borderBottom: activeTab === tab.id ? '3px solid #00d4ff' : '3px solid transparent',
                  color: activeTab === tab.id ? '#00d4ff' : '#a0aec0',
                  fontWeight: activeTab === tab.id ? '600' : '400',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '1rem',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.3s'
                }}
              >
                <Icon size={20} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Chat Interface */}
        {activeTab === 'chat' && (
          <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '2rem' }}>
            {/* Scenarios Sidebar */}
            <div>
              <h3 style={{ 
                color: '#ffffff', 
                marginBottom: '1rem',
                fontSize: '1.1rem',
                fontWeight: '600'
              }}>
                Try These Scenarios
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {scenarios.map(scenario => (
                  <button
                    key={scenario.id}
                    onClick={() => handleScenarioClick(scenario)}
                    style={{
                      background: activeScenario === scenario.id ? 'rgba(0, 212, 255, 0.1)' : 'rgba(255,255,255,0.05)',
                      border: activeScenario === scenario.id ? '2px solid #00d4ff' : '2px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      padding: '1rem',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      boxShadow: activeScenario === scenario.id ? '0 4px 12px rgba(0, 212, 255, 0.2)' : 'none'
                    }}
                  >
                    <div style={{
                      fontSize: '0.75rem',
                      color: '#00d4ff',
                      fontWeight: '600',
                      marginBottom: '0.25rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      {scenario.category}
                    </div>
                    <div style={{ 
                      fontSize: '0.95rem', 
                      color: '#ffffff',
                      fontWeight: '600',
                      marginBottom: '0.5rem'
                    }}>
                      {scenario.title}
                    </div>
                    <div style={{ 
                      fontSize: '0.85rem', 
                      color: '#a0aec0',
                      lineHeight: '1.4'
                    }}>
                      "{scenario.question.substring(0, 60)}..."
                    </div>
                  </button>
                ))}
              </div>

              {/* Trust Indicators */}
              <div style={{
                marginTop: '2rem',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '12px',
                padding: '1.5rem',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <h4 style={{ 
                  fontSize: '0.9rem', 
                  color: '#ffffff',
                  marginBottom: '1rem',
                  fontWeight: '600'
                }}>
                  Why Trust Ask Mary?
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[
                    { icon: Check, text: 'Board-certified REI specialist' },
                    { icon: Lock, text: 'HIPAA-compliant & private' },
                    { icon: Star, text: 'Peer-reviewed research' },
                    { icon: BookOpen, text: 'Source citations included' }
                  ].map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{
                          width: '28px',
                          height: '28px',
                          background: '#e6f7f7',
                          borderRadius: '6px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Icon size={16} color="#4ecdc4" />
                        </div>
                        <span style={{ fontSize: '0.85rem', color: '#cbd5e0' }}>
                          {item.text}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              display: 'flex',
              flexDirection: 'column',
              height: '700px'
            }}>
              {/* Chat Messages */}
              <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '2rem'
              }}>
                {chatMessages.length === 0 ? (
                  <div style={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    color: '#a0aec0'
                  }}>
                    <div>
                      <MessageCircle size={48} style={{ marginBottom: '1rem', color: '#4a5568' }} />
                      <h3 style={{ color: '#ffffff', marginBottom: '0.5rem' }}>
                        Start a Conversation
                      </h3>
                      <p style={{ margin: 0 }}>
                        Select a scenario or type your question below
                      </p>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {chatMessages.map((msg, idx) => (
                      <div key={idx}>
                        {msg.type === 'user' ? (
                          <div style={{
                            display: 'flex',
                            justifyContent: 'flex-end'
                          }}>
                            <div style={{
                              background: '#00d4ff',
                              color: '#0a0e1a',
                              padding: '1rem 1.25rem',
                              borderRadius: '16px 16px 4px 16px',
                              maxWidth: '80%',
                              fontWeight: '500'
                            }}>
                              {msg.text}
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div style={{
                              display: 'flex',
                              gap: '1rem',
                              marginBottom: '0.5rem'
                            }}>
                              <div style={{
                                width: '40px',
                                height: '40px',
                                background: 'linear-gradient(135deg, #ff8b94 0%, #ffa07a 100%)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: '600',
                                flexShrink: 0
                              }}>
                                M
                              </div>
                              <div style={{ flex: 1 }}>
                                <div style={{
                                  background: 'rgba(255,255,255,0.08)',
                                  padding: '1rem 1.25rem',
                                  borderRadius: '16px 16px 16px 4px',
                                  color: '#ffffff',
                                  lineHeight: '1.7',
                                  whiteSpace: 'pre-line'
                                }}>
                                  {msg.text}
                                </div>
                                
                                {msg.actions && (
                                  <div style={{
                                    display: 'flex',
                                    gap: '0.5rem',
                                    marginTop: '1rem',
                                    flexWrap: 'wrap'
                                  }}>
                                    {msg.actions.map((action, i) => (
                                      <button
                                        key={i}
                                        style={{
                                          padding: '0.5rem 1rem',
                                          background: 'rgba(0, 212, 255, 0.1)',
                                          border: '1px solid #00d4ff',
                                          color: '#00d4ff',
                                          borderRadius: '8px',
                                          fontSize: '0.85rem',
                                          cursor: 'pointer',
                                          transition: 'all 0.3s'
                                        }}
                                        onMouseEnter={(e) => {
                                          e.target.style.background = '#00d4ff';
                                          e.target.style.color = '#0a0e1a';
                                        }}
                                        onMouseLeave={(e) => {
                                          e.target.style.background = 'rgba(0, 212, 255, 0.1)';
                                          e.target.style.color = '#00d4ff';
                                        }}
                                      >
                                        {action}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div style={{
                padding: '1.5rem',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(0,0,0,0.2)'
              }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask me anything about reproductive health..."
                    style={{
                      flex: 1,
                      padding: '1rem',
                      borderRadius: '12px',
                      border: '1px solid rgba(255,255,255,0.1)',
                      background: 'rgba(255,255,255,0.05)',
                      color: '#ffffff',
                      fontSize: '1rem',
                      outline: 'none'
                    }}
                  />
                  <button
                    onClick={handleSendMessage}
                    style={{
                      padding: '1rem 2rem',
                      background: '#00d4ff',
                      color: '#0a0e1a',
                      border: 'none',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '1rem'
                    }}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Journey Tab */}
        {activeTab === 'journey' && (
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
          }}>
            <h2 style={{ color: '#ffffff', marginBottom: '2rem' }}>Your Fertility Journey</h2>
            
            {/* Progress Overview */}
            <div style={{
              background: 'linear-gradient(135deg, #ff8b94 0%, #ffa07a 100%)',
              color: 'white',
              padding: '2rem',
              borderRadius: '12px',
              marginBottom: '2rem'
            }}>
              <h3 style={{ margin: '0 0 1rem 0' }}>Journey Progress</h3>
              <div style={{
                background: 'rgba(255,255,255,0.2)',
                height: '12px',
                borderRadius: '6px',
                overflow: 'hidden'
              }}>
                <div style={{
                  background: 'white',
                  height: '100%',
                  width: `${(badges.length / 5) * 100}%`,
                  transition: 'width 0.5s'
                }} />
              </div>
              <p style={{ margin: '1rem 0 0 0', opacity: 0.9 }}>
                {badges.length} of 5 milestones completed
              </p>
            </div>

            {/* Badges Earned */}
            <h3 style={{ color: '#ffffff', marginBottom: '1rem' }}>Badges Earned</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '1rem'
            }}>
              {['Fertility Aware', 'Treatment Navigator', 'Resilient Heart', 'PCOS Informed', 'Science Seeker'].map(badge => (
                <div
                  key={badge}
                  style={{
                    padding: '1.5rem',
                    background: badges.includes(badge) ? 'rgba(0, 212, 255, 0.1)' : 'rgba(255,255,255,0.05)',
                    borderRadius: '12px',
                    border: badges.includes(badge) ? '2px solid #00d4ff' : '2px solid rgba(255,255,255,0.1)',
                    textAlign: 'center',
                    position: 'relative',
                    opacity: badges.includes(badge) ? 1 : 0.5
                  }}
                >
                  <Award size={32} color={badges.includes(badge) ? '#00d4ff' : '#4a5568'} />
                  <h4 style={{ 
                    margin: '0.75rem 0 0 0', 
                    color: '#ffffff',
                    fontSize: '0.95rem'
                  }}>
                    {badge}
                  </h4>
                  {badges.includes(badge) && (
                    <div style={{
                      position: 'absolute',
                      top: '0.5rem',
                      right: '0.5rem',
                      background: '#00d4ff',
                      borderRadius: '50%',
                      width: '24px',
                      height: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Check size={16} color="#0a0e1a" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Learning Modules */}
            <h3 style={{ color: '#ffffff', marginTop: '3rem', marginBottom: '1rem' }}>
              Continue Learning
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { title: 'Understanding Your Cycle', progress: 100, lessons: '5/5 complete' },
                { title: 'Fertility Fundamentals', progress: 60, lessons: '3/5 complete' },
                { title: 'Treatment Landscape', progress: 20, lessons: '1/5 complete' }
              ].map((module, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem'
                  }}>
                    <h4 style={{ margin: 0, color: '#ffffff' }}>{module.title}</h4>
                    <span style={{ fontSize: '0.875rem', color: '#a0aec0' }}>
                      {module.lessons}
                    </span>
                  </div>
                  <div style={{
                    background: 'rgba(255,255,255,0.1)',
                    height: '8px',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      background: '#00d4ff',
                      height: '100%',
                      width: `${module.progress}%`,
                      transition: 'width 0.5s'
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Science Now Tab */}
        {activeTab === 'science' && (
          <div>
            <h2 style={{ color: '#ffffff', marginBottom: '1.5rem' }}>
              Science Now™ - Latest Research
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '1.5rem'
            }}>
              {[
                {
                  title: 'AMH Tests May Overestimate Egg Count',
                  category: 'Diagnostics',
                  confidence: 'High',
                  date: 'Oct 15, 2025',
                  summary: 'New study shows AMH tests may overestimate ovarian reserve by up to 30% in certain hormone profiles...',
                  relevance: 'High'
                },
                {
                  title: 'Mediterranean Diet Improves IVF Success',
                  category: 'Lifestyle',
                  confidence: 'Medium',
                  date: 'Oct 12, 2025',
                  summary: 'Randomized trial demonstrates 15% improvement in implantation rates with Mediterranean dietary patterns...',
                  relevance: 'Medium'
                },
                {
                  title: 'AI-Guided Embryo Selection Shows Promise',
                  category: 'IVF Technology',
                  confidence: 'Emerging',
                  date: 'Oct 10, 2025',
                  summary: 'Machine learning algorithms analyzing time-lapse imaging may predict embryo viability more accurately...',
                  relevance: 'Medium'
                }
              ].map((article, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    cursor: 'pointer',
                    transition: 'transform 0.3s, box-shadow 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,212,255,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '0.75rem'
                  }}>
                    <span style={{
                      fontSize: '0.75rem',
                      color: '#ff8b94',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      {article.category}
                    </span>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      background: article.confidence === 'High' ? '#e6f7f7' :
                                 article.confidence === 'Medium' ? '#fffaeb' : '#fef2f2',
                      color: article.confidence === 'High' ? '#4ecdc4' :
                             article.confidence === 'Medium' ? '#ffd93d' : '#ff6b6b'
                    }}>
                      {article.confidence}
                    </span>
                  </div>
                  
                  <h3 style={{
                    margin: '0 0 1rem 0',
                    color: '#ffffff',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    lineHeight: '1.4'
                  }}>
                    {article.title}
                  </h3>
                  
                  <p style={{
                    margin: '0 0 1rem 0',
                    color: '#cbd5e0',
                    fontSize: '0.9rem',
                    lineHeight: '1.6'
                  }}>
                    {article.summary}
                  </p>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '1rem',
                    borderTop: '1px solid rgba(255,255,255,0.1)'
                  }}>
                    <span style={{ fontSize: '0.85rem', color: '#718096' }}>
                      {article.date}
                    </span>
                    <button style={{
                      padding: '0.5rem 1rem',
                      background: '#00d4ff',
                      color: '#0a0e1a',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      Read More
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pro Tab */}
        {activeTab === 'pro' && (
          <div style={{
            background: 'linear-gradient(135deg, #0a0e1a 0%, #1a1f35 100%)',
            borderRadius: '16px',
            padding: '3rem',
            color: 'white'
          }}>
            <h2 style={{ marginBottom: '1rem', fontSize: '2rem' }}>
              Ask Mary Pro™
            </h2>
            <p style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '3rem' }}>
              Enterprise platform for fertility clinics and OB-GYN practices
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              marginBottom: '3rem'
            }}>
              {[
                {
                  title: 'Patient Engagement',
                  value: '89%',
                  change: '+12%',
                  description: 'Average engagement rate'
                },
                {
                  title: 'Question Volume',
                  value: '2,847',
                  change: '+24%',
                  description: 'Questions this month'
                },
                {
                  title: 'Call Reduction',
                  value: '43%',
                  change: '+8%',
                  description: 'Fewer routine calls'
                }
              ].map((metric, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  <div style={{
                    fontSize: '2rem',
                    fontWeight: '700',
                    color: '#00d4ff',
                    marginBottom: '0.5rem'
                  }}>
                    {metric.value}
                  </div>
                  <div style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    marginBottom: '0.5rem'
                  }}>
                    {metric.title}
                  </div>
                  <div style={{
                    fontSize: '0.9rem',
                    opacity: 0.7
                  }}>
                    {metric.description}
                  </div>
                  <div style={{
                    marginTop: '0.75rem',
                    color: '#4ecdc4',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>
                    {metric.change} vs last month
                  </div>
                </div>
              ))}
            </div>

            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>
              Key Features
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1.5rem'
            }}>
              {[
                'Co-branded patient experience',
                'Custom avatar training',
                'Patient question analytics',
                'Pre-visit education tools',
                'Treatment protocol libraries',
                'Compliance tracking',
                'Integration with EMR systems',
                'White-label options'
              ].map((feature, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '8px'
                  }}
                >
                  <Check size={20} color="#4ecdc4" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <button style={{
              marginTop: '3rem',
              padding: '1rem 2rem',
              background: '#00d4ff',
              color: '#0a0e1a',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              Request Enterprise Demo
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer style={{
        background: 'rgba(0,0,0,0.3)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        padding: '2rem',
        marginTop: '4rem',
        textAlign: 'center',
        color: '#a0aec0'
      }}>
        <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>
          Ask Mary™ - Interactive Demo Version
        </p>
        <p style={{ margin: 0, fontSize: '0.85rem', color: '#718096' }}>
          This AI companion is for informational purposes and does not replace professional medical advice.
        </p>
      </footer>
    </div>
  );
};

export default AskMaryDemo;